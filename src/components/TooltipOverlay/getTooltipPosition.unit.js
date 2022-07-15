import { getTooltipPosition } from "./getTooltipPosition";

describe("getTooltipPosition", () => {
    it("returns empty with no mouse event", () => {
        expect(getTooltipPosition(null)).toEqual({ x: 0, y: 0 });
    });

    it("returns top left tooltip position correctly", () => {
        expect(getTooltipPosition({ x: 15, y: 25 }, 200, 100, 3)).toEqual({
            position: "absolute",
            left: "18px",
            right: null,
            top: "28px",
            bottom: null,
        });
    });

    it("returns top right tooltip position correctly", () => {
        expect(getTooltipPosition({ x: 155, y: 25 }, 200, 100, 3)).toEqual({
            position: "absolute",
            left: null,
            right: "48px",
            top: "28px",
            bottom: null,
        });
    });

    it("returns bottom left tooltip position correctly", () => {
        expect(getTooltipPosition({ x: 15, y: 85 }, 200, 100, 3)).toEqual({
            position: "absolute",
            left: "18px",
            right: null,
            top: null,
            bottom: "18px",
        });
    });

    it("returns bottom right tooltip position correctly", () => {
        expect(getTooltipPosition({ x: 155, y: 85 }, 200, 100, 3)).toEqual({
            position: "absolute",
            left: null,
            right: "48px",
            top: null,
            bottom: "18px",
        });
    });
});
