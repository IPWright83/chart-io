export interface Marker {
    /** The stroke colour of the marker */
    stroke?: string;

    /** The fill colour of the marker */
    fill?: string;

    /** The radius of the marker at the start of animating */
    r1: number;

    /** The radius of the marker at the end of animating */
    r2: number;

    /** The x-coordinate to draw the marker at */
    cx: number;

    /** The y-coordinate to draw the marker at */
    cy: number;
}
