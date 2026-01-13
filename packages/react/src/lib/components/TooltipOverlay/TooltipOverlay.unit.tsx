import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { TooltipOverlay } from ".";

describe("TooltipOverlay", () => {
    const store = createMockStore({
        event: {
            tooltip: {
                items: [
                    { name: "a", value: 3, icon: "circle", fill: "blue" },
                    { name: "b", value: 8, icon: "square", fill: "orange" },
                ],
            },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <TooltipOverlay />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should apply a custom offset correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <TooltipOverlay offset={0} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
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
                    <TooltipOverlay offset={0} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
