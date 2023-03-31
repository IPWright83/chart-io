import * as d3 from "@chart-it/d3";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../testUtils";
import { themes } from "../../../themes";

import { Axis } from ".";
import { getTransform } from "./getTransform";

describe("Axis", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 10, right: 20, top: 30, bottom: 40 };

    const store = createMockStore({
        chart: {
            theme: themes.light,
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
    });

    describe("component", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("renders a left axis", async () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Axis title="y" position="left" fields={["y"]} showGridlines={false} />
                    </svg>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a right axis", () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Axis title="y" position="right" fields={["y"]} showGridlines={false} />
                    </svg>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a top axis", () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Axis title="x" position="top" fields={["x"]} showGridlines={false} />
                    </svg>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("renders a bottom axis", () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <Axis title="x" position="left" fields={["x"]} showGridlines={false} />
                    </svg>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it("throws an error with no field", async () => {
            jest.spyOn(console, "error").mockImplementation((e) => e);

            await expect(async () => {
                render(
                    <svg>
                        <Axis title="x" position="left" fields={[]} showGridlines={false} />
                    </svg>
                );
            }).rejects.toThrow();
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
            // @ts-expect-error: Testing out runtime validation
            expect(() => getTransform("invalid", width, height, margin)).toThrow();
        });
    });
});
