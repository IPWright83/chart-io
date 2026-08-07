import { d3, themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore, wait } from "../../../testUtils";

import { AngleAxis } from ".";

describe("AngleAxis", () => {
    const width = 200;
    const height = 200;

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height },
            data: [{ skill: "A" }, { skill: "B" }, { skill: "C" }],
            scales: {
                skill: {
                    scale: d3
                        .scalePoint()
                        .domain(["A", "B", "C"])
                        .range([0, (2 * Math.PI * 2) / 3]),
                    domain: ["A", "B", "C"],
                    range: [0, (2 * Math.PI * 2) / 3],
                },
            },
        },
    });

    it("should render a spoke and label per category", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <AngleAxis fields="skill" />
                </svg>
            </Provider>,
        );

        // Wait for the entrance transition to settle so the snapshot deterministically
        // captures the final spoke/label position rather than a mid-animation frame
        await wait();
        expect(asFragment()).toMatchSnapshot();
    });
});
