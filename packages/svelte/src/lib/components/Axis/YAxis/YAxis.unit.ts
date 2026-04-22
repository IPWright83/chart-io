import { d3, themes } from "@chart-io/core";
import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { STORE_KEY } from "../../../redux/constants";
import { createMockStore } from "../../../testUtils/createMockStore";
import YAxis from "./YAxis.svelte";

describe("YAxis", () => {
    it("renders correctly", () => {
        const scale = d3.scaleLinear().domain([0, 10]).range([340, 20]);
        const store = createMockStore({
            chart: {
                theme: themes.light,
                animationDuration: 0,
                dimensions: {
                    width: 300,
                    height: 400,
                    plotMargin: { left: 60, right: 40, top: 20, bottom: 40 },
                },
                scales: {
                    y: { scale, domain: [0, 10], range: [340, 20] },
                },
            },
        });

        const { container } = render(YAxis, {
            props: { position: "left", fields: ["y"], showGridlines: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelector(".axis-left")).toBeTruthy();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();
        store.dispatch(chartActions.setDimensions({ width: 300, height: 400, margin: { left: 60, right: 40, top: 20, bottom: 40 } }));
        store.dispatch(chartActions.setChartData([{ y: 0 }, { y: 5 }, { y: 10 }]));

        const { container } = render(StoreProvider, {
            props: { overrideStore: store as IStore },
        });

        new YAxis({
            target: container,
            context: new Map([["store", store]]),
            props: { position: "left", fields: ["y"], showGridlines: false },
        });

        const scale = chartSelectors.scales.getScale(store.getState(), "y", "plot");
        expect(scale).toBeDefined();
        expect(scale.domain()).toEqual([0, 10]);
        expect(scale.range()).toEqual([340, 20]);
    });
});
