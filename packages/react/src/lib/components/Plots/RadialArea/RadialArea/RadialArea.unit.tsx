import { chartActions, createStore, d3, eventActions } from "@chart-io/core";

import { act, render } from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";
import { Provider } from "react-redux";

import { VIRTUAL_CANVAS_DEBOUNCE, VirtualCanvas } from "../../../VirtualCanvas";
import { RadialArea } from "./RadialArea";

expect.extend({ toMatchImageSnapshot });

import { actionsIncludes, getBuffer, renderChart, wait } from "../../../../testUtils";

describe("RadialArea", () => {
    const data = [
        { day: 0, temp: 10 },
        { day: 1, temp: 40 },
        { day: 2, temp: 80 },
        { day: 3, temp: 50 },
    ];

    // A 200x200 chart (cx=cy=100, maxRadius=100), "day" spread over the full circle
    const scales = {
        day: d3.scaleLinear().domain([0, 3]).range([0, 2 * Math.PI]),
        temp: d3.scaleLinear().domain([0, 100]).range([0, 100]),
    };

    describe("using SVG", () => {
        it("should render correctly", async () => {
            const { asFragment } = await renderChart({
                children: <RadialArea x="day" y="temp" />,
                data,
                scales,
            });

            // Wait for the second render of the area, as the first render is a placeholder to animate from
            await wait(100);
            expect(asFragment()).toMatchSnapshot();
        });

        it("should render as a closed loop when closed is true", async () => {
            const { asFragment } = await renderChart({
                children: <RadialArea x="day" y="temp" closed={true} />,
                data,
                scales,
            });

            await wait(100);
            expect(asFragment()).toMatchSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <RadialArea x="day" y="temp" />,
                    data,
                    scales: { temp: scales.temp },
                });

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                const { asFragment } = await renderChart({
                    children: <RadialArea x="day" y="temp" />,
                    data,
                    scales: { day: scales.day },
                });

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("should respond to event", () => {
            it("finding nearest datum and highlighting the point correctly", async () => {
                const store = createStore();

                render(
                    <Provider store={store}>
                        <svg>
                            <RadialArea x="day" y="temp" />
                        </svg>
                    </Provider>,
                );

                await wait(10);

                act(() => {
                    store.dispatch(chartActions.setScales({ fields: ["day"], scale: scales.day }));
                    store.dispatch(chartActions.setScales({ fields: ["temp"], scale: scales.temp }));
                    store.dispatch(chartActions.setChartData(data));
                    store.dispatch(
                        chartActions.setDimensions({
                            width: 200,
                            height: 200,
                            margin: { top: 0, left: 0, right: 0, bottom: 0 },
                        }),
                    );
                });

                const originalDispatch = store.dispatch;
                jest.spyOn(store, "dispatch").mockImplementationOnce((action) => originalDispatch(action));

                // Roughly targets the "day: 1" point (angle ~2.09 rad, radius 40, from a (100, 100) center)
                act(() => {
                    store.dispatch(eventActions.mouseEnter({ offsetX: 135, offsetY: 120 }));
                });

                await wait(1);

                const dispatchCalls = (store.dispatch as jest.Mock).mock.calls.map((c) => c[0].type);
                actionsIncludes(dispatchCalls, [
                    "event/mouseEnter",
                    "event/addMarker",
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
                        <RadialArea x="day" y="temp" useCanvas={true} />
                    </VirtualCanvas>
                ),
                data,
                scales,
            });

            await wait(10);
            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();
        });
    });
});
