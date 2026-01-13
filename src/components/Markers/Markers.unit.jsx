import React from "react";
import { Provider } from "react-redux";

import { render } from "@testing-library/react";

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

        render(
            <Provider store={store}>
                <Markers layer={layer} />
            </Provider>,
        );

        expect(layer).toMatchSnapshot();
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };

        render(
            <Provider store={store}>
                <Markers layer={layer} />
            </Provider>,
        );

        // Should be empty
        expect(layer).toMatchSnapshot();
    });
});
