import { renderCircle } from "./renderCircle";
import { renderRect } from "./renderRect";

/**
 * Renders the canvas elements based on the join
 * @param  {Object} context             The Canvas context object to render to
 * @param  {Object} join                The D3 data join to render
 * @param  {Object} colors              A list of colors
 */
const renderElements = (context, join, colors) => {
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
};

export { renderElements };
