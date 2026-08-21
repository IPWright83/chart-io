import type { ILabeller } from "../../utils";
import type { IData, ILegendItem, IMargin, IPivot, IScale, ITheme } from "../../types";

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
  plotMargin?: IMargin;
}

export interface IChartStateLegend {
  items: ILegendItem[];
}

export interface IChartStateBrush {
  width: number;
  height: number;
  margin?: IMargin;
  range?: number[];
}

export interface IChartStateZoom {
  // The ancestry path (root excluded) of the currently focused node, e.g. ["North America",
  // "United States"] - an empty array means fully zoomed out
  path: string[];
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
  labeller: ILabeller;
  zoomable: boolean;
  zoom: IChartStateZoom;
  // Whether a <Heatmap> should offer switching between its grid/rows/columns layouts
  pivotable: boolean;
  // The layout a <Heatmap> is currently rendered in - see IPivot
  pivot: IPivot;
}
