import * as d3 from "d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../../VirtualCanvas";
import { Column } from "./Column";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart, testMouseClick, testMouseOver, testMouseExit } from "../../../../testUtils";

describe("Column", () => {
    const expectedDatum = {
        x: "A",
        y: 5,
    };

    const data = [
        { x: "A", y: 5 },
        { x: "B", y: 10 },
    ];

    const scales = {
        x: d3.scaleBand().domain(["A", "B"]).range([0, 100]),
        y: d3.scaleLinear().domain([0, 20]).range([100, 0]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Column x="x" y="y" />,
                data,
                scales,
            });

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <Column x="x" y="y" onMouseOver={onMouseOver} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseOver(container, "rect", onMouseOver, expectedDatum);

                const dispatchCalls = store.dispatch.mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                    "EVENT.ADD_DROPLINE",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: <Column x="x" y="y" onMouseOut={onMouseOut} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                testMouseExit(container, "rect", onMouseOut, expectedDatum);

                const dispatchCalls = store.dispatch.mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    // Mouseexit
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_DROPLINE",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <Column x="x" y="y" onClick={onClick} />,
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
                    children: <Column x="x" y="y" />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Column x="x" y="y" />,
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
                        <Column x="x" y="y" useCanvas={true} />
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
                        <VirtualCanvas onMouseOver={onMouseOver}>
                            <Column x="x" y="y" onMouseOver={onMouseOver} useCanvas={true} />
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
                    pageY: 90,
                });

                const dispatchCalls = store.dispatch.mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    "EVENT.MOUSE_MOVE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                    "EVENT.ADD_DROPLINE",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas onMouseOut={onMouseOut}>
                            <Column x="x" y="y" onMouseOut={onMouseOut} useCanvas={true} />
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
                        pageY: 90,
                    },
                    {
                        pageX: 195,
                        pageY: 95,
                    },
                );

                const dispatchCalls = store.dispatch.mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    // Mouseover
                    "EVENT.MOUSE_MOVE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                    "EVENT.ADD_DROPLINE",

                    // Mouseexit
                    "EVENT.MOUSE_MOVE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_DROPLINE",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas onClick={onClick}>
                            <Column x="x" y="y" onClick={onClick} useCanvas={true} />
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
                    pageY: 90,
                });
            });
        });
    });
});
