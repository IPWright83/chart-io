import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../testUtils";

import { SetZoomable } from "./SetZoomable";

describe("SetZoomable", () => {
    it("should dispatch setZoomable with the given value", () => {
        const store = createMockStore({ chart: { zoomable: false } });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <SetZoomable zoomable={true} />
            </Provider>,
        );

        expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: true }));
    });

    it("should render nothing", () => {
        const store = createMockStore({ chart: { zoomable: false } });

        const { container } = render(
            <Provider store={store}>
                <SetZoomable zoomable={false} />
            </Provider>,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
