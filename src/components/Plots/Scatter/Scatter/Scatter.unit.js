import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";

import { VirtualCanvas, VIRTUAL_CANVAS_DEBOUNCE } from "../../../VirtualCanvas";
import { themes } from "../../../../themes";
import { Scatter } from "./Scatter";

import { MOUSE_MOVE_THROTTLE } from "../../../../hoc/canvas/virtual/addEventHandlers";

expect.extend({ toMatchImageSnapshot });

import { FakeMouseEvent, createMockStore, getBuffer, wait } from "../../../../testUtils";

describe("Scatter", () => {
    let store;
    let chartState;

    beforeEach(() => {
        chartState = {
            animationDuration: 0,
            dimensions: {
                height: 200,
                width: 200,
            },
            data: [
                { x: 5, y: 5 },
                { x: 10, y: 10 },
            ],
            scales: {
                x: d3.scaleLinear().domain([0, 20]).range([0, 100]),
                y: d3.scaleLinear().domain([0, 20]).range([0, 100]),
            },
            theme: themes.light,
        };

        store = createMockStore({
            chartState,
        });
    });

    describe("using SVG", () => {
        it("should render correctly", () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Scatter x="x" y="y" />
                    </svg>
                </Provider>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        describe("should handle event", () => {
            it("mouseover correctly", () => {
                const onMouseOver = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" onMouseOver={onMouseOver} />
                        </svg>
                    </Provider>,
                );

                fireEvent.mouseOver(container.querySelector("circle"));
                expect(onMouseOver).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );

                expect(store.dispatch.mock.calls[0]).toMatchSnapshot("ADD_MARKER action");
                expect(store.dispatch.mock.calls[1]).toMatchSnapshot("ADD_DROPLINE action");
                expect(store.dispatch.mock.calls[2]).toMatchSnapshot("ADD_DROPLINE action");
            });

            it("mouseexit correctly", () => {
                const onMouseOut = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" onMouseOut={onMouseOut} />
                        </svg>
                    </Provider>,
                );

                fireEvent.mouseOver(container.querySelector("circle"));
                fireEvent.mouseLeave(container.querySelector("circle"));
                expect(onMouseOut).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );

                expect(store.dispatch.mock.calls[7]).toMatchSnapshot("REMOVE_MARKER action");
                expect(store.dispatch.mock.calls[8]).toMatchSnapshot("REMOVE_DROPLINE action");
                expect(store.dispatch.mock.calls[9]).toMatchSnapshot("REMOVE_DROPLINE action");
            });

            it("click correctly", () => {
                const onClick = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" onClick={onClick} />
                        </svg>
                    </Provider>,
                );

                fireEvent.click(container.querySelector("circle"));
                expect(onClick).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );
            });
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", () => {
                delete chartState.scales.x;

                const { asFragment } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" />
                        </svg>
                    </Provider>,
                );

                expect(asFragment()).toMatchSnapshot();
            });

            it("there is no y scale avaliable", () => {
                delete chartState.scales.y;

                const { asFragment } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" />
                        </svg>
                    </Provider>,
                );

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });

    describe("using Canvas", () => {
        it("should render correctly", async () => {
            const { container } = render(
                <Provider store={store}>
                    <svg>
                        <VirtualCanvas>
                            <Scatter x="x" y="y" useCanvas={true} />
                        </VirtualCanvas>
                    </svg>
                </Provider>,
            );

            await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

            const canvasBuffer = getBuffer(container.querySelector(".canvas"));
            expect(canvasBuffer).toMatchImageSnapshot();

            const virtualCanvasBuffer = getBuffer(container.querySelector(".virtual-canvas"));
            expect(virtualCanvasBuffer).toMatchImageSnapshot();
        });

        describe("should skip rendering if", () => {
            it("there is no x scale avaliable", async () => {
                delete chartState.scales.x;

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" useCanvas={true} />
                        </svg>
                    </Provider>,
                );

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvasBuffer = getBuffer(container.querySelector(".canvas"));
                expect(canvasBuffer).toMatchImageSnapshot();
            });

            it("there is no y scale avaliable", async () => {
                delete chartState.scales.y;

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" useCanvas={true} />
                        </svg>
                    </Provider>,
                );

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                const canvasBuffer = getBuffer(container.querySelector(".canvas"));
                expect(canvasBuffer).toMatchImageSnapshot();
            });
        });

        describe("should handle event", () => {
            it("mouseover correctly", async () => {
                const onMouseOver = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <VirtualCanvas onMouseOver={onMouseOver}>
                                <Scatter x="x" y="y" onMouseOver={onMouseOver} useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>,
                );

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                fireEvent(
                    container.querySelector(".virtual-canvas"),
                    new FakeMouseEvent("mousemove", {
                        bubbles: true,
                        pageX: 25,
                        pageY: 25,
                    }),
                );

                expect(onMouseOver).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );

                expect(store.dispatch.mock.calls[0]).toMatchSnapshot("ADD_MARKER action");
                expect(store.dispatch.mock.calls[1]).toMatchSnapshot("ADD_DROPLINE action");
                expect(store.dispatch.mock.calls[2]).toMatchSnapshot("ADD_DROPLINE action");
            });

            it("mouseexit correctly", async () => {
                const onMouseOut = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <VirtualCanvas onMouseOut={onMouseOut}>
                                <Scatter x="x" y="y" onMouseOut={onMouseOut} useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>,
                );

                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                fireEvent(
                    container.querySelector(".virtual-canvas"),
                    new FakeMouseEvent("mousemove", {
                        bubbles: true,
                        pageX: 25,
                        pageY: 25,
                    }),
                );

                await wait(MOUSE_MOVE_THROTTLE * 2);

                fireEvent(
                    container.querySelector(".virtual-canvas"),
                    new FakeMouseEvent("mousemove", {
                        bubbles: true,
                        pageX: 95,
                        pageY: 95,
                    }),
                );

                expect(onMouseOut).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );

                expect(store.dispatch.mock.calls[7]).toMatchSnapshot("REMOVE_MARKER action");
                expect(store.dispatch.mock.calls[8]).toMatchSnapshot("REMOVE_DROPLINE action");
                expect(store.dispatch.mock.calls[9]).toMatchSnapshot("REMOVE_DROPLINE action");
            });

            it("click correctly", async () => {
                const onClick = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <VirtualCanvas onClick={onClick}>
                                <Scatter x="x" y="y" onClick={onClick} useCanvas={true} />
                            </VirtualCanvas>
                        </svg>
                    </Provider>,
                );

                // Need to wait for longer than the debounce timeout in VirtualCanvas
                await wait(VIRTUAL_CANVAS_DEBOUNCE * 2);

                fireEvent(
                    container.querySelector(".virtual-canvas"),
                    new FakeMouseEvent("click", {
                        bubbles: true,
                        pageX: 25,
                        pageY: 25,
                    }),
                );

                expect(onClick).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything(),
                );
            });
        });
    });
});
