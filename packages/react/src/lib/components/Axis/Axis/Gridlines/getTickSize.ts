import type { IMargin, IPosition } from "@chart-it/types";
import { logAndThrowError } from "../../../../utils";

/**
 * Obtain the tick size used for gridlines
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  width        The width for the chart
 * @param  height       The height for the chart
 * @param  margin       The margin object for the chart
 * @return              The transform
 */
const getTickSize = (position: IPosition, width: number, height: number, margin: IMargin): number => {
    if (width === 0 || height === 0) {
        return 0;
    }

    switch (position) {
        case "left":
        case "right":
            return width - margin.left - margin.right;
        case "top":
        case "bottom":
            return height - margin.top - margin.bottom;
        default:
            logAndThrowError("E002", `Invalid position (${position}) was provided to the Axis`);
    }
};

export { getTickSize };
