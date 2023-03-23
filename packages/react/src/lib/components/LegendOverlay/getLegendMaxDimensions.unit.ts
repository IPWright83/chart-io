import { getLegendMaxDimensions } from "./getLegendMaxDimensions";

describe("getLegendMaxDimensions", () => {
    it("returns defaults if no positions provided", () => {
        expect(getLegendMaxDimensions(undefined, undefined, 100, 100, 300, 400)).toEqual({
            maxWidth: 300,
            maxHeight: 400,
        });
    });

    it("returns calculate width if given a vertical position", () => {
        expect(getLegendMaxDimensions(undefined, "BOTTOM", 100, 200, 300, 400)).toEqual({
            maxWidth: 60,
            maxHeight: 400,
        });

        expect(getLegendMaxDimensions(undefined, "TOP", 100, 200, 300, 400)).toEqual({
            maxWidth: 60,
            maxHeight: 400,
        });
    });

    it("returns calculate width if given a horizontal position", () => {
        expect(getLegendMaxDimensions("LEFT", undefined, 100, 200, 300, 400)).toEqual({
            maxWidth: 300,
            maxHeight: 160,
        });

        expect(getLegendMaxDimensions("RIGHT", undefined, 100, 200, 300, 400)).toEqual({
            maxWidth: 300,
            maxHeight: 160,
        });
    });
});
