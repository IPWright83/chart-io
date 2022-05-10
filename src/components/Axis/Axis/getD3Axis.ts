/* istanbul ignore file */
import * as d3 from "d3";

import { IPosition } from "../../../types";

/**
 * Return a D3 Axis function
 * @param  {String}         position            The position of the axis [left, right, top, bottom]
 * @return {Function}                           The D3 selection Axis - https://github.com/d3/d3-axis
 */
const getD3Axis = (position: IPosition, scale: d3.AxisScale<d3.AxisDomain>): d3.Axis<d3.AxisDomain> => {
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
