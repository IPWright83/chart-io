import { Provider } from "react-redux";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { PivotControl } from ".";

describe("PivotControl", () => {
    it("should render nothing when pivoting isn't enabled", () => {
        const store = createMockStore({ chart: { pivotable: false, pivot: "grid" } });

        const { container } = render(
            <Provider store={store}>
                <svg>
                    <PivotControl />
                </svg>
            </Provider>,
        );

        expect(container.querySelector("foreignObject")).toBeNull();
    });

    it("should render a clickable option for every layout once pivoting is enabled", () => {
        const store = createMockStore({ chart: { pivotable: true, pivot: "grid" } });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <PivotControl />
                </svg>
            </Provider>,
        );

        expect(getByText("Grid")).toBeTruthy();
        expect(getByText("Rows")).toBeTruthy();
        expect(getByText("Columns")).toBeTruthy();
    });

    it("should switch to the clicked layout", () => {
        const store = createMockStore({ chart: { pivotable: true, pivot: "grid" } });

        const { getByText } = render(
            <Provider store={store}>
                <svg>
                    <PivotControl />
                </svg>
            </Provider>,
        );

        fireEvent.click(getByText("Rows"));

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: "rows" }));
    });
});
