import type { IPosition } from "@chart-it/types";

import { logAndThrowError } from "../../../../utils";

/**
 * Obtain the tick size used for gridlines
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  plotWidth    The width for the plot
 * @param  plotHeight   The height for the plot
 * @return              The transform
 */
const getTickSize = (position: IPosition, plotWidth: number, plotHeight: number): number => {
    if (plotWidth === 0 || plotHeight === 0) {
        return 0;
    }

    switch (position) {
        case "left":
        case "right":
            return plotWidth;
        case "top":
        case "bottom":
            return plotHeight;
        default:
            logAndThrowError("E002", `Invalid position (${position}) was provided to the Axis`);
    }
};

export { getTickSize };
