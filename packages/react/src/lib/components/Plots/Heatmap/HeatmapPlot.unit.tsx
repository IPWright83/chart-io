import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";

import { HeatmapPlot } from "./HeatmapPlot";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("HeatmapPlot", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 8 },
        { region: "South", product: "Widgets", sales: 10 },
        { region: "South", product: "Gadgets", sales: 3 },
    ];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render a cell for every row/column combination, plus a label for every row and column", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(4);
            expect(container.querySelectorAll("text.heatmap-row-label").length).toBe(2);
            expect(container.querySelectorAll("text.heatmap-column-label").length).toBe(2);
        });

        it("should not render a cell for a row/column combination missing from the data", async () => {
            const sparseData = data.slice(0, 3);

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data: sparseData,
            });

            await wait();

            expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(3);
        });

        it("should hide labels when labels is false", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" labels={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("text.heatmap-row-label").length).toBe(0);
            expect(container.querySelectorAll("text.heatmap-column-label").length).toBe(0);
        });

        it("should color cells along the value range, lowest and highest getting different colors", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
            });

            await wait();

            const fills = Array.from(container.querySelectorAll("rect.heatmap-cell")).map((cell) => (cell as SVGElement).style.fill);

            expect(new Set(fills).size).toBeGreaterThan(1);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a cell", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <HeatmapPlot rows="region" columns="product" value="sales" onMouseOver={onMouseOver} />,
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "rect.heatmap-cell", onMouseOver, { region: "North", product: "Widgets", sales: 5 });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                expect(dispatchCalls).toEqual(
                    expect.arrayContaining(["event/setTooltipBorderColor", "event/addTooltipItem", "event/setPositionEvent"]),
                );
            });

            it("click correctly on a cell", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <HeatmapPlot rows="region" columns="product" value="sales" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "rect.heatmap-cell:last-of-type", onClick, {
                    region: "South",
                    product: "Gadgets",
                    sales: 3,
                });
            });
        });

        describe("grouping", () => {
            const groupedData = [
                { region: "North", store: "A", product: "Widgets", sales: 5 },
                { region: "South", store: "B", product: "Widgets", sales: 10 },
                { region: "North", store: "C", product: "Widgets", sales: 7 },
            ];

            it("should leave rows in their natural (data) order by default", async () => {
                const { container } = await renderChart({
                    children: <HeatmapPlot rows="store" columns="product" value="sales" rowGroupBy="region" />,
                    data: groupedData,
                });

                await wait();

                const labels = Array.from(container.querySelectorAll("text.heatmap-row-label")).map((label) => label.textContent);
                expect(labels).toEqual(["A", "B", "C"]);
            });

            it("should cluster rows sharing a group together, keeping their relative order, when rowsGrouped is set", async () => {
                const { container } = await renderChart({
                    children: <HeatmapPlot rows="store" columns="product" value="sales" rowGroupBy="region" rowsGrouped={true} />,
                    data: groupedData,
                });

                await wait();

                const labels = Array.from(container.querySelectorAll("text.heatmap-row-label")).map((label) => label.textContent);
                // A and C share the "North" group and should end up adjacent, ahead of B ("South") -
                // A still precedes C since that's their original relative order
                expect(labels).toEqual(["A", "C", "B"]);
            });

            it("should position grouped rows below the group(s) that sort ahead of them", async () => {
                const { container } = await renderChart({
                    children: <HeatmapPlot rows="store" columns="product" value="sales" rowGroupBy="region" rowsGrouped={true} />,
                    data: groupedData,
                });

                await wait();

                const yFor = (store: string) =>
                    Number(
                        Array.from(container.querySelectorAll("text.heatmap-row-label")).find((label) => label.textContent === store)?.getAttribute("y"),
                    );

                // Grouped order is [A, C, B] ("North" then "South") - each row should sit strictly
                // below the one before it
                expect(yFor("C")).toBeGreaterThan(yFor("A"));
                expect(yFor("B")).toBeGreaterThan(yFor("C"));
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <HeatmapPlot rows="region" columns="product" value="sales" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            // Cells, row labels and column labels each render to their own Canvas layer, the same
            // way <DendrogramPlot> gives links/nodes/labels one each
            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(3);

            const cellsBuffer = getBuffer(canvases[0] as HTMLCanvasElement);
            expect(cellsBuffer).toMatchImageSnapshot();
        });

        it("should handle a mouseover on a cell", async () => {
            const onMouseOver = jest.fn();

            const { container, store } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <HeatmapPlot rows="region" columns="product" value="sales" onMouseOver={onMouseOver} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            jest.spyOn(store, "dispatch");
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            await testMouseOver(container, ".virtual-canvas", onMouseOver, { region: "North", product: "Widgets", sales: 5 }, {
                bubbles: true,
                pageX: 20,
                pageY: 20,
            });
        });
    });
});
