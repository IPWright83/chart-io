import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { ZoomBreadcrumb } from ".";

describe("ZoomBreadcrumb", () => {
    it("should render nothing while fully zoomed out", () => {
        const store = createMockStore({ chart: { zoom: { path: [] } } });

        const { container } = render(
            <Provider store={store}>
                <svg>
                    <ZoomBreadcrumb />
                </svg>
            </Provider>,
        );

        expect(container.querySelector("foreignObject")).toBeNull();
    });

    it("should render a clickable trail for the current zoom path", () => {
        const store = createMockStore({ chart: { zoom: { path: ["North America", "United States"] } } });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <ZoomBreadcrumb />
                </svg>
            </Provider>,
        );

        expect(getByText("All")).toBeTruthy();
        expect(getByText("North America")).toBeTruthy();
        expect(getByText("United States")).toBeTruthy();
    });

    it("should zoom all the way out when clicking All", () => {
        const store = createMockStore({ chart: { zoom: { path: ["North America", "United States"] } } });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <ZoomBreadcrumb />
                </svg>
            </Provider>,
        );

        fireEvent.click(getByText("All"));

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: [] }));
    });

    it("should zoom to an ancestor when clicking it in the trail", () => {
        const store = createMockStore({ chart: { zoom: { path: ["North America", "United States"] } } });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <ZoomBreadcrumb />
                </svg>
            </Provider>,
        );

        fireEvent.click(getByText("North America"));

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: ["North America"] }));
    });
});
