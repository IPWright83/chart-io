import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { createMockStorybookStore } from "../../testUtils/createMockStore";
import { STORE_KEY } from "../../redux/constants";
import RectangleClipPath from "./RectangleClipPath.svelte";

describe("RectangleClipPath", () => {
    // With width: 800, height: 400 and default plotMargin (left: 30, right: 30, top: 30, bottom: 30):
    // plotWidth = 800 - 30 - 30 = 740
    // plotHeight = 400 - 30 - 30 = 340
    // left = 30, top = 30
    const store = createMockStorybookStore({
        chart: {
            id: "test",
            dimensions: {
                width: 800,
                height: 400,
            },
        },
    });

    it("should render a clipPath with the correct id", () => {
        const { container } = render(RectangleClipPath, {
            context: new Map([[STORE_KEY, store]]),
        });

        const clipPath = container.querySelector("clipPath");
        expect(clipPath).toBeTruthy();
        expect(clipPath.getAttribute("id")).toBe("clip-path-test");
    });

    it("should render a rect with the correct plot dimensions", () => {
        const { container } = render(RectangleClipPath, {
            context: new Map([[STORE_KEY, store]]),
        });

        const rect = container.querySelector("clipPath rect");
        expect(rect).toBeTruthy();
        expect(rect.getAttribute("width")).toBe("740");
        expect(rect.getAttribute("height")).toBe("340");
        expect(rect.getAttribute("x")).toBe("30");
        expect(rect.getAttribute("y")).toBe("30");
    });
});
