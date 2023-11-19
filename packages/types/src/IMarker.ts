import type { IColor } from "./IColor";

export interface IMarker {
    /** The stroke colour of the marker */
    stroke?: IColor;

    /** The fill colour of the marker */
    fill?: IColor;

    /** The radius of the marker at the start of animating */
    r1?: number;

    /** The radius of the marker at the end of animating */
    r2?: number;

    /** The x-coordinate to draw the marker at */
    cx: number;

    /** The y-coordinate to draw the marker at */
    cy: number;

    /** Optional distance to the datum, if provided only the nearest marker will be shown */
    distance?: number;
}
