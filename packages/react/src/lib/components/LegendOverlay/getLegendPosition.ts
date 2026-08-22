import type { ICompassPosition } from "@chart-io/core";

export const LEGEND_MARGIN = 10;

/**
 * Return the CSS position that docks the legend at the given compass position around the edge of
 * the chart
 * @param position     The compass position to dock the legend at
 * @returns             A style object with positional information
 */
export function getLegendPosition(position: ICompassPosition = "E") {
    let left: number | string = null;
    let right: number | string = null;
    let bottom: number | string = null;
    let top: number | string = null;
    let transformX = "";
    let transformY = "";

    if (position.includes("W")) {
        left = LEGEND_MARGIN;
    } else if (position.includes("E")) {
        right = LEGEND_MARGIN;
    } else {
        left = "50%";
        transformX = "translateX(-50%)";
    }

    if (position.includes("N")) {
        top = LEGEND_MARGIN;
    } else if (position.includes("S")) {
        bottom = LEGEND_MARGIN;
    } else {
        top = "50%";
        transformY = "translateY(-50%)";
    }

    const transform = [transformX, transformY].filter(Boolean).join(" ") || null;

    return {
        position: "absolute",
        left,
        right,
        transform,
        top,
        bottom,
    };
}
