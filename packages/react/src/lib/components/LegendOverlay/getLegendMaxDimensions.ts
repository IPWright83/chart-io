import type { ICompassPosition } from "@chart-io/core";

import { LEGEND_MARGIN } from "./getLegendPosition";

/**
 * Return the max width/height that the legend can take when docked at the given compass position
 * @param position           The compass position the legend is docked at
 * @param width              The width of the chart
 * @param height             The height of the chart
 * @param defaultMaxWidth    The max width of the legend when docked left or right
 * @param defaultMaxHeight   The max height of the legend when docked top or bottom
 * @returns                  A style object with the max width/height information
 */
export function getLegendMaxDimensions(
    position: ICompassPosition = "E",
    width: number,
    height: number,
    defaultMaxWidth: number,
    defaultMaxHeight: number
) {
    let maxWidth = defaultMaxWidth;
    let maxHeight = defaultMaxHeight;

    // Docked against the left/right edge (including a corner) - constrain how tall it can grow
    if (position !== "N" && position !== "S") {
        maxHeight = height - 4 * LEGEND_MARGIN;
    }

    // Docked against the top/bottom edge (including a corner) - constrain how wide it can grow
    if (position !== "E" && position !== "W") {
        maxWidth = width - 4 * LEGEND_MARGIN;
    }

    return {
        maxWidth,
        maxHeight,
    };
}
