import React from "react";
import { Provider } from "react-redux";
import TestRenderer from "react-test-renderer";

import { Markers } from "./Markers";

describe("Markers", () => {
    const store = {
        getState: () => ({
            event: {
                markers: [{ fill: "red", stroke: "blue", r1: 5, r2: 5, cx: 50, cy: 50 }],
            },
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    it("should render correctly", () => {
        const layer = { current: document.createElement("custom") };

        TestRenderer.act(() => {
            TestRenderer.create(
                <Provider store={store}>
                    <Markers layer={layer} />
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
                    <Markers layer={layer} />
                </Provider>
            ).toJSON();
        });

        // Should be empty
        expect(layer.current).toMatchSnapshot();
    });
});
