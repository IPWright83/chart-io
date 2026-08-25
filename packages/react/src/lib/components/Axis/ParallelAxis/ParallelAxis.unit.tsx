import { themes } from "@chart-io/core";

import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";

import { createMockStore, wait } from "../../../testUtils";

import { ParallelAxis } from ".";

describe("ParallelAxis", () => {
    const width = 300;
    const height = 300;
    const data = [
        { protein: 0.3, fat: 0.2, carbs: 14 },
        { protein: 26, fat: 15, carbs: 0 },
    ];
    const dimensions = ["protein", "fat", "carbs"];

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height },
            data,
        },
    });

    it("should render its dimension label and ticks", async () => {
        const { container } = render(
            <Provider store={store}>
                <svg>
                    <ParallelAxis dimension="protein" dimensions={dimensions} ticks={5} />
                </svg>
            </Provider>,
        );

        await wait();

        expect(container.querySelector("text.parallel-coordinates-axis-label").textContent).toBe("protein");
        expect(container.querySelectorAll("g.parallel-coordinates-axis-ticks .tick").length).toBeGreaterThan(0);
    });

    it("should render a brush overlay by default", async () => {
        const { container } = render(
            <Provider store={store}>
                <svg>
                    <ParallelAxis dimension="protein" dimensions={dimensions} ticks={5} />
                </svg>
            </Provider>,
        );

        await wait();

        expect(container.querySelector("g.parallel-coordinates-axis-brush")).not.toBeNull();
    });

    it("should not render a brush overlay when brushable is false", async () => {
        const { container } = render(
            <Provider store={store}>
                <svg>
                    <ParallelAxis dimension="protein" dimensions={dimensions} ticks={5} brushable={false} />
                </svg>
            </Provider>,
        );

        await wait();

        expect(container.querySelector("g.parallel-coordinates-axis-brush")).toBeNull();
    });

    it("should clear its filter from the store on unmount", async () => {
        jest.spyOn(store, "dispatch");

        const { unmount } = render(
            <Provider store={store}>
                <svg>
                    <ParallelAxis dimension="protein" dimensions={dimensions} ticks={5} />
                </svg>
            </Provider>,
        );

        await wait();
        unmount();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "chart/setFilter",
            payload: { field: "protein", value: null },
        });
    });
});
