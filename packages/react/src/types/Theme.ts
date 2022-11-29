import { Color } from "./Color";

/**
 * Used to represent the general theme of charts
 */
export interface Theme {
    axis: {
        stroke: Color;
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
        stroke: Color;
        strokeWidth: number;
    };
    background: Color;
    crosshair: {
        stroke: Color;
        strokeOpacity: number;
        strokeWidth: number;
        strokeDasharray: number;
    };
    gridlines: {
        stroke: Color;
        strokeOpacity: number;
        strokeWidth: number;
    };
    series: {
        opacity: number;
        selectedOpacity: number;
        colors: [Color, Color, Color, Color, Color, Color, Color, Color, Color, Color, Color, Color];
    };
}
