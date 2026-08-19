import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../VirtualCanvas";
import { ParallelCoordinatesPlot } from "./ParallelCoordinatesPlot";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, testMouseClick, testMouseOver, wait } from "../../../testUtils";

describe("ParallelCoordinatesPlot", () => {
    const data = [
        { food: "Apple", protein: 0.3, fat: 0.2, carbs: 14 },
        { food: "Steak", protein: 26, fat: 15, carbs: 0 },
        { food: "Bread", protein: 9, fat: 3, carbs: 49 },
    ];
    const dimensions = ["protein", "fat", "carbs"];

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" />,
                data,
            });

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render one line per row and one axis per dimension", async () => {
            const { container } = await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("polyline.parallel-coordinates-line").length).toBe(data.length);
            expect(container.querySelectorAll("g.parallel-coordinates-axis").length).toBe(dimensions.length);
        });

        it("should leave out rows with a missing value on any dimension", async () => {
            const incompleteData = [...data, { food: "Unknown", protein: null, fat: 1, carbs: 1 }];

            const { container } = await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" />,
                data: incompleteData,
            });

            await wait();

            expect(container.querySelectorAll("polyline.parallel-coordinates-line").length).toBe(data.length);
        });

        it("should render a brush overlay for every axis by default", async () => {
            const { container } = await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("g.parallel-coordinates-axis-brush").length).toBe(dimensions.length);
        });

        it("should not render a brush overlay when brushable is false", async () => {
            const { container } = await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" brushable={false} />,
                data,
            });

            await wait();

            expect(container.querySelectorAll("g.parallel-coordinates-axis-brush").length).toBe(0);
        });

        it("should call onBrush with every row when nothing is brushed", async () => {
            const onBrush = jest.fn();

            await renderChart({
                children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" onBrush={onBrush} />,
                data,
            });

            await wait();

            expect(onBrush).toHaveBeenCalledWith(data);
        });

        it("should dispatch a legend item for every category when color and showInLegend are set", async () => {
            const categorisedData = data.map((row, i) => ({ ...row, category: i % 2 === 0 ? "Fruit" : "Meat" }));

            const { store } = await renderChart({
                children: (
                    <ParallelCoordinatesPlot dimensions={dimensions} name="food" color="category" showInLegend={true} />
                ),
                data: categorisedData,
            });

            await wait();

            const legendItemNames = (store.dispatch as jest.Mock).mock.calls
                .map((c) => c[0])
                .filter((action) => action.type === "chart/addLegendItem")
                .map((action) => action.payload.name);

            expect(legendItemNames).toEqual(expect.arrayContaining(["Fruit", "Meat"]));
        });

        describe("should handle event", () => {
            it("mouseover correctly on a line", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <ParallelCoordinatesPlot dimensions={dimensions} name="food" onMouseOver={onMouseOver} />
                    ),
                    data,
                });

                jest.spyOn(store, "dispatch");

                testMouseOver(container, "polyline.parallel-coordinates-line", onMouseOver, data[0]);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                expect(dispatchCalls).toEqual(
                    expect.arrayContaining(["event/setTooltipBorderColor", "event/addTooltipItem", "event/setPositionEvent"]),
                );
            });

            it("click correctly on a line", async () => {
                const onClick = jest.fn();

                const { container } = await renderChart({
                    children: <ParallelCoordinatesPlot dimensions={dimensions} name="food" onClick={onClick} />,
                    data,
                });

                await testMouseClick(container, "polyline.parallel-coordinates-line", onClick, data[0]);
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <ParallelCoordinatesPlot dimensions={dimensions} name="food" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(1);

            const buffer = getBuffer(canvases[0] as HTMLCanvasElement);
            expect(buffer).toMatchImageSnapshot();
        });

        it("should still render axes/brushes as SVG when useCanvas is true", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <ParallelCoordinatesPlot dimensions={dimensions} name="food" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            expect(container.querySelectorAll("g.parallel-coordinates-axis").length).toBe(dimensions.length);
            expect(container.querySelectorAll("g.parallel-coordinates-axis-brush").length).toBe(dimensions.length);
        });
    });
});
