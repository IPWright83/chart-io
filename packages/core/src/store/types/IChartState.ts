import type { ILabeller } from "../../utils";
import type { ICompassPosition, IData, ILegendItem, IMargin, IScale, ISizeLegend, ITheme } from "../../types";

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
  // The compass position the legend is currently docked at - either its default, or wherever it
  // was last dragged to
  position?: ICompassPosition;
  // The size legend a <ZAxis> has registered, if any, explaining a Scatter/Scatters z encoding
  sizeLegend?: ISizeLegend | null;
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

// A generic per-field filter, e.g. a <ParallelCoordinates> axis' brushed pixel extent. Deliberately
// untyped beyond the field key - the value's shape is up to whichever plot sets it, since different
// filterable plots need different value shapes (a range, a set of allowed values, ...)
export type IChartStateFilters = Record<string, unknown>;

export interface IChartState {
  id: string;
  data: IData;
  animationDuration?: number;
  scales: IChartStateScales;
  // axisScales: IChartStateScales;
  dimensions: IChartStateDimensions;
  legend: IChartStateLegend;
  brush: IChartStateBrush;
  filters: IChartStateFilters;
  theme: ITheme;
  labeller: ILabeller;
  zoomable: boolean;
  zoom: IChartStateZoom;
}
