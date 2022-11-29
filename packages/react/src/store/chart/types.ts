import type { Margin, Theme, Data } from "../../types";

export interface SetDimensionAction {
  type: "CHART.SET_DIMENSIONS";
  payload: {
    width: number;
    height: number;
    margin: Margin;
  };
}

export interface SetScaleAction {
  type: "CHART.SET_SCALES";
  payload: {
    fields: string[];
    scale: Function;
    fromAxis: boolean;
  };
}

export interface SetThemeAction {
  type: "CHART.SET_THEME";
  payload: Theme;
}

export interface SetAnimationDurationAction {
  type: "CHART.SET_ANIMATION_DURATION";
  payload: number;
}

export interface SetDataAction {
  type: "CHART.SET_DATA";
  payload: Data;
}

export type ChartAction =
  | SetDimensionAction
  | SetScaleAction
  | SetThemeAction
  | SetAnimationDurationAction
  | SetDataAction;
