import { d3 } from "../d3";
import type { IColor } from "../types";

/**
 * Renders a radial link (e.g. a RadialDendrogram's connector between a node and its parent) to the
 * canvas. Registered with `renderPath` under the `"link-radial"` path type. The geometry is read from a
 * set of `data-*` attributes stamped onto the node when it is rendered to SVG, then replayed through
 * `d3.linkRadial()` with its `context` set directly to the canvas - the same technique `renderArc` uses
 * for `d3.arc()` - since a link cannot be reconstructed from simple bounding box attributes
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderLinkRadial(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);

    const cx = Number(selection.attr("data-cx"));
    const cy = Number(selection.attr("data-cy"));
    const angle0 = Number(selection.attr("data-angle0"));
    const radius0 = Number(selection.attr("data-radius0"));
    const angle1 = Number(selection.attr("data-angle1"));
    const radius1 = Number(selection.attr("data-radius1"));
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;
    const opacity = Number(selection.style("opacity")) || 1;

    const linkGenerator = d3
        .linkRadial<unknown, { angle: number; radius: number }>()
        .angle((d) => d.angle)
        .radius((d) => d.radius)
        .context(context);

    context.save();
    context.translate(cx, cy);
    context.beginPath();
    linkGenerator({ source: { angle: angle0, radius: radius0 }, target: { angle: angle1, radius: radius1 } });

    if (overrideColor) {
        // A thicker, solid stroke so the virtual canvas has a wide enough hit target for a thin line
        context.globalAlpha = 1;
        context.strokeStyle = `${overrideColor}`;
        context.lineWidth = Math.max(strokeWidth, 6);
        context.stroke();
        context.restore();
        return;
    }

    context.globalAlpha = opacity;

    if (stroke && stroke !== "none") {
        context.strokeStyle = stroke;
        context.lineWidth = strokeWidth;
        context.stroke();
    }

    context.restore();
}
