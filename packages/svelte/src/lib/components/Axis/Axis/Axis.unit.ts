import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import type { ComponentProps } from "svelte";
import { d3 } from "@chart-io/core";
import { themes } from "@chart-io/core";
import { createMockStore } from "../../../testUtils/createMockStore";
import { STORE_KEY } from "../../../redux/constants";
import Axis from "./Axis.svelte";
import { getTransform } from "./getTransform";

describe("Axis", () => {
    const width = 1000;
    const height = 500;
    const plotMargin = { left: 10, right: 20, top: 30, bottom: 40 };
    const scale = d3.scaleLinear().domain([0, 100]).range([0, 970]);

    const store = createMockStore({
        chart: {
            theme: themes.light,
            animationDuration: 0,
            dimensions: { width, height, plotMargin },
            scales: {
                x: { scale, domain: [0, 100], range: [0, 970] },
                y: { scale, domain: [0, 100], range: [0, 430] },
            },
        },
    });

    function renderAxis(props: ComponentProps<typeof Axis>) {
        const { container } = render(Axis, {
            props,
            context: new Map([[STORE_KEY, store]]),
        });
        return container;
    }

    it("renders a left axis", () => {
        const container = renderAxis({ position: "left", fields: "y", showGridlines: false });
        expect(container.querySelector(".axis-left")).toBeTruthy();
    });

    it("renders a right axis", () => {
        const container = renderAxis({ position: "right", fields: "y", showGridlines: false });
        expect(container.querySelector(".axis-right")).toBeTruthy();
    });

    it("renders a top axis", () => {
        const container = renderAxis({ position: "top", fields: "x", showGridlines: false });
        expect(container.querySelector(".axis-top")).toBeTruthy();
    });

    it("renders a bottom axis", () => {
        const container = renderAxis({ position: "bottom", fields: "x", showGridlines: false });
        expect(container.querySelector(".axis-bottom")).toBeTruthy();
    });

    describe("getTransform", () => {
        const plotWidth = width - plotMargin.left - plotMargin.right;
        const plotHeight = height - plotMargin.top - plotMargin.bottom;

        it("returns correct transform for left axis", () => {
            expect(getTransform("left", plotWidth, plotHeight, plotMargin)).toBe("translate(10, 0)");
        });

        it("returns correct transform for right axis", () => {
            expect(getTransform("right", plotWidth, plotHeight, plotMargin)).toBe("translate(980, 0)");
        });

        it("returns correct transform for top axis", () => {
            expect(getTransform("top", plotWidth, plotHeight, plotMargin)).toBe("translate(0, 30)");
        });

        it("returns correct transform for bottom axis", () => {
            expect(getTransform("bottom", plotWidth, plotHeight, plotMargin)).toBe("translate(0, 460)");
        });

        it("returns no translation for zero width", () => {
            expect(getTransform("top", 0, plotHeight, plotMargin)).toBe("translate(0, 0)");
        });

        it("returns no translation for zero height", () => {
            expect(getTransform("top", plotWidth, 0, plotMargin)).toBe("translate(0, 0)");
        });

        it("throws for an invalid position", () => {
            // @ts-expect-error: Testing runtime validation
            expect(() => getTransform("invalid", plotWidth, plotHeight, plotMargin)).toThrow();
        });
    });
});
