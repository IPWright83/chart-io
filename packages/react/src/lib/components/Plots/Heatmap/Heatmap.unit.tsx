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

    // The "Pivot" action lives on the chart's right-click <ContextMenu> (portaled to document.body)
    // rather than an on-chart control - open it and click the "Pivot" segment to cycle to the next
    // layout (grid -> rows -> columns -> grid)
    function cyclePivot(container: HTMLElement) {
        fireEvent.click(container.querySelector("svg"), { clientX: 10, clientY: 10 });

        const items = Array.from(document.body.querySelectorAll(".context-menu-item"));
        const pivotItem = items.find((item) => item.textContent.trim().startsWith("Pivot"));
        fireEvent.click(pivotItem.querySelector("path"));
    }

    it("should disable the Pivot context-menu action unless pivotable is set", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} />,
        );

        await wait();

        fireEvent.click(container.querySelector("svg"), { clientX: 10, clientY: 10 });

        const items = Array.from(document.body.querySelectorAll(".context-menu-item"));
        const pivotItem = items.find((item) => item.textContent.trim().startsWith("Pivot"));
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

        cyclePivot(container);
        await wait();

        // Pivoted to rows, the same 4 cells are still there (keyed by row/column, not re-created) -
        // but each row's two cells now have different widths (proportional to their own value) since
        // they're stacked edge-to-edge instead of sharing the fixed column band width
        const cellsAsRows = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        expect(cellsAsRows.length).toBe(4);
        const rowWidths = cellsAsRows.map((cell) => Number(cell.getAttribute("width")));
        expect(new Set(rowWidths).size).toBeGreaterThan(1);

        // No legend once pivoted away from the grid
        expect(container.querySelector(".heatmap-legend")).toBeNull();
    });
});
