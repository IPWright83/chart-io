import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@chart-it/types";

//export type IChartStoreScales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface IChartScaleInfo {
  scale?: IScale;
  domain: any;
  zoomedDomain?: any;
  range: any;
  brush?: {
    range?: any;
  };
}

export type IChartStateScales = Record<string, IChartScaleInfo>;

export interface IChartStateDimensions {
  width?: number;
  height?: number;
  margin?: IMargin;
}

export interface IChartStateLegend {
  items: ILegendItem[];
}

export interface IChartStateBrush {
  width: number;
  height: number;
  range?: number[];
}

export interface IChartState {
  id: string;
  data: IData;
  animationDuration?: number;
  scales: IChartStateScales;
  // axisScales: IChartStateScales;
  dimensions: IChartStateDimensions;
  legend: IChartStateLegend;
  brush: IChartStateBrush;
  theme: ITheme;
}
