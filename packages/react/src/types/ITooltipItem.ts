import type { IPrimitive } from "./IPrimitive";
import type { IColor } from "./IColor";

export interface ITooltipItem {
    /**
     * The name of the series being display
     */
    name: string;
    /**
     * The value for the datum for the series
     * @type {String|Number|Boolean|Date}
     */
    value: IPrimitive;
    /**
     * The type of the series being displayed
     */
    seriesType?: "scatter" | "line" | "area" | "bar" | "column";
    /**
     * The colour of the item
     */
    fill?: IColor;
}
