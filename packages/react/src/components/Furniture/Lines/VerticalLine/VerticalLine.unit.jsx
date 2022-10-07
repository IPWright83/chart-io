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
                    <VerticalLine xStart={250} xStop={750} x="x" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with no xStart", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <VerticalLine xStop={500} x="x" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with no xStop", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <VerticalLine xStart={500} x="x" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing scale", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <VerticalLine x="foo" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
