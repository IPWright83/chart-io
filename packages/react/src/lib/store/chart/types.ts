import type { IData, IMargin, IScale, ITheme } from "@d3-chart/types";

export interface SetDimensionAction {
  type: "CHART.SET_DIMENSIONS";
  payload: {
    width: number;
    height: number;
    margin: IMargin;
  };
}

export interface SetScaleAction {
  type: "CHART.SET_SCALES";
  payload: {
    fields: string[];
    scale: IScale;
    fromAxis: boolean;
  };
}

export interface SetThemeAction {
  type: "CHART.SET_THEME";
  payload: ITheme;
}

export interface SetAnimationDurationAction {
  type: "CHART.SET_ANIMATION_DURATION";
  payload: number;
}

export interface SetDataAction {
  type: "CHART.SET_DATA";
  payload: IData;
}

export type ChartAction =
  | SetDimensionAction
  | SetScaleAction
  | SetThemeAction
  | SetAnimationDurationAction
  | SetDataAction;
