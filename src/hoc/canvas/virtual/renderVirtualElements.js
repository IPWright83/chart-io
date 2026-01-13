import * as d3 from "d3";

import { renderElements } from "../renderElements";

/*
 * We're doing some bit-shifting here to more clearly illustrate how
 * to derive a color from a number, but you could accomplish the same
 * thing using modulo arithmetic and division! Check out the examples
 * to see an alternative approach
 * From https://engineering.mongodb.com/post/d3-round-two-how-to-blend-html5-canvas-with-svg-to-speed-up-rendering
 */
function getColor(index) {
    return d3
        .rgb(
            (index & 0b111111110000000000000000) >> 16,
            (index & 0b000000001111111100000000) >> 8,
            index & 0b000000000000000011111111
        )
        .toString();
}

/**
 * Renders the virtual canvas elements based on the join
 * @param  {Object} context         The Canvas context object to render to
 * @param  {Object} join            The D3 data join to render
 * @return {Object}
 */

const renderVirtualElements = (context, join) => {
    const colorToData = {};
    const colors = [];

    // Used a manual index, as the `i` parameter for `.each` resets
    // when dealing with a nested selection. Start at 1 to avoid choosing black
    let index = 1;

    join.each((d, i, elements) => {
        // Get a unique color for each node so we can map from
        // the color back to a datum. +1 to ignore white as
        // this will be the background color of the canvas
        const color = getColor(index);
        colors.push(color);
        colorToData[color] = { datum: d, node: elements[i] };
        index++;
    });

    renderElements(context, join, colors);

    return colorToData;
};

export { renderVirtualElements };
