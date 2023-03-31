import { getLegendPosition } from "./getLegendPosition";

describe("getLegendPosition", () => {
    it("returns correct position for left alignment", () => {
        expect(getLegendPosition("LEFT", "CENTER")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            transform: "translateY(-50%)",
            top: "50%",
            bottom: null,
        });
    });

    it("returns correct position for right alignment", () => {
        expect(getLegendPosition("RIGHT", "CENTER")).toEqual({
            position: "absolute",
            left: null,
            right: 10,
            transform: "translateY(-50%)",
            top: "50%",
            bottom: null,
        });
    });

    it("returns correct position for top alignment", () => {
        expect(getLegendPosition("CENTER", "TOP")).toEqual({
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            right: null,
            top: 10,
            bottom: null,
        });
    });

    it("returns correct position for bottom alignment", () => {
        expect(getLegendPosition("CENTER", "BOTTOM")).toEqual({
            position: "absolute",
            left: "50%",
            right: null,
            top: null,
            transform: "translateX(-50%)",
            bottom: 10,
        });
    });
});
