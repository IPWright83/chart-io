import type { Transition } from "@d3-chart/d3";
import type { IColor } from "@d3-chart/types";

import { renderCircle } from "./renderCircle";
import { renderRect } from "./renderRect";

/**
 * Renders the canvas elements based on the join
 * @param  context             The Canvas context object to render to
 * @param  join                The D3 data join to render
 * @param  colors              A list of colors
 */
export function renderElements(
    context: CanvasRenderingContext2D,
    join: Transition<Element, unknown, any, unknown>,
    colors?: IColor[]
) {
    if (!join) {
        return;
    }

    // Used a manual index, as the `i` parameter for `.each` resets
    // when dealing with a nested selection. This is only needed for
    // accessing the color
    let index = 0;

    join.each((d, i, elements) => {
        const node = elements[i];
        const overrideColor = colors ? colors[index++] : null;

        switch (node.nodeName) {
            case "CIRCLE":
                renderCircle(context, node, overrideColor);
                break;

            case "RECT":
                renderRect(context, node, overrideColor);
                break;

            default:
                throw new Error(`Unsupported node type: ${node.nodeName}`);
        }
    });
}
