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
                    { name: "a", value: 3, seriesType: "scatter", fill: "blue" },
                    { name: "b", value: 8, seriesType: "column", fill: "orange" },
                ],
            },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <TooltipOverlay />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should apply a custom offset correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <TooltipOverlay offset={0} />
            </Provider>,
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
                <TooltipOverlay offset={0} />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
