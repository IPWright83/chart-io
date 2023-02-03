import type { IColor } from "@d3-chart/types";
import * as d3 from "d3";

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
    context.arc(cx, cy, r, 0, 2 * Math.PI);
    context.globalAlpha = opacity;

    if (overrideColor) {
        context.globalAlpha = 1;
        context.fillStyle = `${overrideColor}`;
        context.fill();
        return;
    }

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
