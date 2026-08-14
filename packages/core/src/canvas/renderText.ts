import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Renders a text label to the canvas. Labels aren't a hit-testing target in their own right - the
 * shape they're labelling (e.g. a node's circle) already is - so unlike the other renderers here,
 * this draws nothing at all on the virtual canvas
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderText(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    if (overrideColor) {
        return;
    }

    const selection = d3.select(node);
    const x = Number(selection.attr("x"));
    const y = Number(selection.attr("y"));
    const dy = Number(selection.attr("dy")) || 0;
    const text = selection.text();
    const opacity = Number(selection.style("opacity")) || 1;
    const fill = selection.style("fill");
    const fontFamily = selection.style("font-family") || "sans-serif";
    const anchor = selection.attr("text-anchor") || "start";

    // font-size may come back unitless (SVG treats it as user units/px) - canvas requires a unit
    const fontSizeValue = Number.parseFloat(selection.style("font-size")) || 12;
    const fontSize = `${fontSizeValue}px`;

    context.font = `${fontSize} ${fontFamily}`;
    context.textAlign = anchor === "end" ? "right" : anchor === "middle" ? "center" : "left";
    context.textBaseline = "alphabetic";
    context.globalAlpha = opacity;

    if (fill) {
        context.fillStyle = fill;
        context.fillText(text, x, y + dy);
    }
}
