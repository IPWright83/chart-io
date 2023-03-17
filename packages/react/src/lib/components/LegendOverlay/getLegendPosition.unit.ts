import { getLegendPosition } from "./getLegendPosition";

describe("getLegendPosition", () => {
    it("returns correct position for left alignment", () => {
        expect(getLegendPosition("LEFT", "CENTER", 200, 100)).toEqual({
            position: "absolute",
            left: "10px",
            right: null,
            top: null,
            bottom: null,
        });
    });

    it("returns correct position for right alignment", () => {
        expect(getLegendPosition("RIGHT", "CENTER", 200, 100)).toEqual({
            position: "absolute",
            left: null,
            right: "10px",
            top: null,
            bottom: null,
        });
    });

    it("returns correct position for top alignment", () => {
        expect(getLegendPosition("CENTER", "TOP", 200, 100)).toEqual({
            position: "absolute",
            left: null,
            right: null,
            top: "10px",
            bottom: null,
        });
    });

    it("returns correct position for bottom alignment", () => {
        expect(getLegendPosition("CENTER", "BOTTOM", 200, 100)).toEqual({
            position: "absolute",
            left: null,
            right: null,
            top: null,
            bottom: "10px",
        });
    });
});
