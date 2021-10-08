import * as d3 from "d3";

/**
 * Renders a rectangle to the canvas
 * @param  {Object} context             The Canvas context object to render to
 * @param  {Object} node                The virtual DOM node that represents this element
 * @param  {String} overrideColor       A custom color to override the node color which is used for the virtual canvas
 */
const renderRect = (context, node, overrideColor) => {
    const selection = d3.select(node);
    const x = selection.attr("x");
    const y = selection.attr("y");
    const width = selection.attr("width");
    const height = selection.attr("height");
    const fill = selection.style("fill");
    const opacity = Number(selection.style("opacity")) || 1;
    const stroke = selection.style("stroke");
    const strokeWidth = selection.style("stroke-width") || 1;

    context.beginPath();
    context.rect(x, y, width, height);
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

export { renderRect };
