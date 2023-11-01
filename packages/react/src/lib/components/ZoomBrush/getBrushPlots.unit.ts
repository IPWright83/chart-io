import { getBrushPlots } from "./getBrushPlots";

const PlotWithBrush = { props: {}, type: { isPlot: true } };
const PlotWithoutBrush = { props: {}, type: { isPlot: false } };
const NullComponent = null;

describe("getBrushPlots", () => {
  it("should filter out non-plot components and return plot components", () => {
    const children = [PlotWithBrush, PlotWithoutBrush, NullComponent, PlotWithBrush];
    const result = getBrushPlots(children);
    expect(result).toEqual([PlotWithBrush, PlotWithBrush]);
  });

  it("should return an empty array if there are no plot components", () => {
    const children = [NullComponent, NullComponent, NullComponent];
    const result = getBrushPlots(children);
    expect(result).toEqual([]);
  });

  it("should return an empty array if children is not an array", () => {
    const children = PlotWithoutBrush;
    const result = getBrushPlots(children);
    expect(result).toEqual([]);
  });
});
