import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { chartSelectors, createStore, chartActions, themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../../testUtils/createMockStore.ts";
import StoreProvider from "../../../redux/StoreProvider.svelte";
import type { IStore } from "@chart-io/core";
import YAxis from "./YAxis.svelte";

describe("YAxis", () => {
    it("renders correctly", () => {
        const scale = d3.scaleLinear().domain([0, 10]).range([340, 20]);
        const store = createMockStorybookStore({
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

        const { container } = render(StoreProvider, {
            props: { overrideStore: store as IStore },
        });

        new YAxis({
            target: container,
            context: new Map([["store", store]]),
            props: { position: "left", fields: ["y"], showGridlines: false },
        });

        expect(container.querySelector(".axis-left")).toBeTruthy();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();
        store.dispatch(chartActions.setDimensions(300, 400, { left: 60, right: 40, top: 20, bottom: 40 }));
        store.dispatch(chartActions.setData([{ y: 0 }, { y: 5 }, { y: 10 }]));

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
