import { describe, it, expect } from "vitest";

import { getShape } from "./getShape.ts";
import Circle from "./Circle/Circle.svelte";
import Line from "./Line/Line.svelte";
import Square from "./Square/Square.svelte";

describe("getShape", () => {
    it("returns correct shape", () => {
        expect(getShape("circle")).toBe(Circle);
        expect(getShape("square")).toBe(Square);
        expect(getShape("line")).toBe(Line);
        expect(getShape("none")).toBe(null);

        // @ts-expect-error: Runtime validation
        expect(getShape("foo")).toBe(null);
        expect(getShape()).toBe(null);
    });
}); 