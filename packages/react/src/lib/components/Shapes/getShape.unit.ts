import { getShape } from "./getShape";

import { Circle } from "./Circle";
import { Line } from "./Line";
import { Square } from "./Square";

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
