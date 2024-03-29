import * as d3 from "@chart-io/d3";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore } from "../../../../testUtils";

import { HorizontalBand } from ".";

describe("HorizontalBand", () => {
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
                    <HorizontalBand yStart={250} yStop={750} y="y" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with no yStart", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <HorizontalBand yStop={500} y="y" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with no yStop", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <HorizontalBand yStart={250} yStop={750} y="y" fill="steelblue" stroke="red" opacity={0.3} />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render nothing if missing scale", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <HorizontalBand y="foo" />
                </svg>
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
