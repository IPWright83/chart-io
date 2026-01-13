import type { IMargin, IPosition } from "@chart-it/types";

import { logAndThrowError } from "../../../../utils";

/**
 * Obtain the transform for the Axis title
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  width        The width for the plot
 * @param  height       The height for the plot
 * @param  margin       The margin object for the chart
 * @return              The transform
 */
export function getTransform(position: IPosition, width: number, height: number, margin: IMargin): string {
    if (width === 0 || height === 0) {
        return "translate(0, 0)";
    }

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    switch (position) {
        case "left":
            return `translate(${margin.left / 2 - 25}, ${halfHeight + margin.top / 2})rotate(270)`;
        case "right":
            return `translate(${margin.left + width + margin.right / 2 + 25}, ${
                halfHeight + margin.top / 2
            })rotate(270)`;
        case "top":
            return `translate(${halfWidth + margin.left / 2}, ${margin.top - 25})`;
        case "bottom":
            return `translate(${halfWidth + margin.left / 2}, ${height + margin.top + 35})`;
        default:
            logAndThrowError("E002", `Invalid position (${position}) was provided to the Axis`);
    }
}
