import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

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

    it("should render the current zoom name when zoomed in and nothing is hovered", () => {
        const store = createMockStore({
            chart: { zoom: { path: ["Europe"], centerRadius: 50 } },
            event: {
                tooltip: {
                    items: [],
                },
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <CenterValueOverlay />
                </svg>
            </Provider>,
        );

        expect(getByText("Europe")).toBeInTheDocument();
    });

    it("should dispatch zooming out one level when the center hole is clicked", () => {
        const store = createMockStore({
            chart: { zoom: { path: ["Europe", "Germany"], centerRadius: 50 } },
            event: {
                tooltip: {
                    items: [],
                },
            },
        });
        store.dispatch = jest.fn();

        const { container } = render(
            <Provider store={store}>
                <svg>
                    <CenterValueOverlay />
                </svg>
            </Provider>,
        );

        fireEvent.click(container.querySelector("circle"));

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "chart/setZoomPath", payload: ["Europe"] }));
    });

    it("should prefer the hovered item's name/value over the zoomed name", () => {
        const store = createMockStore({
            chart: { zoom: { path: ["Europe"], centerRadius: 50 } },
            event: {
                tooltip: {
                    items: [{ name: "Germany", value: 5, icon: "square", fill: "blue" }],
                },
            },
        });

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <svg>
                    <CenterValueOverlay />
                </svg>
            </Provider>,
        );

        expect(getByText("Germany")).toBeInTheDocument();
        expect(queryByText("Europe")).not.toBeInTheDocument();
    });
});
