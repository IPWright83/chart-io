import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { d3 } from "@chart-io/core";
import { STORE_KEY } from "../../../../redux/constants";
import HorizontalLine from "./HorizontalLine.svelte";
import { createMockStore } from "../../../../testUtils/createMockStore";

describe("HorizontalLine", () => {
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

    it("should render correctly", () => {
        const { container } = render(HorizontalLine, {
            props: {
                y: "y",
                value: 500,
                stroke: "red",
                opacity: 0.5,
            },
            context: new Map([[STORE_KEY, store]]),
        });

        const line = container.querySelector("line") as SVGLineElement;
        expect(line).toBeTruthy();
        // scale(500) with domain=[0,1000] range=[200,0] = 100
        expect(line?.getAttribute("y1")).toBe("100");
        expect(line?.getAttribute("y2")).toBe("100");
        expect(line?.style.stroke).toBe("red");
        expect(line?.style.opacity).toBe("0.5");
    });

    it("should not render without scale", () => {
        const emptyStore = createMockStore({
            chart: {
                dimensions: { width: 800, height: 400 },
                scales: {},
            },
        });

        const { container } = render(HorizontalLine, {
            props: { y: "y", value: 500 },
            context: new Map([[STORE_KEY, emptyStore]]),
        });

        expect(container.querySelector("line")).toBeFalsy();
    });
});
