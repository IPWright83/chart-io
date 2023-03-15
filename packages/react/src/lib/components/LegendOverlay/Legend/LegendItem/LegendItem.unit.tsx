import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { LegendItem } from ".";

import { createMockStore } from "../../../../testUtils";

describe("LegendItem", () => {
    const store = createMockStore({});

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <LegendItem name="Series1" icon="circle" fill="red" />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
