import { d3, themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore, wait } from "../../../testUtils";

import { RadialAxis } from ".";

describe("RadialAxis", () => {
    const width = 200;
    const height = 200;

    describe("with a single field", () => {
        const store = createMockStore({
            chart: {
                theme: themes.light,
                animationDuration: 0,
                dimensions: { width, height },
                data: [{ value: 10 }, { value: 90 }],
                scales: {
                    value: {
                        scale: d3.scaleLinear().domain([0, 100]).range([0, 100]),
                        domain: [0, 100],
                        range: [0, 100],
                    },
                },
            },
        });

        it("should render a concentric ring and label per real tick value", async () => {
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

    describe("with multiple, independently-scaled fields", () => {
        const store = createMockStore({
            chart: {
                theme: themes.light,
                animationDuration: 0,
                dimensions: { width, height },
                data: [
                    { value: 10, otherValue: 1000 },
                    { value: 90, otherValue: 9000 },
                ],
            },
        });

        it("should render a normalized concentric ring and label per tick", async () => {
            const { asFragment } = render(
                <Provider store={store}>
                    <svg>
                        <RadialAxis fields={["value", "otherValue"]} ticks={5} />
                    </svg>
                </Provider>,
            );

            await wait();
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
