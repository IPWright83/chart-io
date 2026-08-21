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

    it("should not show a PivotControl unless pivotable is set", async () => {
        const { container } = render(
            <Heatmap rows="region" columns="product" value="sales" data={data} width={300} height={300} />,
        );

        await wait();

        expect(container.querySelector(".pivot-control")).toBeNull();
    });

    it("should morph the grid into a row-stacked bar chart when Rows is clicked, then back when Grid is clicked", async () => {
        const { container, getByText } = render(
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

        fireEvent.click(getByText("Rows"));
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

        fireEvent.click(getByText("Grid"));
        await wait();

        const cellsBackInGrid = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        expect(cellsBackInGrid.length).toBe(4);
        const backToGridWidths = new Set(cellsBackInGrid.map((cell) => cell.getAttribute("width")));
        expect(backToGridWidths.size).toBe(1);
        expect(container.querySelector(".heatmap-legend")).not.toBeNull();
    });

    it("should morph the grid into a column-stacked bar chart when Columns is clicked", async () => {
        const { container, getByText } = render(
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

        fireEvent.click(getByText("Columns"));
        await wait();

        const cells = Array.from(container.querySelectorAll("rect.heatmap-cell"));
        expect(cells.length).toBe(4);
        // Pivoted to columns, each column's two cells are stacked with different heights (proportional
        // to their own value) instead of sharing the fixed row band height
        const heights = cells.map((cell) => Number(cell.getAttribute("height")));
        expect(new Set(heights).size).toBeGreaterThan(1);
    });
});
