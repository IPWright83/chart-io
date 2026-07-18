import { logWarning } from "../utils";
import type { IColor } from "../types";

import { renderArc } from "./renderArc";

type IPathRenderer = (context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) => void;

/**
 * The set of renderers for each kind of `<path>` we know how to draw to canvas, keyed by the
 * `data-path-type` attribute stamped onto the node when it's rendered to SVG. A `<path>`'s `d` attribute
 * alone isn't enough to redraw it on canvas (there's no generic SVG path-to-canvas primitive available in
 * every canvas environment this library runs in), so each shape that wants Canvas support needs to tag
 * itself and provide the extra geometry its renderer needs via its own `data-*` attributes
 */
const pathRenderers: Record<string, IPathRenderer> = {
    arc: renderArc,
};

/**
 * Renders a `<path>` element to the canvas. A `<path>` can represent many different shapes, so rather than
 * assuming every path is the same kind of shape, this looks up the appropriate renderer using the node's
 * `data-path-type` attribute
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderPath(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const pathType = node.getAttribute("data-path-type");
    const renderer = pathRenderers[pathType];

    if (!renderer) {
        logWarning("W006", `Unsupported path type: ${pathType}`);
        return;
    }

    renderer(context, node, overrideColor);
}
