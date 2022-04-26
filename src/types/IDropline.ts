/**
 * Represents a Dropline on a chart
 */
export interface IDropline {
    /** True if the Dropline is horizontal, otherwise false */
    isHorizontal?: boolean;

    /** True if the Dropline is vertical, otherwise false */
    isVertical?: boolean;

    /** The colour to use for the dropline */
    color: string;

    /** The x-coordinate to start drawing the dropline from */
    x1: number;

    /** The x-coordinate to end drawing the dropline */
    x2: number;

    /** The y-coordinate to start drawing the dropline from */
    y1: number;

    /** The y-coordinate to end drawing the dropline */
    y2: number;
}
