import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import * as d3 from "@chart-io/d3";
import { Provider } from "../../../../redux/Provider.svelte";
import VerticalLine from "./VerticalLine.svelte";
import { createMockStore } from "../../../../../testUtils/createMockStore.js";

describe("VerticalLine", () => {
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

    it("should render correctly", () => {
        const { container } = render(Provider, {
            props: {
                store,
            },
            slots: {
                default: {
                    component: VerticalLine,
                    props: {
                        x: "x",
                        value: 500,
                        stroke: "red",
                        opacity: 0.5,
                    },
                },
            },
        });

        const line = container.querySelector("line") as SVGLineElement;
        expect(line).toBeTruthy();
        expect(line?.getAttribute("x1")).toBe("400");
        expect(line?.getAttribute("x2")).toBe("400");
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
                    component: VerticalLine,
                    props: {
                        x: "x",
                        value: 500,
                    },
                },
            },
        });

        expect(container.querySelector("line")).toBeFalsy();
    });
}); 