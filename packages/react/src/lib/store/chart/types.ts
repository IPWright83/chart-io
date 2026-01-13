import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@chart-it/types";

export interface SetDimensionAction {
  type: "CHART.SET_DIMENSIONS";
  payload: {
    width: number;
    height: number;
    margin: IMargin;
  };
}

export interface SetBrushDimensionsAction {
  type: "CHART.SET_BRUSH_DIMENSIONS";
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
  };
}

export interface SetBrushRangeAction {
  type: "CHART.SET_BRUSH_RANGE";
  payload: {
    field: string;
    range: number[];
  };
}

export interface SetScaleZoomAction {
  type: "CHART.SET_SCALE_ZOOM";
  payload: {
    field: string;
    domain: number[] | Date[];
  };
}

export interface SetThemeAction {
  type: "CHART.SET_THEME";
  payload: ITheme;
}

export interface SetChartIDAction {
  type: "CHART.SET_CHART_ID";
  payload: string;
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
  | SetBrushDimensionsAction
  | SetScaleAction
  | SetThemeAction
  | SetAnimationDurationAction
  | SetDataAction
  | AddLegendItemAction
  | RemoveLegendItemAction
  | SetBrushRangeAction
  | SetScaleZoomAction
  | SetChartIDAction;
