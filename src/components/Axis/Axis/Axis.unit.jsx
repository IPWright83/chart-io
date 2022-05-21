import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";

import { render } from "@testing-library/react";

import { getTransform } from "./getTransform";
import { Axis } from "./Axis";

describe("Axis", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 10, right: 20, top: 30, bottom: 40 };

    const store = {
        getState: () => ({
            chart: {
                dimensions: {
                    width,
                    height,
                    margin,
                },
                scales: {
                    x: d3.scaleLinear().domain([0, width]).range([0, 100]),
                    y: d3.scaleLinear().domain([0, width]).range([0, 50]),
                },
            },
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    describe("component", () => {
        it("renders a left axis", async () => {
            const layer = { current: document.createElement("custom") };

            const { asFragment } = render(
                <Provider store={store}>
                    <Axis layer={layer} title="y" position="left" fields={["y"]} showGridlines={false} />
                </Provider>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a right axis", () => {
            const layer = { current: document.createElement("custom") };

            const { asFragment } = render(
                <Provider store={store}>
                    <Axis layer={layer} title="y" position="right" fields={["y"]} showGridlines={false} />
                </Provider>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a top axis", () => {
            const layer = { current: document.createElement("custom") };

            const { asFragment } = render(
                <Provider store={store}>
                    <Axis layer={layer} title="x" position="top" fields={["x"]} showGridlines={false} />
                </Provider>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a bottom axis", () => {
            const layer = { current: document.createElement("custom") };

            const { asFragment } = render(
                <Provider store={store}>
                    <Axis layer={layer} title="x" position="left" fields={["x"]} showGridlines={false} />
                </Provider>,
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe("getTransform", () => {
        describe("should return correct transform", () => {
            it("for left axis", () => {
                expect(getTransform("left", width, height, margin)).toBe("translate(10, 0)");
            });
            it("for right axis", () => {
                expect(getTransform("right", width, height, margin)).toBe("translate(980, 0)");
            });
        });

        describe("should return correct transform", () => {
            it("for top axis", () => {
                expect(getTransform("top", width, height, margin)).toBe("translate(0, 30)");
            });
            it("for bottom axis", () => {
                expect(getTransform("bottom", width, height, margin)).toBe("translate(0, 460)");
            });
        });

        describe("should return no translation", () => {
            it("for a 0 width", () => {
                expect(getTransform("top", 0, height, margin)).toBe("translate(0, 0)");
            });
            it("for a 0 height", () => {
                expect(getTransform("top", width, 0, margin)).toBe("translate(0, 0)");
            });
        });

        it("throws an error with an invalid position", () => {
            expect(() => getTransform("invalid", width, height, margin)).toThrow();
        });
    });
});
