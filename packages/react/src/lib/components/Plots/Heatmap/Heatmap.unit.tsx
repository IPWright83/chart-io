import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { wait } from "../../../testUtils";

import { Heatmap } from "./Heatmap";

describe("Heatmap", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 8 },
        { region: "South", product: "Widgets", sales: 10 },
        { region: "South", product: "Gadgets", sales: 3 },
    ];

    it("should render without needing an XYChart/XAxis/YAxis wrapper", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} />,
        );

        await wait();

        expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(4);
    });

    // The "Pivot" action lives on the chart's right-click <ContextMenu> (portaled to document.body,
    // via a useEffect that renders it imperatively with D3) rather than an on-chart control - opening
    // it can take an extra tick to settle under a busier CI runner, so this polls briefly rather than
    // assuming the item is present the instant the opening event returns. Opening is a right-click
    // (a native "contextmenu" event) on the chart's own <svg> - see <ContextMenuOverlay>
    async function findPivotItem(): Promise<Element> {
        for (let attempt = 0; attempt < 10; attempt++) {
            const items = Array.from(document.body.querySelectorAll(".context-menu-item"));
            const pivotItem = items.find((item) => item.textContent.trim().startsWith("Pivot"));
            if (pivotItem) return pivotItem;
            await wait(50);
        }

        throw new Error("The 'Pivot' context-menu item never appeared");
    }

    function openContextMenu(container: HTMLElement) {
        fireEvent.contextMenu(container.querySelector("svg"), { clientX: 10, clientY: 10 });
    }

    async function cyclePivot(container: HTMLElement) {
        openContextMenu(container);

        const pivotItem = await findPivotItem();
        fireEvent.click(pivotItem.querySelector("path"));
    }

    it("should disable the Pivot context-menu action unless pivotable is set", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} />,
        );

        await wait();

        openContextMenu(container);

        const pivotItem = await findPivotItem();
        expect(pivotItem.getAttribute("data-disabled")).toBe("true");
    });

    it("should morph the grid into a row-stacked bar chart when Pivot is selected", async () => {
        // Deliberately only exercises a single live pivot transition - the per-pivot cell geometry
        // for every layout (grid/rows/columns) is already covered deterministically (via a mocked,
        // pre-seeded store) in HeatmapPlot.unit.tsx. Chaining a second scale-type-changing transition
        // (band <-> linear) onto the same rendered axis is flaky under jsdom's d3-transition/timer
        // plumbing - unrelated to this feature - so this integration test sticks to proving the
        // <ContextMenu> "Pivot" action is genuinely wired up to a real chart, once
        const { container } = render(
            <Heatmap
                rows="region"
                columns="product"
                value="sales"
                data={data}
                width={300}
                height={300}
                animationDuration={0}
                pivotable={true}
            />,
        );

        await wait();

        const cellsInGrid = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        expect(cellsInGrid.length).toBe(4);
        // In the grid layout every cell shares the same column width (its column's band)
        const gridWidths = new Set(cellsInGrid.map((cell) => cell.getAttribute("width")));
        expect(gridWidths.size).toBe(1);

        // The color legend renders embedded in the chart's own <Legend> (the same convention a
        // <ZAxis> size legend uses), not as a fixed element of its own
        expect(container.querySelector(".color-legend")).not.toBeNull();

        await cyclePivot(container);
        await wait();

        // Pivoted to rows, the same 4 cells are still there (keyed by row/column, not re-created) -
        // but each row's two cells now have different widths (proportional to their own value) since
        // they're stacked edge-to-edge instead of sharing the fixed column band width
        const cellsAsRows = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        expect(cellsAsRows.length).toBe(4);
        const rowWidths = cellsAsRows.map((cell) => Number(cell.getAttribute("width")));
        expect(new Set(rowWidths).size).toBeGreaterThan(1);

        // No color legend once pivoted away from the grid
        expect(container.querySelector(".color-legend")).toBeNull();
    });

    it("should square off a rounded cornerRadius once pivoted, since cells persist rather than being recreated", async () => {
        // Regression test - a stacked bar's segments sit edge-to-edge, so rounding every cell's
        // corners individually (as the grid layout does) leaves a visible rounded notch at every
        // internal segment boundary. Cells are keyed by row/column and transition rather than being
        // recreated across a pivot, so this also exercises RectsPlot actually picking up the changed
        // cornerRadius on an already-rendered rect, not just one it's drawing for the first time
        const { container } = render(
            <Heatmap
                rows="region"
                columns="product"
                value="sales"
                data={data}
                width={300}
                height={300}
                animationDuration={0}
                cornerRadius={4}
                pivotable={true}
            />,
        );

        await wait();

        const cellsInGrid = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        for (const cell of cellsInGrid) {
            expect(cell.getAttribute("rx")).toBe("4");
            expect(cell.getAttribute("ry")).toBe("4");
        }

        await cyclePivot(container);
        await wait();

        const cellsPivoted = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        for (const cell of cellsPivoted) {
            expect(cell.getAttribute("rx")).toBe("0");
            expect(cell.getAttribute("ry")).toBe("0");
        }
    });

    it("should dock the Legend at SE by default", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} pivotable={true} />,
        );

        await wait();

        // getLegendPosition("SE") sets bottom/right but leaves top/left unset - "E" (the generic
        // <XYChart> default) would instead center vertically (top: "50%") and leave bottom unset
        const legend = container.querySelector(".legend") as HTMLElement;
        expect(legend.style.bottom).not.toBe("");
        expect(legend.style.top).toBe("");
    });

    it("should dock the Legend elsewhere when legendPosition is set", async () => {
        const { container } = render(
            <Heatmap
                rows="region"
                columns="product"
                value="sales"
                data={data}
                width={300}
                height={300}
                pivotable={true}
                legendPosition="NW"
            />,
        );

        await wait();

        const legend = container.querySelector(".legend") as HTMLElement;
        expect(legend.style.top).not.toBe("");
        expect(legend.style.left).not.toBe("");
        expect(legend.style.bottom).toBe("");
    });
});
