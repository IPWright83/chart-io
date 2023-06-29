import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../../testUtils";

import { getTransform } from "./getTransform";
import { Title } from "./Title";

describe("Title", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 50, right: 60, top: 30, bottom: 40 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const store = createMockStore({
        chart: {
            dimensions: {
                width,
                height,
                plotMargin: margin,
            },
        },
    });

    describe("getTransform", () => {
        describe("should return correct transform", () => {
            it("for left axis", () => {
                expect(getTransform("left", plotWidth, plotHeight, margin)).toBe("translate(0, 230)rotate(270)");
            });
            it("for right axis", () => {
                expect(getTransform("right", plotWidth, plotHeight, margin)).toBe("translate(995, 230)rotate(270)");
            });
        });

        describe("should return correct transform", () => {
            it("for top axis", () => {
                expect(getTransform("top", plotWidth, plotHeight, margin)).toBe("translate(470, 5)");
            });
            it("for bottom axis", () => {
                expect(getTransform("bottom", plotWidth, plotHeight, margin)).toBe("translate(470, 495)");
            });
        });

        describe("should return no translation", () => {
            it("for a 0 width", () => {
                expect(getTransform("top", 0, plotHeight, margin)).toBe("translate(0, 0)");
            });
            it("for a 0 height", () => {
                expect(getTransform("top", plotWidth, 0, margin)).toBe("translate(0, 0)");
            });
        });

        it("throws an error with an invalid position", () => {
            // @ts-expect-error Testing the case of an invalid value
            expect(() => getTransform("invalid", width, height, margin)).toThrow();
        });
    });

    describe("component", () => {
        describe("with title set", () => {
            it("renders horizontal title", async () => {
                const { asFragment } = render(
                    <Provider store={store}>
                        <svg>
                            <Title position="bottom" title="horizontal" />
                        </svg>
                    </Provider>
                );

                expect(asFragment()).toMatchSnapshot();
            });

            it("renders vertical title", async () => {
                const { asFragment } = render(
                    <Provider store={store}>
                        <svg>
                            <Title position="left" title="vertical" />
                        </svg>
                    </Provider>
                );

                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe("with no explicit title", () => {
            it("renders nothing", async () => {
                const { asFragment } = render(
                    <Provider store={store}>
                        <svg>
                            <Title position="bottom" />
                        </svg>
                    </Provider>
                );

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });
});
