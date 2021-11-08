import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { themes } from "../../../../themes";
import canvasSerializer from "jest-canvas-snapshot-serializer";

import { Scatter } from "./Scatter";

expect.addSnapshotSerializer(canvasSerializer);

describe("Scatter", () => {
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
    });

    const store = {
        getState: () => ({
            chart: chartState,
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    describe("using SVG", () => {
        it("should render correctly", () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Scatter x="x" y="y" />
                    </svg>
                </Provider>
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
                    </Provider>
                );

                fireEvent.mouseOver(container.querySelector("circle"));
                expect(onMouseOver).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything()
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
                    </Provider>
                );

                fireEvent.mouseOver(container.querySelector("circle"));
                fireEvent.mouseLeave(container.querySelector("circle"));
                expect(onMouseOut).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything()
                );

                expect(store.dispatch.mock.calls[3]).toMatchSnapshot("REMOVE_MARKER action");
                expect(store.dispatch.mock.calls[4]).toMatchSnapshot("REMOVE_DROPLINE action");
                expect(store.dispatch.mock.calls[5]).toMatchSnapshot("REMOVE_DROPLINE action");
            });

            it("click correctly", () => {
                const onClick = jest.fn();
                jest.spyOn(store, "dispatch");

                const { container } = render(
                    <Provider store={store}>
                        <svg>
                            <Scatter x="x" y="y" onClick={onClick} />
                        </svg>
                    </Provider>
                );

                fireEvent.click(container.querySelector("circle"));
                expect(onClick).toHaveBeenCalledWith(
                    {
                        x: 5,
                        y: 5,
                    },
                    expect.anything(),
                    expect.anything()
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
                    </Provider>
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
                    </Provider>
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
                        <Scatter x="x" y="y" useCanvas={true} />
                    </svg>
                </Provider>
            );

            await new Promise((resolve) => {
                setTimeout(resolve, 250);
            });

            const canvas = container.querySelector("canvas");
            expect(canvas).toMatchSnapshot();
        });
    });
});
