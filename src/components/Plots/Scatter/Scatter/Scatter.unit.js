import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { themes } from "../../../../themes";

import { Scatter } from "./Scatter";

describe("Scatter", () => {
    let chartState;

    beforeEach(() => {
        chartState = {
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

            expect(store.dispatch).toHaveBeenNthCalledWith(1, {
                type: "EVENT.ADD_MARKER",
                payload: {
                    cx: expect.any(Number),
                    cy: expect.any(Number),
                    r1: expect.any(Number),
                    r2: expect.any(Number),
                    stroke: expect.any(String),
                },
            });

            expect(store.dispatch).toHaveBeenNthCalledWith(2, {
                type: "EVENT.ADD_DROPLINE",
                payload: {
                    isHorizontal: true,
                    x1: expect.any(Number),
                    x2: expect.any(Number),
                    y1: expect.any(Number),
                    y2: expect.any(Number),
                    color: expect.any(String),
                },
            });

            expect(store.dispatch).toHaveBeenNthCalledWith(3, {
                type: "EVENT.ADD_DROPLINE",
                payload: {
                    isVertical: true,
                    x1: expect.any(Number),
                    x2: expect.any(Number),
                    y1: expect.any(Number),
                    y2: expect.any(Number),
                    color: expect.any(String),
                },
            });
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

            expect(store.dispatch).toHaveBeenNthCalledWith(4, {
                type: "EVENT.REMOVE_MARKER",
                payload: {
                    cx: expect.any(Number),
                    cy: expect.any(Number),
                    r1: expect.any(Number),
                    r2: expect.any(Number),
                    stroke: expect.any(String),
                },
            });

            expect(store.dispatch).toHaveBeenNthCalledWith(5, {
                type: "EVENT.REMOVE_DROPLINE",
                payload: {
                    isHorizontal: true,
                    x1: expect.any(Number),
                    x2: expect.any(Number),
                    y1: expect.any(Number),
                    y2: expect.any(Number),
                    color: expect.any(String),
                },
            });

            expect(store.dispatch).toHaveBeenNthCalledWith(6, {
                type: "EVENT.REMOVE_DROPLINE",
                payload: {
                    isVertical: true,
                    x1: expect.any(Number),
                    x2: expect.any(Number),
                    y1: expect.any(Number),
                    y2: expect.any(Number),
                    color: expect.any(String),
                },
            });
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
