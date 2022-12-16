/* istanbul ignore file */

import * as d3 from "d3";

/**
 * Return a D3 Axis function
 * @param  {String}         position            The position of the axis [left, right, top, bottom]
 * @param  {Function}       scale               The D3 scale function - https://github.com/d3/d3-scale
 * @return {Function}                           The D3 selection Axis - https://github.com/d3/d3-axis
 *
 */
const getD3Axis = (position, scale) => {
    switch (position) {
        case "left":
            return d3.axisLeft(scale);
        case "right":
            return d3.axisRight(scale);
        case "top":
            return d3.axisTop(scale);
        case "bottom":
            return d3.axisBottom(scale);
        default:
            throw new Error(`Invalid position ${position}`);
    }
};

export { getD3Axis };