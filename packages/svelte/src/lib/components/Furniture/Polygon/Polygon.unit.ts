import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { Polygon } from "./index.js";

describe("Polygon", () => {
    it("should render correctly with all props", () => {
        const { container } = render(Polygon, {
            props: {
                points: "0,100 50,25 50,75 100,0",
                fill: "steelblue",
                stroke: "red",
                opacity: 0.5,
            },
        });

        const polygon = container.querySelector(".polygon") as HTMLElement;
        expect(polygon).toBeTruthy();
        expect(polygon?.getAttribute("points")).toBe("0,100 50,25 50,75 100,0");
        expect(polygon?.style.fill).toBe("steelblue");
        expect(polygon?.style.stroke).toBe("red");
        expect(polygon?.style.opacity).toBe("0.5");
    });

    it("should not render without points", () => {
        const { container } = render(Polygon, {
            props: {
                points: "",
                fill: "steelblue",
            },
        });

        expect(container.querySelector(".polygon")).toBeFalsy();
    });
}); 