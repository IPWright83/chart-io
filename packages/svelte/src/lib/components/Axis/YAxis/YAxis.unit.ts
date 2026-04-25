import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { d3 } from "@chart-io/core";
import { themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../../testUtils/createMockStore";
import { STORE_KEY } from "../../../redux/constants";
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

        const { container } = render(YAxis, {
            props: { position: "left", fields: ["y"], showGridlines: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelector(".axis-left")).toBeTruthy();
    });
});
