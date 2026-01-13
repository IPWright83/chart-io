import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";
import { themes } from "../../themes";

import { Markers } from ".";
import { Markers as MarkersBase } from "./Markers";

describe("Markers", () => {
    const store = createMockStore({
        chart: {
            theme: themes.light,
        },
        event: {
            markers: [{ fill: "red", stroke: "blue", r1: 5, r2: 5, cx: 50, cy: 50 }],
        },
    });

    it("should render correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Markers />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };

        render(
            <Provider store={store}>
                <svg>
                    <MarkersBase layer={layer} />
                </svg>
            </Provider>
        );

        // Should be empty
        expect(layer).toMatchSnapshot();
    });
});
