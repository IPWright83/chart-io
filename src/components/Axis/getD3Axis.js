import * as d3 from "d3";

/**
 * Return a D3 Axis function
 * @param  {String}         position            The position of the axis [left, right, top, bottom]
 * @return {Function}                           The D3 selection Axis - https://github.com/d3/d3-axis
 */
const getD3Axis = (position) => {
    switch (position) {
        case "left":
            return d3.axisLeft();
        case "right":
            return d3.axisRight();
        case "top":
            return d3.axisTop();
        case "bottom":
            return d3.axisBottom();
        default:
            throw new Error(`Invalid position ${position}`);
    }
};

export { getD3Axis };
