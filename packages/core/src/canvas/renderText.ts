import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Renders a text label to the canvas. For most labels (e.g. a `<CirclePacking>` node's name) this
 * still participates in the virtual canvas's hit-testing pass, filled with `overrideColor`, even
 * though the shape they're labelling (e.g. the node's circle) is already its own hit-testing target -
 * the two hit regions simply overlap, both resolving to the same datum. For a `<WordCloud>` the text
 * itself is the only shape - there's no backing circle/rect - so it has to paint a hit-testable region
 * of its own for Canvas mode to be interactive at all
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderText(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const x = Number(selection.attr("x"));
    const y = Number(selection.attr("y"));
    const dy = Number(selection.attr("dy")) || 0;
    // The rotation (in degrees) a label is turned by around its own x/y anchor - e.g. a vertical
    // word on a <WordCloud> - mirroring the `rotate(deg, x, y)` transform stamped onto the
    // equivalent SVG <text>
    const rotate = Number(selection.attr("data-rotate")) || 0;
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

    if (overrideColor) {
        // Solid fill, full opacity - same convention as every other renderer's hit-testing pass
        context.globalAlpha = 1;
        context.fillStyle = `${overrideColor}`;
    } else {
        if (!fill) {
            return;
        }

        context.globalAlpha = opacity;
        context.fillStyle = fill;
    }

    if (rotate === 0) {
        context.fillText(text, x, y + dy);
        return;
    }

    context.save();
    context.translate(x, y);
    context.rotate((rotate * Math.PI) / 180);
    context.fillText(text, 0, dy);
    context.restore();
}
