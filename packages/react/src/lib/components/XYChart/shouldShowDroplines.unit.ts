import React from "react";

import { shouldShowDroplines } from "./shouldShowDroplines";

describe("shouldShowDroplines", () => {
    const mockElement = React.createElement("div");

    it("should return true for a single child", () => {
        expect(shouldShowDroplines(mockElement)).toBe(true);
    });

    it("should return true for children excluding lines/areas", () => {
        expect(shouldShowDroplines([mockElement, undefined, mockElement, mockElement])).toBe(true);
    });

    it("should return true if a single Line plot is included", () => {
        const mockLinePlot = React.createElement("Line");

        expect(shouldShowDroplines([mockElement, mockLinePlot])).toBe(true);
    });

    it("should return false if a multiple Line plots are included", () => {
        const mockLinePlot = React.createElement("Line");

        expect(shouldShowDroplines([mockElement, mockLinePlot, mockLinePlot])).toBe(false);
    });

    it("should return false if a Lines plot is included", () => {
        const mockLinesPlot = React.createElement("Lines");

        expect(shouldShowDroplines([mockElement, mockLinesPlot])).toBe(false);
    });

    it("should return true if single Area plot is included", () => {
        const mockAreaPlot = React.createElement("Area");

        expect(shouldShowDroplines([mockElement, mockAreaPlot])).toBe(true);
    });

    it("should return false if multiple Area plots are included", () => {
        const mockAreaPlot = React.createElement("Area");

        expect(shouldShowDroplines([mockElement, mockAreaPlot, mockAreaPlot])).toBe(false);
    });

    it("should return false if an Areas plot is included", () => {
        const mockAreasPlot = React.createElement("Areas");

        expect(shouldShowDroplines([mockElement, mockAreasPlot])).toBe(false);
    });
});
