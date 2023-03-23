import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { LegendOverlay } from ".";

describe("LegendOverlay", () => {
    const store = createMockStore({
        chart: {
            legend: {
                items: [
                    { name: "a", icon: "circle", fill: "blue" },
                    { name: "b", icon: "square", fill: "orange" },
                ],
            },
        },
    });

    it("should render a vertical alignment correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay horizontalPosition="LEFT" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render a horizontal alignment correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay verticalPosition="TOP" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if there are no items", async () => {
        const store = createMockStore({
            chart: {
                legend: {
                    items: [],
                },
            },
        });

        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <LegendOverlay offset={0} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
