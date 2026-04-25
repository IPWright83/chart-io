import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../testUtils/createMockStore";
import { STORE_KEY } from "../../redux/constants";
import Crosshair from "./Crosshair.svelte";

describe("Crosshair", () => {
    const baseStore = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: { width: 800, height: 400 },
        },
    });

    it("does not render when there is no mouse position", () => {
        const { container } = render(Crosshair, {
            context: new Map([[STORE_KEY, baseStore]]),
        });
        expect(container.querySelector("line")).toBeFalsy();
    });

    it("renders both lines when position is set", () => {
        const store = createMockStorybookStore({
            chart: {
                theme: themes.light,
                dimensions: { width: 800, height: 400 },
            },
            event: {
                mouse: { x: 100, y: 200, mode: "MOVE" },
            },
        });

        const { container } = render(Crosshair, {
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelectorAll("line").length).toBe(2);
    });

    it("renders only vertical line when showHorizontal is false", () => {
        const store = createMockStorybookStore({
            chart: {
                theme: themes.light,
                dimensions: { width: 800, height: 400 },
            },
            event: {
                mouse: { x: 100, y: 200, mode: "MOVE" },
            },
        });

        const { container } = render(Crosshair, {
            props: { showHorizontal: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelectorAll("line").length).toBe(1);
    });

    it("renders only horizontal line when showVertical is false", () => {
        const store = createMockStorybookStore({
            chart: {
                theme: themes.light,
                dimensions: { width: 800, height: 400 },
            },
            event: {
                mouse: { x: 100, y: 200, mode: "MOVE" },
            },
        });

        const { container } = render(Crosshair, {
            props: { showVertical: false },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container.querySelectorAll("line").length).toBe(1);
    });
});
