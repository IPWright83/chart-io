import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { d3 } from "@chart-io/core";
import { themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../../testUtils/createMockStore";
import { STORE_KEY } from "../../../redux/constants";
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

        const { container } = render(XAxis, {
            props: { position: "bottom", fields: ["x"], showGridlines: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelector(".axis-bottom")).toBeTruthy();
    });
});
