import { chartActions, createStore, eventActions } from "@chart-io/core";
import * as d3 from "@chart-io/d3";

import { act, render } from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";
import { Provider } from "react-redux";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { Area } from "./Area";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, wait } from "../../../../testUtils";

describe("Area", () => {
    const data = [
        { y: 0, x: 0 },
        { y: 5, x: 1 },
        { y: 10, x: 2 },
        { y: 5, x: 3 },
    ];

    const scales = {
        y: d3.scaleLinear().domain([0, 20]).range([100, 0]),
        x: d3.scaleLinear().domain([0, 5]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <Area x="x" y="y" />,
                data,
                scales,
            });

            // Wait for the second render of the area, as
            // first render we put in a placeholder to animate
            await wait(100);

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Area x="x" y="y" />,
                    data,
                    scales: { y: scales.y },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <Area x="x" y="y" />,
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
                            <Area x="x" y="y" />
                        </svg>
                    </Provider>,
                );

                // Wait for the second render of the area, as
                // first render we put in a placeholder to animate
                await wait(10);

                act(() => {
                    store.dispatch(chartActions.setScales({ fields: ["x"], scale: scales.x }));
                    store.dispatch(chartActions.setScales({ fields: ["y"], scale: scales.y }));
                    store.dispatch(chartActions.setChartData(data));
                    store.dispatch(chartActions.setDimensions({
                        width: 200,
                        height: 200,
                        margin: { top: 0, left: 0, right: 0, bottom: 0 }
                    }));
                });

                // Spy on the store for the updates from the Area chart
                const originalDispatch = store.dispatch;
                jest.spyOn(store, "dispatch").mockImplementationOnce((action) => originalDispatch(action));

                // Simulate a mouse move on the background
                act(() => {
                    store.dispatch(eventActions.mouseEnter({ offsetX: 25, offsetY: 80 }));
                });

                await wait(1);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                actionsIncludes(dispatchCalls, [
                    "event/mouseEnter",
                    "event/addMarker",
                    "event/addDropline",
                    "event/addDropline",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = await renderChart({
                children: (
                    <VirtualCanvas>
                        <Area x="x" y="y" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            // Wait for the second render of the area, as
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
                                <Area x="x" y="y" useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>,
                );

                // Wait for the second render of the area, as
                // first render we put in a placeholder to animate
                await wait(10);

                act(() => {
                    store.dispatch(chartActions.setScales({ fields: ["x"], scale: scales.x }));
                    store.dispatch(chartActions.setScales({ fields: ["y"], scale: scales.y }));
                    store.dispatch(chartActions.setChartData(data));
                    store.dispatch(chartActions.setDimensions({
                        width: 200,
                        height: 200,
                        margin: { top: 0, left: 0, bottom: 0, right: 0 },
                    }));
                });

                // Spy on the store for the updates from the Area chart
                const originalDispatch = store.dispatch;
                jest.spyOn(store, "dispatch").mockImplementationOnce((action) => originalDispatch(action));

                // Simulate a mouse move on the background
                act(() => {
                    store.dispatch(eventActions.mouseEnter({ offsetX: 25, offsetY: 80 }));
                });

                await wait(1);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                actionsIncludes(dispatchCalls, [
                    "event/mouseEnter",
                    "event/addMarker",
                    "event/addDropline",
                    "event/addDropline",
                    "event/addTooltipItem",
                    "event/addTooltipItem",
                    "event/setPositionEvent",
                ]);
            });
        });
    });
});
