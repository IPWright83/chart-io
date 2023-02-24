import * as d3 from "@d3-chart/d3";
import type { IColor } from "@d3-chart/types";

/**
 * Renders a rectangle to the canvas
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderRect(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const x = Number(selection.attr("x"));
    const y = Number(selection.attr("y"));
    const width = Number(selection.attr("width"));
    const height = Number(selection.attr("height"));
    const fill = selection.style("fill");
    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;

    context.beginPath();
    context.rect(x, y, width, height);

    if (overrideColor) {
        // We add 1 all around the square to take into account the extra
        // stroke, which decreases the size of the square. For
        // small square this can significantly decrease the hit target area

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

    context.rect(x, y, width, height);
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
