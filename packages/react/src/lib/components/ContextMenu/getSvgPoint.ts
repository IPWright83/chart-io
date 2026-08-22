/**
 * Converts a point in client (viewport) coordinates, e.g. from `MouseEvent.clientX/clientY`, into
 * the local coordinate space of the given `<svg>`. Needed because the event may have originated
 * from a nested, transformed descendant (e.g. a bar inside a grouped/transformed `<g>`), so simple
 * offsets like `event.offsetX/offsetY` (relative to `event.target`) can't be relied on
 * @param  svg          The `<svg>` element to resolve coordinates against
 * @param  clientX      The x-coordinate in client (viewport) space
 * @param  clientY      The y-coordinate in client (viewport) space
 * @return              The equivalent point in the svg's local coordinate space
 */
export function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
    // jsdom (used for unit tests) doesn't implement these - fall back to the raw client coordinates
    if (typeof svg.createSVGPoint !== "function" || typeof svg.getScreenCTM !== "function") {
        return { x: clientX, y: clientY };
    }

    const ctm = svg.getScreenCTM();

    if (!ctm) {
        return { x: clientX, y: clientY };
    }

    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;

    const transformed = point.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
}
