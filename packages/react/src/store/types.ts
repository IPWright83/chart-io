import * as d3 from "d3";

import type { Margin, Theme, Data, Marker, Dropline, TooltipItem, Color, Coordinate, MouseMode } from "../types";

export interface ChartStoreDimensions {
  width?: number;
  height?: number;
  margin?: Margin;
}

export type ChartStoreScales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface ChartStore {
  data: Data;
  animationDuration?: number;
  scales: ChartStoreScales;
  axisScales: ChartStoreScales;
  dimensions: ChartStoreDimensions;
  theme: Theme;
}

export interface EventStoreMouse {
  x: number;
  y: number;
  mode: MouseMode;
}

export interface EventStoreTooltip {
  position?: Coordinate;
  color?: Color;
  items: TooltipItem[];
}

export interface EventStore {
  droplines: Dropline[];
  markers: Marker[];
  mouse?: EventStoreMouse;
  tooltip: EventStoreTooltip;
}

export interface Store {
  chart: ChartStore;
  event: EventStore;
}
