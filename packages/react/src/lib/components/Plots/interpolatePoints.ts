/**
 * Linearly interpolates between two SVG `points` attribute strings (e.g. `"1,2 3,4"`), point by
 * point. If `target` has more points than `previous` (e.g. a category was added), the extra
 * points are held at their target position rather than interpolated from nothing
 * @param  previous    The previous `points` attribute value
 * @param  target      The target `points` attribute value
 * @param  t           The interpolation progress, between 0 and 1
 * @return             The interpolated `points` attribute value
 */
export function interpolatePoints(previous: string, target: string, t: number): string {
    const parse = (points: string) =>
        points
            .trim()
            .split(/\s+/)
            .filter((pair) => pair.length > 0)
            .map((pair) => pair.split(",").map(Number) as [number, number]);

    const previousPoints = parse(previous);
    const targetPoints = parse(target);

    return targetPoints
        .map(([x, y], i) => {
            const [previousX, previousY] = previousPoints[i] ?? [x, y];
            return `${previousX + (x - previousX) * t},${previousY + (y - previousY) * t}`;
        })
        .join(" ");
}
