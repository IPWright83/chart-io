import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { themes } from "@chart-io/core";
import { createMockStore } from "../../testUtils.ts";
import Markers from "./Markers.svelte";

describe("Markers", () => {
    const store = createMockStore({
        chart: {
            theme: themes.light,
        },
        event: {
            markers: [{ fill: "red", stroke: "blue", r1: 5, r2: 5, cx: 50, cy: 50 }],
        },
    });

    it("should render correctly", () => {
        const layer = document.createElement("g");
        const { container } = render(Markers, {
            props: {
                layer,
                onlyNearest: true
            }
        });

        expect(container).toMatchSnapshot();
    });

    it("should skip if there is no layer available", () => {
        const layer = null;
        const { container } = render(Markers, {
            props: {
                layer,
                onlyNearest: true
            }
        });

        expect(container).toMatchSnapshot();
    });
}); 