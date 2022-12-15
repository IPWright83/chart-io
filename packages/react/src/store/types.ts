import * as d3 from "d3";

import type {
  IMargin,
  ITheme,
  IData,
  IMarker,
  IDropline,
  ITooltipItem,
  IColor,
  ICoordinate,
  IMouseMode,
} from "../types";

export interface IChartStoreDimensions {
  width?: number;
  height?: number;
  margin?: IMargin;
}

export type IChartStoreScales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface IChartStore {
  data: IData;
  animationDuration?: number;
  scales: IChartStoreScales;
  axisScales: IChartStoreScales;
  dimensions: IChartStoreDimensions;
  theme: ITheme;
}

export interface IEventStoreMouse {
  x: number;
  y: number;
  mode: IMouseMode;
}

export interface IEventStoreTooltip {
  position?: ICoordinate;
  color?: IColor;
  items: ITooltipItem[];
}

export interface IEventStore {
  droplines: IDropline[];
  markers: IMarker[];
  mouse?: IEventStoreMouse;
  tooltip: IEventStoreTooltip;
}

export interface IStore {
  chart: IChartStore;
  event: IEventStore;
}

export type IDispatch = (action: any) => void;