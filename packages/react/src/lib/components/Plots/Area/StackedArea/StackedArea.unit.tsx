import * as d3 from "@chart-io/d3";
import { createStore } from "@chart-io/core";

import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { actionsIncludes, getBuffer, renderChart, wait } from "../../../../testUtils";
import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";

import { StackedArea } from "./StackedArea";

expect.extend({ toMatchImageSnapshot });

describe("StackedArea", () => {
    const data = [
        { y: 0, y2: 7, x: 0 },
        { y: 5, y2: 9, x: 1 },
        { y: 10, y2: 12, x: 2 },
    ];

    const scales = {
        y: d3.scaleLinear().domain([0, 30]).range([100, 0]),
        x: d3.scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <StackedArea x="x" ys={["y", "y2"]} />,
                data,
                scales,
            });

            await wait(200);

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <StackedArea x="x" ys={["y", "y2"]} />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <StackedArea x="x" ys={["y", "y2"]} />,
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
                            <StackedArea x="x" ys={["y", "y2"]} />
                        </svg>
                    </Provider>,
                );

                await wait(1);

                act(() => {
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["x"], scale: scales.x } });
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["y", "y2"], scale: scales.y } });
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
                actionsIncludes(dispatchCalls, [
                    "EVENT.MOUSE_ENTER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_TOOLTIP_ITEM",
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
                        <StackedArea x="x" ys={["y", "y2"]} useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();
        });

        describe("should respond to event", () => {
            it("finding nearest datum and highlight the point correctly", async () => {
                const store = createStore();

                render(
                    <Provider store={store}>
                        <svg>
                            <VirtualCanvas>
                                <StackedArea x="x" ys={["y", "y2"]} useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>,
                );

                await wait(1);

                act(() => {
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["x"], scale: scales.x } });
                    store.dispatch({ type: "CHART.SET_SCALES", payload: { fields: ["y", "y2"], scale: scales.y } });
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
                actionsIncludes(dispatchCalls, [
                    "EVENT.MOUSE_ENTER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_MARKER",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_DROPLINE",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.ADD_TOOLTIP_ITEM",
                    "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
                ]);
            });
        });
    });
});
