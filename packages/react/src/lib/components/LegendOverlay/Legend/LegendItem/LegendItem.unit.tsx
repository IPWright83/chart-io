import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { LegendItem } from ".";

import { createMockStore } from "../../../../testUtils";

describe("LegendItem", () => {
    const store = createMockStore({});

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <LegendItem name="Series1" icon="circle" color="red" />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
