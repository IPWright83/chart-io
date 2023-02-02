import type { IColor } from "./IColor";

/**
 * Used to represent the general theme of charts
 */
export interface ITheme {
    axis: {
        stroke: IColor;
        strokeOpacity: number;
        strokeWidth: number;
    };
    droplines: {
        strokeDasharray: number;
        strokeOpacity: number;
        strokeWidth: number;
    };
    markers: {
        size: number;
        stroke: IColor;
        strokeWidth: number;
        shadow: boolean;
    };
    background: IColor;
    crosshair: {
        stroke: IColor;
        strokeOpacity: number;
        strokeWidth: number;
        strokeDasharray: number;
    };
    gridlines: {
        stroke: IColor;
        strokeOpacity: number;
        strokeWidth: number;
    };
    series: {
        opacity: number;
        selectedOpacity: number;
        colors: IColor[];
    };
}
