import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { themes } from "@chart-io/core";
import { createMockStorybookStore } from "../../../testUtils/createMockStore.ts";
import Droplines from "./Droplines.svelte";
import Provider from "../../../redux/StoreProvider.svelte";
import type { IStore } from "@chart-io/core";

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
        const { container } = render(Provider, {
            props: {
                overrideStore: store as IStore,
            },
        });

        const droplinesComponent = new Droplines({
            target: container,
            props: {
                showHorizontal: true,
                showVertical: true,
            },
        });

        const droplines = container.querySelectorAll(".dropline");
        expect(droplines.length).toBe(2);

        droplinesComponent.$destroy();
    });

    it("should render just vertical lines correctly", () => {
        const { container } = render(Provider, {
            props: {
                overrideStore: store as IStore,
            },
        });

        const droplinesComponent = new Droplines({
            target: container,
            props: {
                showHorizontal: false,
                showVertical: true,
            },
        });

        const droplines = container.querySelectorAll(".dropline");
        expect(droplines.length).toBe(1);
        expect(droplines[0].getAttribute("x1")).toBe("50");
        expect(droplines[0].getAttribute("x2")).toBe("50");

        droplinesComponent.$destroy();
    });

    it("should render just horizontal lines correctly", () => {
        const { container } = render(Provider, {
            props: {
                overrideStore: store as IStore,
            },
        });

        const droplinesComponent = new Droplines({
            target: container,
            props: {
                showHorizontal: true,
                showVertical: false,
            },
        });

        const droplines = container.querySelectorAll(".dropline");
        expect(droplines.length).toBe(1);
        expect(droplines[0].getAttribute("y1")).toBe("50");
        expect(droplines[0].getAttribute("y2")).toBe("50");

        droplinesComponent.$destroy();
    });
}); 