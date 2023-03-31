import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@d3-chart/types";

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

export interface AddLegendItemAction {
  type: "CHART.ADD_LEGEND_ITEM";
  payload: ILegendItem;
}

export interface RemoveLegendItemAction {
  type: "CHART.REMOVE_LEGEND_ITEM";
  payload: ILegendItem;
}

export type ChartAction =
  | SetDimensionAction
  | SetScaleAction
  | SetThemeAction
  | SetAnimationDurationAction
  | SetDataAction
  | AddLegendItemAction
  | RemoveLegendItemAction;
