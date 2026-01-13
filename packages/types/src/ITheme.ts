import type { IColor } from "./IColor";

/**
 * Used to represent the general theme of charts
 */
export interface ITheme {
    /**
     * Configures all the axis on the chart
     */
    axis: {
        /**
         * Color of the Axis lines & text
         */
        stroke: IColor;
        /**
         * The Opacity of the Axis line
         */
        strokeOpacity: number;
        /**
         * The Width of the Axis line
         */
        strokeWidth: number;
    };
    /**
     * Configures Droplines, which are the lines that appear
     * when hovering over a point, like on a Scatter plot
     */
    droplines: {
        /**
         * An optional dash array pattern to configure dashed droplines
         */
        strokeDasharray: number;
        /**
         * The opacity of the droplines
         */
        strokeOpacity: number;
        /**
         * The width of teh droplines
         */
        strokeWidth: number;
    };
    /**
     * Configures Markers, which are the circles that appear
     * when hovering over a point, like on a Scatter plot
     */
    markers: {
        /**
         * The size of the marker, if not dynamically sized (such as on a Column plot)
         */
        size: number;
        /**
         * The color of the marker, if not dynamically coloured
         */
        stroke: IColor;
        /**
         * The stroke width of the marker
         */
        strokeWidth: number;
        /**
         * Should the marker display a dropshadow?
         * @type {boolean}
         */
        shadow: boolean;
    };
    /**
     * Configures the background color of the chart
     */
    background: IColor;
    /**
     * Configures the overall fonts for the chart
     */
    font: {
        /**
         * Changes the font family for all text
         */
        family: string;
        /**
         * Changes the font size for all text
         */
        size: number;
    };
    /**
     * Configures a crosshair which appear when hovering over the background
     * of some plots (such as an Area plot)
     */
    crosshair: {
        /**
         * The color of the lines of the crosshair
         */
        stroke: IColor;
        /**
         * The opacity of the lines of the crosshair
         */
        strokeOpacity: number;
        /**
         * The width of the lines of the crosshair
         */
        strokeWidth: number;
        /**
         * Controls the dash style of the lines of the crosshair
         */
        strokeDasharray: number;
    };
    /**
     * Configures the styles of Gridlines on the chart
     */
    gridlines: {
        /**
         * The color of the gridlines
         */
        stroke: IColor;
        /**
         * The opacity of the gridlines
         */
        strokeOpacity: number;
        /**
         * The width of the gridlines
         */
        strokeWidth: number;
    };
    /**
     * Configures the general series for the chart
     */
    series: {
        /**
         * An opacity to use for datapoints
         */
        opacity: number;
        /**
         * An opacity to use when a datapoint is focused (hovered over)
         */
        selectedOpacity: number;
        /**
         * The set of colors to use for multiple series when not explicitly set
         */
        colors: IColor[];
    };
    /**
     * Configures the tooltips for the chart
     */
    tooltip: {
        /**
         * The background color of the tooltip
         */
        background: IColor;
        /**
         * The text color of the tooltip
         */
        text: IColor;
        /**
         * The overall opacity of the tooltip
         */
        opacity: number;
        /**
         * The padding on the inside of the tooltip
         */
        padding: number;
    };
    /**
     * Configures the legend for a chart
     */
    legend: {
        /**
         * The background color of the legend
         */
        background: IColor;
        /**
         * The text color of the legend
         */
        text: IColor;
        /**
         * The overall opacity of the legend
         */
        opacity: number;
        /**
         * The border color of the legend
         */
        border: IColor;
        /**
         * The internal padding on the inside of the legend
         */
        padding: number;
        /**
         * The maxium width that a legend should take when the legend is positioned
         * either side of the chart. This is ignored when the legend is positioned top or bottom
         */
        defaultMaxWidth: number;
        /**
         * The maximum height that a legend should take when the legend is positioned
         * top or bottom of the chart. This is ignored when the legend is positioned left or right
         */
        defaultMaxHeight: number;
    };
}
