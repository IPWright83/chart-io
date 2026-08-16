import { d3, themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore, wait } from "../../../testUtils";

import { ZAxis } from ".";

describe("ZAxis", () => {
    const width = 200;
    const height = 200;

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height },
            data: [{ population: 10 }, { population: 50 }, { population: 100 }],
            scales: {
                population: {
                    scale: d3.scaleLinear().domain([0, 100]).range([5, 25]),
                    domain: [0, 100],
                    range: [5, 25],
                },
            },
        },
    });

    it("should render a nested circle, leader line and label per representative value", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" ticks={3} />
                </svg>
            </Provider>,
        );

        // Wait for the entrance transition to settle so the snapshot deterministically captures
        // the final circle/label position rather than a mid-animation frame
        await wait();
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render on the left, hanging from the top, when positioned there", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" ticks={3} horizontalPosition="LEFT" verticalPosition="TOP" />
                </svg>
            </Provider>,
        );

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render a circle per explicit tickValues, ignoring ticks", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <ZAxis fields="population" tickValues={[10, 100]} />
                </svg>
            </Provider>,
        );

        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
