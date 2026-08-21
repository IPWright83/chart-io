import { d3 } from "@chart-io/core";
import type { IColor } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";

import { HeatmapPlot } from "./HeatmapPlot";

expect.extend({ toMatchImageSnapshot });

import { createMockStore, getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("HeatmapPlot", () => {
    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 8 },
        { region: "South", product: "Widgets", sales: 10 },
        { region: "South", product: "Gadgets", sales: 3 },
    ];

    const regionScale = () => d3.scaleBand().domain(["North", "South"]).range([0, 200]).paddingInner(0).paddingOuter(0);
    const productScale = () => d3.scaleBand().domain(["Widgets", "Gadgets"]).range([0, 200]).paddingInner(0).paddingOuter(0);

    const gridStore = (overrides: Record<string, unknown> = {}) =>
        createMockStore({
            chart: {
                animationDuration: 0,
                dimensions: { width: 200, height: 200 },
                data,
                pivot: "grid",
                scales: {
                    region: { domain: regionScale().domain(), range: regionScale().range(), scale: regionScale() },
                    product: { domain: productScale().domain(), range: productScale().range(), scale: productScale() },
                },
                ...overrides,
            },
        });

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store: gridStore(),
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render a cell for every row/column combination", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store: gridStore(),
            });

            await wait();

            expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(4);
        });

        it("should render a cell (defaulting to a value of 0) for a row/column combination missing from the data", async () => {
            const sparseData = data.slice(0, 3);

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data: sparseData,
                store: gridStore({ data: sparseData }),
            });

            await wait();

            expect(container.querySelectorAll("rect.heatmap-cell").length).toBe(4);
        });

        it("should size and position cells from the row/column band scales in the grid layout", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store: gridStore(),
            });

            await wait();

            const cells = Array.from(container.querySelectorAll("rect.heatmap-cell"));
            for (const cell of cells) {
                expect(Number(cell.getAttribute("width"))).toBeCloseTo(100);
                expect(Number(cell.getAttribute("height"))).toBeCloseTo(100);
            }
        });

        it("should color cells along the value range, lowest and highest getting different colors", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store: gridStore(),
            });

            await wait();

            const fills = Array.from(container.querySelectorAll("rect.heatmap-cell")).map((cell) => (cell as SVGElement).style.fill);
            expect(new Set(fills).size).toBeGreaterThan(1);
        });

        it("should center an odd-length (diverging) color palette on 0 rather than the data's midpoint", async () => {
            // -0.9 to 0.3 - a data midpoint of -0.3, well away from 0
            const divergingData = [
                { region: "North", product: "Widgets", sales: -0.9 },
                { region: "North", product: "Gadgets", sales: 0 },
                { region: "South", product: "Widgets", sales: 0.3 },
                { region: "South", product: "Gadgets", sales: -0.3 },
            ];
            const colors: IColor[] = ["#b2182b", "#f7f7f7", "#2166ac"];

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" colors={colors} />,
                data: divergingData,
                store: gridStore({ data: divergingData }),
            });

            await wait();

            const fillFor = (row: string, column: string) =>
                (
                    Array.from(container.querySelectorAll("rect.heatmap-cell")).find(
                        (cell) =>
                            Number(cell.getAttribute("x")) === productScale()(column) && Number(cell.getAttribute("y")) === regionScale()(row),
                    ) as SVGElement
                )?.style.fill;

            // 0 sits exactly on the diverging domain's center, so it gets the middle color untouched -
            // if the domain were instead just [-0.9, 0.3] (the data's own extent), 0 would land at
            // t=0.75 and get a color much closer to the "high" end instead
            expect(fillFor("North", "Gadgets")).toBe(d3.rgb(colors[1] as string).toString());
        });

        it("should render a color legend in the grid layout", async () => {
            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store: gridStore(),
            });

            await wait();

            expect(container.querySelector(".heatmap-legend")).not.toBeNull();
        });

        it("should not render a color legend once pivoted to rows", async () => {
            const valueScale = () => d3.scaleLinear().domain([0, 13]).range([0, 200]);
            const store = gridStore({
                pivot: "rows",
                scales: {
                    region: { domain: regionScale().domain(), range: regionScale().range(), scale: regionScale() },
                    sales: { domain: valueScale().domain(), range: valueScale().range(), scale: valueScale() },
                },
            });

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store,
            });

            await wait();

            expect(container.querySelector(".heatmap-legend")).toBeNull();
        });

        it("should stack each row's cells edge-to-edge along a linear x-axis once pivoted to rows", async () => {
            const valueScale = () => d3.scaleLinear().domain([0, 13]).range([0, 200]);
            const store = gridStore({
                pivot: "rows",
                scales: {
                    region: { domain: regionScale().domain(), range: regionScale().range(), scale: regionScale() },
                    sales: { domain: valueScale().domain(), range: valueScale().range(), scale: valueScale() },
                },
            });

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store,
            });

            await wait();

            // North totals 5 + 8 = 13, the full domain - its two cells should span the full width
            // between them, packed edge-to-edge with no gap
            const cells = Array.from(container.querySelectorAll("rect.heatmap-cell"));
            const northCells = cells
                .filter((cell) => Number(cell.getAttribute("y")) === regionScale()("North"))
                .sort((a, b) => Number(a.getAttribute("x")) - Number(b.getAttribute("x")));

            expect(northCells.length).toBe(2);
            expect(Number(northCells[0].getAttribute("x"))).toBeCloseTo(0);
            const firstEnd = Number(northCells[0].getAttribute("x")) + Number(northCells[0].getAttribute("width"));
            expect(Number(northCells[1].getAttribute("x"))).toBeCloseTo(firstEnd);
            const lastEnd = Number(northCells[1].getAttribute("x")) + Number(northCells[1].getAttribute("width"));
            expect(lastEnd).toBeCloseTo(200);

            // Row band position/height is unchanged from the grid layout
            expect(Number(northCells[0].getAttribute("height"))).toBeCloseTo(100);
        });

        it("should stack each column's cells edge-to-edge along a linear y-axis once pivoted to columns", async () => {
            const valueScale = () => d3.scaleLinear().domain([0, 15]).range([200, 0]);
            const store = gridStore({
                pivot: "columns",
                scales: {
                    product: { domain: productScale().domain(), range: productScale().range(), scale: productScale() },
                    sales: { domain: valueScale().domain(), range: valueScale().range(), scale: valueScale() },
                },
            });

            const { container } = await renderChart({
                children: <HeatmapPlot rows="region" columns="product" value="sales" />,
                data,
                store,
            });

            await wait();

            // Widgets totals 5 + 10 = 15, the full domain - its two cells should span the full plot
            // height between them, packed edge-to-edge with no gap
            const cells = Array.from(container.querySelectorAll("rect.heatmap-cell"));
            const widgetsCells = cells
                .filter((cell) => Number(cell.getAttribute("x")) === productScale()("Widgets"))
                .sort((a, b) => Number(a.getAttribute("y")) - Number(b.getAttribute("y")));

            expect(widgetsCells.length).toBe(2);
            const firstEnd = Number(widgetsCells[0].getAttribute("y")) + Number(widgetsCells[0].getAttribute("height"));
            expect(Number(widgetsCells[1].getAttribute("y"))).toBeCloseTo(firstEnd);

            // Column band position/width is unchanged from the grid layout
            expect(Number(widgetsCells[0].getAttribute("width"))).toBeCloseTo(100);
        });

        describe("should handle event", () => {
            it("mouseover correctly on a cell", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <HeatmapPlot rows="region" columns="product" value="sales" onMouseOver={onMouseOver} />,
                    data,
                    store: gridStore(),
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
                    store: gridStore(),
                });

                await testMouseClick(container, "rect.heatmap-cell:last-of-type", onClick, {
                    region: "South",
                    product: "Gadgets",
                    sales: 3,
                });
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
                store: gridStore(),
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(1);

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
                store: gridStore(),
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
