import { themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore, wait } from "../../../testUtils";

import { RadialAxis } from ".";

describe("RadialAxis", () => {
    const width = 200;
    const height = 200;

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height },
            data: [{ value: 10 }, { value: 90 }],
        },
    });

    it("should render a normalized concentric ring and label per tick", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <RadialAxis fields="value" ticks={5} />
                </svg>
            </Provider>,
        );

        // Wait for the entrance transition to settle so the snapshot deterministically
        // captures the final ring/label size rather than a mid-animation frame
        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
