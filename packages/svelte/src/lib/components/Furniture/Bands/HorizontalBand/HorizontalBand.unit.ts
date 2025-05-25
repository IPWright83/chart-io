import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { Provider } from "../../../../redux/Provider.svelte";
import HorizontalBand from "./HorizontalBand.svelte";
import { createMockStore } from "../../../../../testUtils/createMockStore.js";

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
        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: HorizontalBand,
                    props: {
                        y: "y",
                        yStart: 250,
                        yStop: 750,
                        fill: "steelblue",
                        stroke: "red",
                        opacity: 0.3,
                    },
                },
            },
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        expect(rect?.getAttribute("y")).toBe("150");
        expect(rect?.getAttribute("height")).toBe("100");
        expect(rect?.style.fill).toBe("steelblue");
        expect(rect?.style.stroke).toBe("red");
        expect(rect?.style.opacity).toBe("0.3");
    });

    it("should render correctly with no yStart", () => {
        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: HorizontalBand,
                    props: {
                        y: "y",
                        yStop: 500,
                        fill: "steelblue",
                    },
                },
            },
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        expect(rect?.getAttribute("y")).toBe("100");
        expect(rect?.getAttribute("height")).toBe("100");
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
                    component: HorizontalBand,
                    props: {
                        y: "y",
                        yStart: 250,
                        yStop: 750,
                    },
                },
            },
        });

        expect(container.querySelector("rect")).toBeFalsy();
    });
}); 