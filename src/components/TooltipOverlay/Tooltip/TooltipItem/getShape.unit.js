import { getShape } from "./getShape";

import { Circle } from "./Circle";
import { Square } from "./Square";
import { Line } from "./Line";

describe("getShape", () => {
    it("returns correct shape", () => {
        expect(getShape("scatter")).toBe(Circle);
        expect(getShape("bar")).toBe(Square);
        expect(getShape("column")).toBe(Square);
        expect(getShape("area")).toBe(Square);
        expect(getShape("line")).toBe(Line);
        expect(getShape("foo")).toBe(null);
    });
});
