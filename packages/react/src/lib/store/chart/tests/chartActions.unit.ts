import * as d3 from "@chart-it/d3";

import { chartActions } from "../chartActions";
import { themes } from "../../../themes";

describe("chartActions", () => {
  it("setDimensions returns correct action", () => {
    const width = 1000;
    const height = 500;
    const margin = { top: 10, left: 10, right: 10, bottom: 10 };

    expect(chartActions.setDimensions(width, height, margin)).toEqual({
      type: "CHART.SET_DIMENSIONS",
      payload: { width, height, margin },
    });
  });

  it("setDimensions warns with no margin", () => {
    const width = 1000;
    const height = 500;

    const spy = jest.spyOn(console, "warn").mockImplementation();

    // @ts-expect-error: Checking runtime validation
    expect(chartActions.setDimensions(width, height)).toBeUndefined();

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
      `"@chart-it/react encountered an warning. W004: A margin was not provided but is required. You can read more about this http://localhost:6006/?path=/docs/errors-warnings-warnings-W004."`
    );
  });

  it("setDimensions warns with invalid margin", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 10, right: 10, bottom: 10 };

    const spy = jest.spyOn(console, "warn").mockImplementation();

    // @ts-expect-error: Checking runtime validation
    expect(chartActions.setDimensions(width, height, margin)).toBeUndefined();

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
      `"@chart-it/react encountered an warning. W005: The top of the margin was not specified and is required. You can read more about this http://localhost:6006/?path=/docs/errors-warnings-warnings-W005."`
    );
  });

  describe("setScales", () => {
    it("triggers dispatch correctly", () => {
      const fields = ["a", "b", "c"];
      const scale = d3.scaleLinear();
      const dispatch = jest.fn();

      chartActions.setScales(fields, scale, false)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: "CHART.SET_SCALES",
        payload: { fields, scale, fromAxis: false },
      });
    });

    it("does not do anything if passed no scale", () => {
      const fields = ["a", "b", "c"];
      const dispatch = jest.fn();

      // @ts-expect-error: Checking runtime validation
      chartActions.setScales(fields, null)(dispatch);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe("setData", () => {
    it("returns the correct action", () => {
      const data = [{ a: "foo" }];
      expect(chartActions.setData(data)).toEqual({
        type: "CHART.SET_DATA",
        payload: data,
      });
    });

    it("defaults to an empty dataset", () => {
      expect(chartActions.setData(undefined)).toEqual({
        type: "CHART.SET_DATA",
        payload: [],
      });
    });
  });

  it("setAnimationDuration returns the correct action", () => {
    expect(chartActions.setAnimationDuration(500)).toEqual({
      type: "CHART.SET_ANIMATION_DURATION",
      payload: 500,
    });
  });

  describe("setTheme", () => {
    it("for light theme returns correct action", () => {
      const dispatch = jest.fn();

      chartActions.setTheme("light")(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: "CHART.SET_THEME",
        payload: themes.light,
      });
    });

    it("for dark theme returns correct action", () => {
      const dispatch = jest.fn();

      chartActions.setTheme("dark")(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: "CHART.SET_THEME",
        payload: themes.dark,
      });
    });

    it("for custom theme returns correct action", () => {
      const dispatch = jest.fn();

      // @ts-expect-error: Checking runtime validation
      chartActions.setTheme({ foo: "bar" })(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: "CHART.SET_THEME",
        payload: { foo: "bar" },
      });
    });
  });

  it("addLegendItem returns the correct action", () => {
    const legendItem = {
      name: "test legend item",
      icon: "circle" as const,
      color: "#FFF" as const,
    };

    expect(chartActions.addLegendItem(legendItem)).toEqual({
      type: "CHART.ADD_LEGEND_ITEM",
      payload: legendItem,
    });
  });

  it("removeLegendItem returns the correct action", () => {
    const legendItem = {
      name: "test legend item",
      icon: "circle" as const,
      color: "#FFF" as const,
    };

    expect(chartActions.removeLegendItem(legendItem)).toEqual({
      type: "CHART.REMOVE_LEGEND_ITEM",
      payload: legendItem,
    });
  });
});
