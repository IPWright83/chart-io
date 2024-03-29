import * as d3 from "@chart-io/d3";
import type { IColor } from "@chart-io/types";

/**
 * Renders a circle to the canvas
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderCircle(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const cx = Number(selection.attr("cx"));
    const cy = Number(selection.attr("cy"));
    const r = Number(selection.attr("r"));
    const fill = selection.style("fill");
    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;

    context.beginPath();

    if (overrideColor) {
        // We add 1 to the radius to take into account the extra
        // stroke, which decreases the size of the circle. For
        // small circles this can significantly decrease the hit target area
        context.arc(cx, cy, r + 1, 0, 2 * Math.PI);

        context.globalAlpha = 1;
        context.fillStyle = `${overrideColor}`;
        context.fill();

        // We apply a white stroke. This is to deal with anti-aliasing
        // causing offset colors to be detected, triggering an event
        // on an incorrect data point.
        context.strokeStyle = `rgb(255, 255, 255)`;
        context.lineWidth = 1;
        context.stroke();

        return;
    }

    // Render on a normal canvas
    context.arc(cx, cy, r, 0, 2 * Math.PI);
    context.globalAlpha = opacity;

    if (fill) {
        context.fillStyle = fill;
        context.fill();
    }

    if (stroke && stroke !== "none") {
        context.strokeStyle = stroke;
        context.lineWidth = strokeWidth;
        context.stroke();
    }
}
