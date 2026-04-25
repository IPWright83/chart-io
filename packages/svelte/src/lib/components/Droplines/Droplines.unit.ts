import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../testUtils/createMockStore";
import { STORE_KEY } from "../../redux/constants";
import Droplines from "./Droplines.svelte";

describe("Droplines", () => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
        },
        event: {
            droplines: [
                { isHorizontal: true, color: "red", x1: 50, x2: 0, y1: 50, y2: 50 },
                { isVertical: true, color: "red", x1: 50, x2: 50, y1: 50, y2: 0 },
            ],
        },
    });

    it("should render correctly", () => {
        const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        render(Droplines, {
            props: { showHorizontal: true, showVertical: true, layer },
            context: new Map([[STORE_KEY, store]]),
        });

        const droplines = layer.querySelectorAll(".dropline");
        expect(droplines.length).toBe(2);
    });

    it("should render just vertical lines correctly", () => {
        const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        render(Droplines, {
            props: { showHorizontal: false, showVertical: true, layer },
            context: new Map([[STORE_KEY, store]]),
        });

        const droplines = layer.querySelectorAll(".dropline");
        expect(droplines.length).toBe(1);
        expect(droplines[0].getAttribute("x1")).toBe("50");
        expect(droplines[0].getAttribute("x2")).toBe("50");
    });

    it("should render just horizontal lines correctly", () => {
        const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        render(Droplines, {
            props: { showHorizontal: true, showVertical: false, layer },
            context: new Map([[STORE_KEY, store]]),
        });

        const droplines = layer.querySelectorAll(".dropline");
        expect(droplines.length).toBe(1);
        expect(droplines[0].getAttribute("y1")).toBe("50");
        expect(droplines[0].getAttribute("y2")).toBe("50");
    });
});
