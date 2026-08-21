import type { ICompassPosition } from "@chart-io/core";

// Going counter-clockwise from due East, in 45 degree steps - matches the sign of Math.atan2
const COMPASS_ORDER: ICompassPosition[] = ["E", "NE", "N", "NW", "W", "SW", "S", "SE"];

/**
 * Given a drop point and the dimensions of the area it was dropped within, return whichever of the
 * 8 compass positions around the area's edge is closest to it - used to dock a dragged Legend to
 * the nearest position, rather than leaving it freeform
 * @param x        The x-coordinate of the drop point, relative to the area
 * @param y        The y-coordinate of the drop point, relative to the area
 * @param width    The width of the area
 * @param height   The height of the area
 * @returns        The nearest compass position
 */
export function getDockPosition(x: number, y: number, width: number, height: number): ICompassPosition {
    const dx = x - width / 2;
    // Screen y grows downward, but compass north is up, so flip it before taking the angle
    const dy = -(y - height / 2);

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const sector = (Math.round(angle / 45) + COMPASS_ORDER.length) % COMPASS_ORDER.length;

    return COMPASS_ORDER[sector];
}
