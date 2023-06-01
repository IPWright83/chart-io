import * as d3 from "@chart-it/d3";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../../testUtils";

import { HorizontalLine } from ".";

describe("HorizontalLine", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            scales: {
                y: {
                    scale: d3.scaleLinear(),
                    domain: [0, 1000],
                    range: [200, 0],
                },
            },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <HorizontalLine value={500} y="y" stroke="steelblue" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing scale", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <HorizontalLine value={500} y="foo" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
