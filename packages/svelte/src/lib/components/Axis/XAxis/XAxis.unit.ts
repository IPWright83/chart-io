import { d3, themes } from "@chart-io/core";
import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { STORE_KEY } from "../../../redux/constants";
import { createMockStore } from "../../../testUtils/createMockStore";
import XAxis from "./XAxis.svelte";

describe("XAxis", () => {
    it("renders correctly", () => {
        const scale = d3.scaleLinear().domain([0, 10]).range([40, 760]);
        const store = createMockStore({
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

        const { container } = render(XAxis, {
            props: { position: "bottom", fields: ["x"], showGridlines: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelector(".axis-bottom")).toBeTruthy();
    });

    it("creates a scale in the store correctly", () => {
        const store = createStore();
        store.dispatch(chartActions.setDimensions({ width: 800, height: 100, margin: { left: 40, right: 40, top: 10, bottom: 50 } }));
        store.dispatch(chartActions.setChartData([{ x: 0 }, { x: 5 }, { x: 10 }]));

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
