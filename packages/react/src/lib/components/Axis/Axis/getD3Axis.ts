import type { IPosition, IScale } from "@d3-chart/types";
import * as d3 from "d3";

/**
 * Return a D3 Axis function
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  scale        The D3 scale being used by the axis
 * @return              The D3 selection Axis - https://github.com/d3/d3-axis
 */
const getD3Axis = (position: IPosition, scale: IScale): d3.Axis<d3.AxisDomain> => {
    switch (position) {
        case "left":
            return d3.axisLeft(scale as d3.AxisScale<d3.AxisDomain>);
        case "right":
            return d3.axisRight(scale as d3.AxisScale<d3.AxisDomain>);
        case "top":
            return d3.axisTop(scale as d3.AxisScale<d3.AxisDomain>);
        case "bottom":
            return d3.axisBottom(scale as d3.AxisScale<d3.AxisDomain>);
        default:
            throw new Error(`Invalid position ${position}`);
    }
};

export { getD3Axis };
