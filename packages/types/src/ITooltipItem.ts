import type { IColor } from "./IColor";
import type { IShape } from "./IShape";
import type { IValue } from "./IValue";

/**
 * Used to represent an item in a tooltip
 */
export interface ITooltipItem {
    /**
     * The name of the series being display
     */
    name: string;
    /**
     * The value for the datum for the series
     */
    value: IValue;
    /**
     * The icon type for the tooltip
     */
    icon?: IShape;
    /**
     * The colour of the icon
     */
    fill?: IColor;
}
