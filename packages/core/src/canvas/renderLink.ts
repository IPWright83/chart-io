import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Renders a link (e.g. a Dendrogram's connector between a node and its parent) to the canvas.
 * Registered with `renderPath` under the `"link"` path type. The geometry is read from a set of
 * `data-*` attributes stamped onto the node when it is rendered to SVG, matching the cubic Bezier
 * `d3.linkHorizontal()` itself draws (control points sit horizontally, halfway between the source and
 * target x-coordinates), since a link cannot be reconstructed from simple bounding box attributes
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderLink(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);

    const x0 = Number(selection.attr("data-x0"));
    const y0 = Number(selection.attr("data-y0"));
    const x1 = Number(selection.attr("data-x1"));
    const y1 = Number(selection.attr("data-y1"));
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;
    // A link's transparency is set via `stroke-opacity` (LinksPlot never sets the element's own
    // `opacity`), so that's what has to be read back here too, or Canvas renders fully opaque
    // regardless of what SVG shows
    const opacity = Number(selection.style("stroke-opacity")) || 1;

    const midX = (x0 + x1) / 2;

    context.beginPath();
    context.moveTo(x0, y0);
    context.bezierCurveTo(midX, y0, midX, y1, x1, y1);

    if (overrideColor) {
        // A thicker, solid stroke so the virtual canvas has a wide enough hit target for a thin line
        context.globalAlpha = 1;
        context.strokeStyle = `${overrideColor}`;
        context.lineWidth = Math.max(strokeWidth, 6);
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
