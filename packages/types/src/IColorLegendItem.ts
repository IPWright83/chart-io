import type { IColor } from "./IColor";

/**
 * Used to represent an item in a legend where the Color distinguishes between entries
 */
export interface IColorLegendItem {
    /**
     * The name of the series being display
     */
    name: string;
    /**
     * The icon type for the tooltip
     */
    icon?: "circle" | "line" | "square" | "none";
    /**
     * The colour of the icon
     */
    fill?: IColor;
}
