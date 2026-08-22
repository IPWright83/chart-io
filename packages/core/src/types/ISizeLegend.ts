import type { IValue } from "./IValue";

/**
 * Describes the nested-circle size legend a `<ZAxis>` registers with the chart's `<Legend>`,
 * explaining the size (`z`) encoding of a `<Scatter z>`/`<Scatters z>` bubble series
 */
export interface ISizeLegend {
    /**
     * The key of the field the size scale is built from
     */
    field: string;
    /**
     * The number of representative circles to draw, picked from the scale's domain. Ignored when
     * `tickValues` is provided
     */
    ticks?: number;
    /**
     * Explicit values to draw a circle for, instead of letting `ticks` pick them automatically
     */
    tickValues?: IValue[];
    /**
     * Formats each circle's value label
     */
    tickFormat?: (value: IValue) => string;
}
