import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createMockStore } from "../../../../testUtils";

import { VerticalLine } from ".";

describe("VerticalLine", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            scales: {
                x: d3
                    .scaleLinear()
                    .domain([0, 1000])
                    .range([0, 200]),
            },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <VerticalLine value={500} x="x" stroke="steelblue" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing scale", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <VerticalLine value={500} x="foo" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
