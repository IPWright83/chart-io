import { scaleBand, scaleLinear } from "@chart-io/d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { GroupedBar } from "./GroupedBar";

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

describe("GroupedColumn", () => {
    const expectedDatum = {
        y: "A",
        x: 5,
        x2: 7,
        key: "x",
        value: 5,
    };

    const data = [
        { y: "A", x: 5, x2: 7 },
        { y: "B", x: 10, x2: 15 },
    ];

    const scales = {
        y: scaleBand().domain(["A", "B"]).range([0, 100]),
        x: scaleLinear().domain([0, 20]).range([0, 100]),
        x2: scaleLinear().domain([0, 20]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <GroupedBar y="y" xs={["x", "x2"]} />,
                data,
                scales,
            });

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <GroupedBar y="y" xs={["x", "x2"]} onMouseOver={onMouseOver} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseOver(container, "rect", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: <GroupedBar y="y" xs={["x", "x2"]} onMouseOut={onMouseOut} />,
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
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",
                    "event/setTooltipBorderColor",
                    "event/removeTooltipItem",
                    "event/removeTooltipItem",
                    "event/removeDropline",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <GroupedBar y="y" xs={["x", "x2"]} onClick={onClick} />,
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
                    children: <GroupedBar y="y" xs={["x", "x2"]} />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <GroupedBar y="y" xs={["x", "x2"]} />,
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
                        <GroupedBar y="y" xs={["x", "x2"]} useCanvas={true} />
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
                            <GroupedBar y="y" xs={["x", "x2"]} onMouseOver={onMouseOver} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseOver(container, ".virtual-canvas", onMouseOver, expectedDatum, {
                    bubbles: true,
                    pageX: 10,
                    pageY: 15,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                actionsIncludes(dispatchCalls, [
                    "chart/addLegendItem",
                    "chart/addLegendItem",
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
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
                            <GroupedBar y="y" xs={["x", "x2"]} onMouseOut={onMouseOut} useCanvas={true} />
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
                        pageX: 10,
                        pageY: 15,
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
                    // Mouseover
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                    "event/addDropline",

                    // Mouseexit
                    "event/mouseMove",
                    "event/setTooltipBorderColor",
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
                            <GroupedBar y="y" xs={["x", "x2"]} onClick={onClick} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, {
                    bubbles: true,
                    pageX: 10,
                    pageY: 15,
                });
            });
        });
    });
});
