import type { IColor } from "./IColor";
import type { IShape } from "./IShape";

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
    icon?: IShape;
    /**
     * The colour of the icon
     */
    color?: IColor;
    /**
     * The key of the field this series sizes its points from (e.g. `<Scatter z>`), if any - lets a
     * size legend (see `<ZAxis>`) find the color of the first series plotted against its scale
     */
    zField?: string;
}
