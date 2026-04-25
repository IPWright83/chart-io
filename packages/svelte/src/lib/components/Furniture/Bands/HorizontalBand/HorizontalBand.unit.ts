import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { d3 } from "@chart-io/core";
import { STORE_KEY } from "../../../../redux/constants";
import HorizontalBand from "./HorizontalBand.svelte";
import { createMockStore } from "../../../../testUtils/createMockStore";

describe("HorizontalBand", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            scales: {
                y: {
                    scale: d3.scaleLinear(),
                    domain: [0, 1000],
                    range: [200, 0],
                },
            },
        },
    });

    it("should render correctly with all props", () => {
        const { container } = render(HorizontalBand, {
            props: {
                y: "y",
                yStart: 250,
                yStop: 750,
                fill: "steelblue",
                stroke: "red",
                opacity: 0.3,
            },
            context: new Map([[STORE_KEY, store]]),
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        // scale(750)=50 is the top of the band in screen space (stopY), scale(250)=150 is the bottom (startY)
        expect(rect?.getAttribute("y")).toBe("50");
        expect(rect?.getAttribute("height")).toBe("100");
        expect(rect?.style.fill).toBe("steelblue");
        expect(rect?.style.stroke).toBe("red");
        expect(rect?.style.opacity).toBe("0.3");
    });

    it("should render correctly with no yStart", () => {
        const { container } = render(HorizontalBand, {
            props: {
                y: "y",
                yStop: 500,
                fill: "steelblue",
            },
            context: new Map([[STORE_KEY, store]]),
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        // stopY=scale(500)=100, startY=range[0]=200, so y=100 height=100
        expect(rect?.getAttribute("y")).toBe("100");
        expect(rect?.getAttribute("height")).toBe("100");
    });

    it("should not render without scale", () => {
        const emptyStore = createMockStore({
            chart: {
                dimensions: { width: 800, height: 400 },
                scales: {},
            },
        });

        const { container } = render(HorizontalBand, {
            props: { y: "y", yStart: 250, yStop: 750 },
            context: new Map([[STORE_KEY, emptyStore]]),
        });

        expect(container.querySelector("rect")).toBeFalsy();
    });
});
