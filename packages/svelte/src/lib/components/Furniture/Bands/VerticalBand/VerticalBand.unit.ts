import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { Provider } from "../../../../redux/Provider.svelte";
import VerticalBand from "./VerticalBand.svelte";
import { createMockStore } from "../../../../../testUtils/createMockStore.js";

describe("VerticalBand", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            scales: {
                x: {
                    scale: d3.scaleLinear(),
                    domain: [0, 1000],
                    range: [0, 800],
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
                    component: VerticalBand,
                    props: {
                        x: "x",
                        xStart: 250,
                        xStop: 750,
                        fill: "steelblue",
                        stroke: "red",
                        opacity: 0.3,
                    },
                },
            },
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        expect(rect?.getAttribute("x")).toBe("200");
        expect(rect?.getAttribute("width")).toBe("400");
        expect(rect?.style.fill).toBe("steelblue");
        expect(rect?.style.stroke).toBe("red");
        expect(rect?.style.opacity).toBe("0.3");
    });

    it("should render correctly with no xStart", () => {
        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: VerticalBand,
                    props: {
                        x: "x",
                        xStop: 500,
                        fill: "steelblue",
                    },
                },
            },
        });

        const rect = container.querySelector("rect") as SVGRectElement;
        expect(rect).toBeTruthy();
        expect(rect?.getAttribute("x")).toBe("0");
        expect(rect?.getAttribute("width")).toBe("400");
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
                    component: VerticalBand,
                    props: {
                        x: "x",
                        xStart: 250,
                        xStop: 750,
                    },
                },
            },
        });

        expect(container.querySelector("rect")).toBeFalsy();
    });
}); 