import * as d3 from "@chart-io/d3";
import type { Axis, AxisDomain, AxisScale } from "@chart-io/d3";
import type { IPosition, IScale } from "@chart-io/types";
import { logAndThrowError } from "@chart-io/core";

/**
 * Return a D3 Axis function
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  scale        The D3 scale being used by the axis
 * @return              The D3 selection Axis - https://github.com/d3/d3-axis
 */
const getD3Axis = (position: IPosition, scale: IScale): Axis<AxisDomain> => {
    switch (position) {
        case "left":
            return d3.axisLeft(scale as AxisScale<AxisDomain>);
        case "right":
            return d3.axisRight(scale as AxisScale<AxisDomain>);
        case "top":
            return d3.axisTop(scale as AxisScale<AxisDomain>);
        case "bottom":
            return d3.axisBottom(scale as AxisScale<AxisDomain>);
        default:
            // istanbul ignore next
            logAndThrowError("E002", `Invalid position (${position}) was provided to the Axis`);
    }
};

export { getD3Axis };
