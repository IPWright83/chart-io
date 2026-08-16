import { interpolatePoints } from "./interpolatePoints";

describe("interpolatePoints", () => {
    it("should interpolate each point independently", () => {
        const previous = "0,0 10,10";
        const target = "10,10 20,20";

        expect(interpolatePoints(previous, target, 0)).toBe("0,0 10,10");
        expect(interpolatePoints(previous, target, 1)).toBe("10,10 20,20");
        expect(interpolatePoints(previous, target, 0.5)).toBe("5,5 15,15");
    });

    it("should hold extra target points at their target position", () => {
        const previous = "0,0";
        const target = "0,0 10,10";

        expect(interpolatePoints(previous, target, 0.5)).toBe("0,0 10,10");
    });
});
