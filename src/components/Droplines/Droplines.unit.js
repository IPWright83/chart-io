import React from "react";
import { Provider } from "react-redux";
import TestRenderer from "react-test-renderer";
import { render } from "@testing-library/react";

import { Droplines } from "./Droplines";

describe("Droplines", () => {
    const store = {
        getState: () => ({
            event: {
                droplines: [
                    { isHorizontal: true, color: "red", x1: 50, x2: 0, y1: 50, y2: 50 },
                    { isVertical: true, color: "red", x1: 50, x2: 50, y1: 50, y2: 0 },
                ],
            },
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    it("should render correctly", async () => {
        const layer = { current: document.createElement("custom") };

        render(
            <Provider store={store}>
                <Droplines layer={layer} />
            </Provider>
        );

        expect(layer.current).toMatchSnapshot();
    });

    it("should render just vertical lines correctly", () => {
        const layer = { current: document.createElement("custom") };

        TestRenderer.act(() => {
            TestRenderer.create(
                <Provider store={store}>
                    <Droplines layer={layer} showHorizontal={false} />
                </Provider>
            ).toJSON();
        });

        expect(layer.current).toMatchSnapshot();
    });

    it("should render just horizontal lines correctly", () => {
        const layer = { current: document.createElement("custom") };

        TestRenderer.act(() => {
            TestRenderer.create(
                <Provider store={store}>
                    <Droplines layer={layer} showVertical={false} />
                </Provider>
            ).toJSON();
        });

        expect(layer.current).toMatchSnapshot();
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };
        TestRenderer.act(() => {
            TestRenderer.create(
                <Provider store={store}>
                    <Droplines layer={layer} />
                </Provider>
            ).toJSON();
        });

        // Should be empty
        expect(layer.current).toMatchSnapshot();
    });
});
