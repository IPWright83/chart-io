/**
 * Obtain the distance between two points
 * @param  x1 The x coordinate of the first point
 * @param  y1 The y coordinate of the first point
 * @param  x2 The x coordinate of the second point
 * @param  y2 The y coordinate of the second point
 * @return    The distance
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    const xDiff = Math.abs(x1 - x2);
    const yDiff = Math.abs(y1 - y2);

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
