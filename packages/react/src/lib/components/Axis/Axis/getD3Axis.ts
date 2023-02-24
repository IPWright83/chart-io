import { axisLeft, axisRight, axisTop, axisBottom } from "d3-axis";
import type { Axis, AxisScale, AxisDomain } from "d3-axis";
import type { IPosition, IScale } from "@d3-chart/types";

/**
 * Return a D3 Axis function
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  scale        The D3 scale being used by the axis
 * @return              The D3 selection Axis - https://github.com/d3/d3-axis
 */
const getD3Axis = (position: IPosition, scale: IScale): Axis<AxisDomain> => {
    switch (position) {
        case "left":
            return axisLeft(scale as AxisScale<AxisDomain>);
        case "right":
            return axisRight(scale as AxisScale<AxisDomain>);
        case "top":
            return axisTop(scale as AxisScale<AxisDomain>);
        case "bottom":
            return axisBottom(scale as AxisScale<AxisDomain>);
        default:
            throw new Error(`Invalid position ${position}`);
    }
};

export { getD3Axis };
