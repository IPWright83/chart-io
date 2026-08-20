import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Parses an SVG `points` attribute (e.g. `"1,2 3,4 5,6"`) into an array of coordinate pairs
 * @param  points     The raw `points` attribute value
 * @return            The parsed coordinate pairs
 */
function parsePoints(points: string): Array<[number, number]> {
    return points
        .trim()
        .split(/\s+/)
        .filter((pair) => pair.length > 0)
        .map((pair) => {
            const [x, y] = pair.split(",").map(Number);
            return [x, y];
        });
}

/**
 * Renders an open polyline to the canvas - the same as `renderPolygon`, but stroke-only and not
 * closed back to the first point. Used by `<ParallelCoordinates>` to draw each row's line across
 * its axes
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderPolyline(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const points = parsePoints(selection.attr("points") ?? "");

    if (points.length === 0) {
        return;
    }

    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;

    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([x, y]) => context.lineTo(x, y));

    if (overrideColor) {
        // A slightly thicker, solid stroke so the virtual canvas has a wide enough hit target for a
        // thin line. Unlike a single `renderLink`/`renderRibbon` shape, a polyline is typically one of
        // many densely packed, criss-crossing rows (e.g. a `<ParallelCoordinates>` with hundreds of
        // lines) - blowing the hit target out to a fixed minimum width (as those renderers do) would
        // make neighbouring rows' hit targets overlap and resolve hover to the wrong row, so this only
        // pads a little over the row's own width rather than flooring it at a fixed size
        context.globalAlpha = 1;
        context.strokeStyle = `${overrideColor}`;
        context.lineWidth = strokeWidth + 2;
        context.stroke();
        return;
    }

    context.globalAlpha = opacity;

    if (stroke && stroke !== "none") {
        context.strokeStyle = stroke;
        context.lineWidth = strokeWidth;
        context.stroke();
    }
}
