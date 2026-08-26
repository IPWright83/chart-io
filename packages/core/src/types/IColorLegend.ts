import type { IColor } from "./IColor";

/**
 * Describes the gradient legend a plot with a continuous color scale (e.g. `<Heatmap>`) registers
 * with the chart's `<Legend>`, rendered as a horizontal gradient bar at its bottom - the color
 * equivalent of the nested-circle `ISizeLegend` a `<ZAxis>` registers
 */
export interface IColorLegend {
    /**
     * The color palette the gradient interpolates between, lowest value first - equally spaced
     * stops across `domain`
     */
    colors: IColor[];
    /**
     * The [min, max] value domain the gradient spans
     */
    domain: [number, number];
    /**
     * Formats each end of the gradient's value label
     */
    format?: (value: number) => string;
}
