import type { IMargin, IPosition } from "@chart-io/types";
import { logAndThrowError } from "@chart-io/core";

/**
 * Obtain the transform for the Axis group
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  plotWidth    The width for the plot
 * @param  plotHeight   The height for the plot
 * @param  margin       The margin object for the chart
 * @return              The transform
 */
export function getTransform(position: IPosition, plotWidth: number, plotHeight: number, margin: IMargin): string {
    if (plotWidth === 0 || plotHeight === 0) {
        return "translate(0, 0)";
    }

    switch (position) {
        case "left":
            return `translate(${margin.left}, 0)`;
        case "right":
            return `translate(${plotWidth + margin.left}, 0)`;
        case "top":
            return `translate(0, ${margin.top})`;
        case "bottom":
            return `translate(0, ${plotHeight + margin.top})`;
        default:
            logAndThrowError("E002", `Invalid position (${position}) was provided to the Axis`);
    }
}
