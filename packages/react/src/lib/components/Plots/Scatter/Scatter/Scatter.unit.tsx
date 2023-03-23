import * as d3 from "@d3-chart/d3";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { Scatter } from "./Scatter";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, renderChart, testMouseClick, testMouseExit, testMouseOver, wait } from "../../../../testUtils";

describe("Scatter", () => {
    const data = [
        { x: 5, y: 5 },
        { x: 10, y: 10 },
    ];
    const scales = {
        x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
        y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
    };
    const expectedDatum = {
        x: 5,
        y: 5,
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Scatter x="x" y="y" />,
                data,
                scales,
            });

            await wait(100);

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: <Scatter x="x" y="y" onMouseOver={onMouseOver} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await testMouseOver(container, "circle", onMouseOver, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: <Scatter x="x" y="y" onMouseOut={onMouseOut} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await testMouseExit(container, "circle", onMouseOut, expectedDatum);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                    "EVENT.REMOVE_MARKER",
                    "EVENT.REMOVE_DROPLINE",
                    "EVENT.REMOVE_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: <Scatter x="x" y="y" onClick={onClick} />,
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");

                await testMouseClick(container, "circle", onClick, expectedDatum);
            });
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Scatter x="x" y="y" />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Scatter x="x" y="y" />,
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
                        <Scatter x="x" y="y" useCanvas={true} />
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

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { container } = await renderChart({
                    children: <Scatter x="x" y="y" useCanvas={true} />,
                    data,
                    scales: { y: scales.y },
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvasBuffer = getBuffer(container.querySelector(".canvas"));
                expect(canvasBuffer).toMatchImageSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { container } = await renderChart({
                    children: <Scatter x="x" y="y" useCanvas={true} />,
                    data,
                    scales: { x: scales.x },
                });

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvasBuffer = getBuffer(container.querySelector(".canvas"));
                expect(canvasBuffer).toMatchImageSnapshot();
            });
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Scatter x="x" y="y" onMouseOver={onMouseOver} useCanvas={true} />
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
                    pageY: 25,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    "EVENT.MOUSE_MOVE",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                ]);
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Scatter x="x" y="y" onMouseOut={onMouseOut} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseExit(container, ".virtual-canvas", onMouseOut, expectedDatum, {
                    bubbles: true,
                    pageX: 25,
                    pageY: 25,
                });

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);

                expect(dispatchCalls).toEqual([
                    // Mouseover
                    "EVENT.MOUSE_MOVE",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",

                    // MouseExit
                    "EVENT.MOUSE_MOVE",
                    "EVENT.REMOVE_MARKER",
                    "EVENT.REMOVE_DROPLINE",
                    "EVENT.REMOVE_DROPLINE",
                    "EVENT.SET_TOOLTIP_COLOR",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                    "EVENT.REMOVE_TOOLTIP_ITEM",
                ]);
            });

            it("click correctly", async () => {
                const onClick = jest.fn();

                const { container, store } = await renderChart({
                    children: (
                        <VirtualCanvas>
                            <Scatter x="x" y="y" onClick={onClick} useCanvas={true} />
                        </VirtualCanvas>
                    ),
                    data,
                    scales,
                });

                jest.spyOn(store, "dispatch");
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                await testMouseClick(container, ".virtual-canvas", onClick, expectedDatum, {
                    pageX: 25,
                    pageY: 25,
                });
            });
        });
    });
});
