import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Renders a ribbon (e.g. a Chord's connection between two groups) to the canvas. Registered with
 * `renderPath` under the `"ribbon"` path type. The geometry is read from a set of `data-*` attributes
 * that are stamped onto the node when it is rendered to SVG, since a ribbon cannot be reconstructed
 * from simple bounding box attributes like a `<rect>` or `<circle>` can - the same technique
 * `renderArc` uses for `d3.arc()`
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderRibbon(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const cx = Number(selection.attr("data-cx"));
    const cy = Number(selection.attr("data-cy"));
    const radius = Number(selection.attr("data-radius"));
    const sourceStartAngle = Number(selection.attr("data-source-start-angle"));
    const sourceEndAngle = Number(selection.attr("data-source-end-angle"));
    const targetStartAngle = Number(selection.attr("data-target-start-angle"));
    const targetEndAngle = Number(selection.attr("data-target-end-angle"));
    const fill = selection.style("fill");
    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;

    const ribbon = d3.ribbon().radius(radius).context(context);

    context.save();
    context.translate(cx, cy);
    context.beginPath();
    // @ts-ignore: TODO: Not sure how to fix this
    ribbon({
        source: { startAngle: sourceStartAngle, endAngle: sourceEndAngle },
        target: { startAngle: targetStartAngle, endAngle: targetEndAngle },
    });

    if (overrideColor) {
        // We fill using a solid, unique color so that the virtual canvas can be used
        // to detect which datum was interacted with based on the pixel color
        context.globalAlpha = 1;
        context.fillStyle = `${overrideColor}`;
        context.fill();

        // We apply a white stroke. This is to deal with anti-aliasing
        // causing offset colors to be detected, triggering an event
        // on an incorrect data point.
        context.strokeStyle = `rgb(255, 255, 255)`;
        context.lineWidth = 1;
        context.stroke();

        context.restore();
        return;
    }

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

    context.restore();
}
