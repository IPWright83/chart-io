import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { Provider } from "../../../../redux/Provider.svelte";
import HorizontalLine from "./HorizontalLine.svelte";
import { createMockStore } from "../../../../../testUtils/createMockStore.js";

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
        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: HorizontalLine,
                    props: {
                        y: "y",
                        value: 500,
                        stroke: "red",
                        opacity: 0.5,
                    },
                },
            },
        });

        const line = container.querySelector("line") as SVGLineElement;
        expect(line).toBeTruthy();
        expect(line?.getAttribute("y1")).toBe("100");
        expect(line?.getAttribute("y2")).toBe("100");
        expect(line?.style.stroke).toBe("red");
        expect(line?.style.opacity).toBe("0.5");
    });

    it("should not render without scale", () => {
        const store = createMockStore({
            chart: {
                dimensions: {
                    width: 800,
                    height: 400,
                },
                scales: {},
            },
        });

        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: HorizontalLine,
                    props: {
                        y: "y",
                        value: 500,
                    },
                },
            },
        });

        expect(container.querySelector("line")).toBeFalsy();
    });
}); 