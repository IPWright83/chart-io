import type { IData, IOrientation, ILegendItem, IMargin, IScale, ITheme } from "@chart-it/types";

//export type IChartStoreScales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface IChartScaleInfo {
  // orientation: IOrientation;
  scale: IScale;
  domain: any;
  zoomedDomain: any;
  range: any;
  plot: {
    range: any;
  };
  axis: {
    domain: any;
    zoomedDomain: any;
    range: any;
  };
  brush: {
    domain: any;
    range: any;
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
  visible: boolean;
  orientation: IOrientation;
}

export interface IChartState {
  data: IData;
  animationDuration?: number;
  scales: IChartStateScales;
  // axisScales: IChartStateScales;
  dimensions: IChartStateDimensions;
  legend: IChartStateLegend;
  brush: IChartStateBrush;
  theme: ITheme;
}
