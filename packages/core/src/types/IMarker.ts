import type { IColor } from "./IColor";
import type { IDatum } from "./IData";

export interface IMarker {
    /**
     * The datum this marker represents, if any - lets it be left-clicked to open a "datum"
     * `<ContextMenu>` (e.g. "Hide data point"), the only way to reach one on a Line/Area/RadialArea,
     * which have no discrete per-point mark of their own to click. Omitted (and left non-interactive)
     * for markers that are purely a visual highlight, e.g. a Scatter point's halo
     */
    datum?: IDatum;

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
