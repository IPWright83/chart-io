export const LEGEND_MARGIN = 10;

/**
 * Return the position that the legend should be positioned in
 * @param horizontalPosition     The horizontal position of the legend
 * @param verticalPosition       The vertical position of the legend
 * @returns                      A style object with positional information
 */
export function getLegendPosition(horizontalPosition?: "LEFT" | "RIGHT", verticalPosition?: "TOP" | "BOTTOM") {
    let left: number = null;
    let right: number = null;
    let bottom: number = null;
    let top: number = null;

    // prettier-ignore
    switch (horizontalPosition) {
        case "RIGHT": right = LEGEND_MARGIN; break;
        case "LEFT":
        default: left = LEGEND_MARGIN; break;
    }

    // prettier-ignore
    switch (verticalPosition) {
        case "BOTTOM": bottom = LEGEND_MARGIN; break;
        case "TOP": 
        default: top = LEGEND_MARGIN; break;
    }

    return {
        position: "absolute",
        left,
        right,
        top,
        bottom,
    };
}
