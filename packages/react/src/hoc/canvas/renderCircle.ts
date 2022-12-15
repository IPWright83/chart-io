import * as d3 from "d3";
import type { IColor } from "../../types";

/**
 * Renders a circle to the canvas
 * @param  {Object} context             The Canvas context object to render to
 * @param  {Object} node                The virtual DOM node that represents this element
 * @param  {String} overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export const renderCircle = (context: CanvasRenderingContext2D, node: HTMLElement, overrideColor: IColor): void => {
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
        context.fillStyle = overrideColor;
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
};
