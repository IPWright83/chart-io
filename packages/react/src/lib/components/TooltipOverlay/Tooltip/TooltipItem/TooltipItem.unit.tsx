import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { TooltipItem } from ".";

import { createMockStore } from "../../../../testUtils";

describe("TooltipItem", () => {
    const store = createMockStore({});

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <TooltipItem name="Series1" value={5} icon="circle" fill="red" />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
