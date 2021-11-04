import React from "react";
import { Provider } from "react-redux";

import TestRenderer from "react-test-renderer";

import { Title } from "./Title";
import { getTransform } from "./getTransform";

describe("Title", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 50, right: 60, top: 30, bottom: 40 };

    const store = {
        getState: () => ({
            chart: {
                dimensions: {
                    width,
                    height,
                    margin,
                },
            },
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    describe("getTransform", () => {
        describe("should return correct transform", () => {
            it("for left axis", () => {
                expect(getTransform("left", width, height, margin)).toBe("translate(0, 230)rotate(270)");
            });
            it("for right axis", () => {
                expect(getTransform("right", width, height, margin)).toBe("translate(995, 230)rotate(270)");
            });
        });

        describe("should return correct transform", () => {
            it("for top axis", () => {
                expect(getTransform("top", width, height, margin)).toBe("translate(470, 5)");
            });
            it("for bottom axis", () => {
                expect(getTransform("bottom", width, height, margin)).toBe("translate(470, 495)");
            });
        });

        it("throws an error with an invalid position", () => {
            expect(() => getTransform("invalid", width, height, margin)).toThrow();
        });
    });

    describe("component", () => {
        describe("with title set", () => {
            it("renders horizontal title", async () => {
                let root;

                TestRenderer.act(() => {
                    root = TestRenderer.create(
                        <Provider store={store}>
                            <Title position="bottom" title="horizontal" fields={["a", "b"]} />
                        </Provider>
                    ).toJSON();
                });

                expect(root).toMatchSnapshot();
            });

            it("renders vertical title", async () => {
                let root;

                TestRenderer.act(() => {
                    root = TestRenderer.create(
                        <Provider store={store}>
                            <Title position="left" title="vertical" fields={["a", "b"]} />
                        </Provider>
                    ).toJSON();
                });

                expect(root).toMatchSnapshot();
            });
        });

        describe("with no explicit title", () => {
            it("renders fields as horizontal title", async () => {
                let root;

                TestRenderer.act(() => {
                    root = TestRenderer.create(
                        <Provider store={store}>
                            <Title position="bottom" fields={["a", "b"]} />
                        </Provider>
                    ).toJSON();
                });

                expect(root).toMatchSnapshot();
            });

            it("renders fields as vertical title", async () => {
                let root;

                TestRenderer.act(() => {
                    root = TestRenderer.create(
                        <Provider store={store}>
                            <Title position="left" fields={["a", "b"]} />
                        </Provider>
                    ).toJSON();
                });

                expect(root).toMatchSnapshot();
            });
        });
    });
});
