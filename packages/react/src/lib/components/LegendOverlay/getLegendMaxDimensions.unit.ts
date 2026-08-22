import { getLegendMaxDimensions } from "./getLegendMaxDimensions";

describe("getLegendMaxDimensions", () => {
    it("constrains width for a top/bottom position", () => {
        expect(getLegendMaxDimensions("S", 100, 200, 300, 400)).toEqual({
            maxWidth: 60,
            maxHeight: 400,
        });

        expect(getLegendMaxDimensions("N", 100, 200, 300, 400)).toEqual({
            maxWidth: 60,
            maxHeight: 400,
        });
    });

    it("constrains height for a left/right position", () => {
        expect(getLegendMaxDimensions("W", 100, 200, 300, 400)).toEqual({
            maxWidth: 300,
            maxHeight: 160,
        });

        expect(getLegendMaxDimensions("E", 100, 200, 300, 400)).toEqual({
            maxWidth: 300,
            maxHeight: 160,
        });
    });

    it("constrains both dimensions for a corner position", () => {
        expect(getLegendMaxDimensions("SE", 100, 200, 300, 400)).toEqual({
            maxWidth: 60,
            maxHeight: 160,
        });
    });

    it("defaults to E when no position is provided", () => {
        expect(getLegendMaxDimensions(undefined, 100, 200, 300, 400)).toEqual(
            getLegendMaxDimensions("E", 100, 200, 300, 400),
        );
    });
});
