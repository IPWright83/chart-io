/**
 * Represents the margin around a chart
 * https://observablehq.com/@d3/margin-convention
 */
export interface IMargin {
    /** Margin to the left of the chart*/
    left: number;
    /** Margin to the right of the chart*/
    right: number;
    /** Margin above the chart*/
    top: number;
    /** Margin below the chart*/
    bottom: number;
}
