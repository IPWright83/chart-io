import type { IMargin, IScale, IData, ITheme } from "@d3-chart/types";

export type IChartStateScales = Record<string, IScale>;
//export type IChartStoreScales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface IChartStateDimensions {
  width?: number;
  height?: number;
  margin?: IMargin;
}

export interface IChartState {
  data: IData;
  animationDuration?: number;
  scales: IChartStateScales;
  axisScales: IChartStateScales;
  dimensions: IChartStateDimensions;
  theme: ITheme;
}
