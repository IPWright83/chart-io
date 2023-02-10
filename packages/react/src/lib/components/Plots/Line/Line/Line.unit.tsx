import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../../VirtualCanvas";
import { Line } from "./Line";
import { createStore } from "../../../../store";

expect.extend({ toMatchImageSnapshot });

import { getBuffer, wait, renderChart } from "../../../../testUtils";

describe("Line", () => {
    const data = [
        { y: 0, x: 0 },
        { y: 5, x: 1 },
        { y: 10, x: 2 },
        { y: 0, x: 3 },
    ];

    const scales = {
        y: d3.scaleLinear().domain([0, 20]).range([100, 0]),
        x: d3.scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Line x="x" y="y" />,
                data,
                scales,
            });

            // Wait for the second render of the line, as
            // first render we put in a placeholder to animate
            await wait(10);

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Line x="x" y="y" />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Line x="x" y="y" />,
                    data,
                    scales: { x: scales.x },
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("should respond to event", () => {
            it("finding nearest datum and highlight the point correctly", async () => {
                const store = createStore();

                render(
                    <Provider store={store}>
                        <svg>
                            <Line x="x" y="y" />
                        </svg>
                    </Provider>
                );

                // Wait for the second render of the line, as
                // first render we put in a placeholder to animate
                await wait(10);

                act(() => {
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["x"], scale: scales.x } });
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["y"], scale: scales.y } });
                    store.dispatch({ type: "CHART.SET_DATA", payload: data });
                    store.dispatch({ type: "CHART.SET_DIMENSIONS", payload: { width: 200, height: 200 } });
                });

                // Spy on the store for the updates from the Area chart
                const originalDispatch = store.dispatch;
                jest.spyOn(store, "dispatch").mockImplementationOnce((action) => originalDispatch(action));

                act(() => {
                    // Simulate a mouse move on the background
                    store.dispatch({ type: "EVENT.MOUSE_ENTER", payload: { offsetX: 25, offsetY: 80 } });
                });

                await wait(1);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                expect(dispatchCalls).toEqual([
                    "EVENT.MOUSE_ENTER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                ]);
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <Line x="x" y="y" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            // Wait for the second render of the line, as
            // first render we put in a placeholder to animate
            await wait(10);

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            // const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            // expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });

        describe("should respond to event", () => {
            it("finding nearest datum and highlight the point correctly", async () => {
                const store = createStore();

                render(
                    <Provider store={store}>
                        <svg>
                            <VirtualCanvas>
                                <Line x="x" y="y" useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>
                );

                // Wait for the second render of the line, as
                // first render we put in a placeholder to animate
                await wait(10);

                act(() => {
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["x"], scale: scales.x } });
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["y"], scale: scales.y } });
                    store.dispatch({ type: "CHART.SET_DATA", payload: data });
                    store.dispatch({ type: "CHART.SET_DIMENSIONS", payload: { width: 200, height: 200 } });
                });

                // Spy on the store for the updates from the Area chart
                const originalDispatch = store.dispatch;
                jest.spyOn(store, "dispatch").mockImplementationOnce((action) => originalDispatch(action));

                // Simulate a mouse move on the background
                act(() => {
                    store.dispatch({ type: "EVENT.MOUSE_ENTER", payload: { offsetX: 25, offsetY: 80 } });
                });

                await wait(1);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                expect(dispatchCalls).toEqual([
                    "EVENT.MOUSE_ENTER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                ]);
            });
        });
    });
});
