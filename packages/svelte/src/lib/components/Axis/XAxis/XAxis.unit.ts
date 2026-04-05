import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { chartSelectors, createStore, chartActions, themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../../testUtils/createMockStore.ts";
import StoreProvider from "../../../redux/StoreProvider.svelte";
import type { IStore } from "@chart-io/core";
import XAxis from "./XAxis.svelte";

describe("XAxis", () => {
    it("renders correctly", () => {
        const scale = d3.scaleLinear().domain([0, 10]).range([40, 760]);
        const store = createMockStorybookStore({
            chart: {
                theme: themes.light,
                animationDuration: 0,
                dimensions: {
                    width: 800,
                    height: 100,
                    plotMargin: { left: 40, right: 40, top: 10, bottom: 50 },
                },
                scales: { x: { scale, domain: [0, 10], range: [40, 760] } },
            },
        });

        const { container } = render(StoreProvider, {
            props: { overrideStore: store as IStore },
        });
        new XAxis({
            target: container,
            props: { position: "bottom", fields: ["x"], showGridlines: false },
        } as any);

        expect(container.querySelector(".axis-bottom")).toBeTruthy();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();
        store.dispatch(chartActions.setDimensions(800, 100, { left: 40, right: 40, top: 10, bottom: 50 }));
        store.dispatch(chartActions.setData([{ x: 0 }, { x: 5 }, { x: 10 }]));

        const { container } = render(StoreProvider, {
            props: { overrideStore: store as IStore },
        });
        new XAxis({
            target: container,
            props: { position: "bottom", fields: ["x"], showGridlines: false },
        } as any);

        const scale = chartSelectors.scales.getScale(store.getState(), "x", "plot");
        expect(scale).toBeDefined();
        expect(scale.domain()).toEqual([0, 10]);
        expect(scale.range()).toEqual([40, 760]);
    });
});
