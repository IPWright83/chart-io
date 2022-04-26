import { IMargin, ITheme, IData } from "../../types";

export interface ISetDimensionAction {
  type: "CHART.SET_DIMENSIONS";
  payload: {
    width: number;
    height: number;
    margin: IMargin;
  };
}

export interface ISetScaleAction {
  type: "CHART.SET_SCALES";
  payload: {
    fields: string[];
    scale: Function;
  };
}

export interface ISetThemeAction {
  type: "CHART.SET_THEME";
  payload: ITheme;
}

export interface ISetAnimationDurationAction {
  type: "CHART.SET_ANIMATION_DURATION";
  payload: number;
}

export interface ISetDataAction {
  type: "CHART.SET_DATA";
  payload: IData;
}

export type IChartAction =
  | ISetDimensionAction
  | ISetScaleAction
  | ISetThemeAction
  | ISetAnimationDurationAction
  | ISetDataAction;
