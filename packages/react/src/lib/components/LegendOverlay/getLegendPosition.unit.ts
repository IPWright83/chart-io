import { getLegendPosition } from "./getLegendPosition";

describe("getLegendPosition", () => {
    it("returns correct position for left alignment", () => {
        expect(getLegendPosition("LEFT")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            top: 10,
            bottom: null,
        });
    });

    it("returns correct position for right alignment", () => {
        expect(getLegendPosition("RIGHT")).toEqual({
            position: "absolute",
            left: null,
            right: 10,
            top: 10,
            bottom: null,
        });
    });

    it("returns correct position for top alignment", () => {
        expect(getLegendPosition(undefined, "TOP")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            top: 10,
            bottom: null,
        });
    });

    it("returns correct position for bottom alignment", () => {
        expect(getLegendPosition(undefined, "BOTTOM")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            top: null,
            bottom: 10,
        });
    });
});
