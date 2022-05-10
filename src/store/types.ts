import { IMargin, ITheme, IData, IMarker, IDropline } from "../types";

export interface IChartStore_Dimensions {
    width?: number;
    height?: number;
    margin?: IMargin;
}

export type IChartStore_Scales = Record<string, d3.AxisScale<d3.AxisDomain>>;

export interface IChartStore {
    data: IData;
    animationDuration?: number;
    scales: IChartStore_Scales;
    dimensions: IChartStore_Dimensions;
    theme: ITheme;
}

export interface IEventStore_Mouse {
    x: number;
    y: number;
    mode: "NONE" | "ENTER" | "MOVE";
}

export interface IEventStore {
    droplines: IDropline[];
    markers: IMarker[];
    mouse?: IEventStore_Mouse;
}

export interface IStore {
    chart: IChartStore;
    event: IEventStore;
}
