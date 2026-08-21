import { getLegendPosition } from "./getLegendPosition";

describe("getLegendPosition", () => {
    it("returns correct position for W", () => {
        expect(getLegendPosition("W")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            transform: "translateY(-50%)",
            top: "50%",
            bottom: null,
        });
    });

    it("returns correct position for E", () => {
        expect(getLegendPosition("E")).toEqual({
            position: "absolute",
            left: null,
            right: 10,
            transform: "translateY(-50%)",
            top: "50%",
            bottom: null,
        });
    });

    it("returns correct position for N", () => {
        expect(getLegendPosition("N")).toEqual({
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            right: null,
            top: 10,
            bottom: null,
        });
    });

    it("returns correct position for S", () => {
        expect(getLegendPosition("S")).toEqual({
            position: "absolute",
            left: "50%",
            right: null,
            top: null,
            transform: "translateX(-50%)",
            bottom: 10,
        });
    });

    it("returns correct position for NE", () => {
        expect(getLegendPosition("NE")).toEqual({
            position: "absolute",
            left: null,
            right: 10,
            top: 10,
            bottom: null,
            transform: null,
        });
    });

    it("returns correct position for SE", () => {
        expect(getLegendPosition("SE")).toEqual({
            position: "absolute",
            left: null,
            right: 10,
            top: null,
            bottom: 10,
            transform: null,
        });
    });

    it("returns correct position for NW", () => {
        expect(getLegendPosition("NW")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            top: 10,
            bottom: null,
            transform: null,
        });
    });

    it("returns correct position for SW", () => {
        expect(getLegendPosition("SW")).toEqual({
            position: "absolute",
            left: 10,
            right: null,
            top: null,
            bottom: 10,
            transform: null,
        });
    });

    it("defaults to E when no position is provided", () => {
        expect(getLegendPosition()).toEqual(getLegendPosition("E"));
    });
});
