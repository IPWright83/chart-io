import { d3 } from "../d3";
import type { IColor } from "../types";

// `d3.geoPath()` (with no `pointRadius`, which none of `<Geo>`'s layers set) only ever emits `M`
// (moveto), `L` (lineto) and `Z` (closepath) commands - never curves - so a full SVG path parser
// isn't needed, just enough to walk each of a (possibly multi-ring, e.g. a country with islands or
// a hole) shape's subpaths back into Canvas moveTo/lineTo/closePath calls
const COMMAND_REGEX = /[MLZ][^MLZ]*/g;

/**
 * Replays an SVG `d` path string (as produced by `d3.geoPath()`) onto a Canvas 2D context
 * @param  context     The Canvas context object to draw the path into
 * @param  d           The `d` attribute value to replay
 */
function drawPath(context: CanvasRenderingContext2D, d: string) {
    const commands: string[] = d.match(COMMAND_REGEX) ?? [];

    commands.forEach((command) => {
        const type = command[0];

        if (type === "Z") {
            context.closePath();
            return;
        }

        const [x, y] = command.slice(1).split(",").map(Number);

        if (type === "M") {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    });
}

/**
 * Renders an arbitrary geographic path (e.g. a projected region, flow arc or tracked route drawn by
 * `<Geo>`'s layers) to the canvas. Registered with `renderElements` under the `"geo"` path type.
 * Unlike `renderLink`/`renderArc`, which reconstruct their geometry from a handful of numeric
 * `data-*` attributes, a geo path can be an arbitrarily complex multi-ring shape (e.g. a country with
 * enclaves or islands) - so rather than re-deriving that geometry, this replays the `d` attribute
 * D3 already computed via `d3.geoPath()` directly
 * @param  context             The Canvas context object to render to
 * @param  node                The virtual DOM node that represents this element
 * @param  overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
export function renderGeoPath(context: CanvasRenderingContext2D, node: Element, overrideColor?: IColor) {
    const selection = d3.select(node);
    const d = selection.attr("d");

    if (!d) {
        return;
    }

    const fill = selection.style("fill");
    const fillOpacity = selection.style("fill-opacity");
    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = Number(selection.style("stroke-width")) || 1;

    context.beginPath();
    drawPath(context, d);

    if (overrideColor) {
        // We apply this as both the fill and stroke so that hovering anywhere within (or right on
        // the edge/along the line of) the shape maps back to this element
        context.globalAlpha = 1;
        context.fillStyle = `${overrideColor}`;
        context.fill();
        context.strokeStyle = `${overrideColor}`;
        context.lineWidth = Math.max(strokeWidth, 6);
        context.stroke();

        return;
    }

    if (fill && fill !== "none") {
        context.globalAlpha = (Number(fillOpacity) || 1) * opacity;
        context.fillStyle = fill;
        context.fill();
    }

    if (stroke && stroke !== "none") {
        context.globalAlpha = opacity;
        context.strokeStyle = stroke;
        context.lineWidth = strokeWidth;
        context.stroke();
    }
}
