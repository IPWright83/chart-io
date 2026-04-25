import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { themes } from "@chart-io/core";
import { createMockStore } from "../../testUtils/createMockStore";
import { STORE_KEY } from "../../redux/constants";
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
        const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const { container } = render(Markers, {
            props: { layer, onlyNearest: true },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container).toMatchSnapshot();
    });

    it("should skip if there is no layer available", () => {
        const { container } = render(Markers, {
            props: { layer: null, onlyNearest: true },
            context: new Map([[STORE_KEY, store]]),
        });

        expect(container).toMatchSnapshot();
    });
});
