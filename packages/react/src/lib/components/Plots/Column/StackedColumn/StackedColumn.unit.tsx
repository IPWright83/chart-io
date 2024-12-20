import { scaleBand, scaleLinear } from "@chart-io/d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { StackedColumn } from "./StackedColumn";

expect.extend({ toMatchImageSnapshot });

import {
    actionsIncludes,
    getBuffer,
    renderChart,
    testMouseClick,
    testMouseExit,
    testMouseOver,
    wait,
} from "../../../../testUtils";

describe("StackedColumn", () => {
    const expectedDatum = {
        x: "A",
        y: 5,
        y2: 7,
    };

    const data = [
        { x: "A", y: 5, y2: 7 },
        { x: "B", y: 10, y2: 15 },
    ];

    const scales = {
        x: scaleBand().domain(["A", "B"]).range([0, 100]),
        y: scaleLinear().domain([0, 30]).range([100, 0]),
        y2: scaleLinear().domain([0, 30]).range([100, 0]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <StackedColumn x="x" ys={["y", "y2"]} />,
                data,
                scales,
            });

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <StackedColumn x="x" ys={["y", "y2"]} onMouseOver={onMouseOver} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseOver(container, "rect", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: <StackedColumn x="x" ys={["y", "y2"]} onMouseOut={onMouseOut} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseExit(container, "rect", onMouseOut, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    // Mouseexit
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                    "event/setTooltipBorderColor",
                    "event/removeTooltipItem",
                    "event/removeTooltipItem",
                    "event/removeTooltipItem",
                    "event/removeDropline",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <StackedColumn x="x" ys={["y", "y2"]} onClick={onClick} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseClick(container, "rect", onClick, expectedDatum);
            });
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <StackedColumn x="x" ys={["y", "y2"]} />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <StackedColumn x="x" ys={["y", "y2"]} />,
                    data,
                    scales: { x: scales.x },
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <StackedColumn x="x" ys={["y", "y2"]} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <StackedColumn x="x" ys={["y", "y2"]} onMouseOver={onMouseOver} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                    bubbles: true,
                    pageX: 25,
                    pageY: 95,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/mouseMove",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <StackedColumn x="x" ys={["y", "y2"]} onMouseOut={onMouseOut} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseExit(
                    container,
                    ".virtual-canvas",
                    onMouseOut,
                    expectedDatum,
                    {
                        pageX: 25,
                        pageY: 95,
                    },
                    {
                        pageX: 195,
                        pageY: 95,
                    }
                );

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/mouseMove",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
                    "event/removeTooltipItem",
                    "event/removeTooltipItem",
                    "event/removeTooltipItem",
                    "event/removeDropline",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <StackedColumn x="x" ys={["y", "y2"]} onClick={onClick} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, {
                    bubbles: true,
                    pageX: 25,
                    pageY: 95,
                });
            });
        });
    });
});
