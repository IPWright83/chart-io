import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { CenterValueOverlay } from ".";

describe("CenterValueOverlay", () => {
    it("should render the name/value of the hovered item", () => {
        const store = createMockStore({
            event: {
                tooltip: {
                    items: [{ name: "North / Widgets", value: 5, icon: "square", fill: "blue" }],
                },
            },
        });

        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <CenterValueOverlay />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", () => {
        const store = createMockStore({
            event: {
                tooltip: {
                    items: [],
                },
            },
        });

        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <CenterValueOverlay />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
