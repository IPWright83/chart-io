export const LEGEND_MARGIN = 10;

/**
 * Return the position that the legend should be positioned in
 * @param horizontalPosition     The horizontal position of the legend
 * @param verticalPosition       The vertical position of the legend
 * @returns                      A style object with positional information
 */
export function getLegendPosition(
    horizontalPosition?: "LEFT" | "RIGHT" | "CENTER",
    verticalPosition?: "TOP" | "BOTTOM" | "CENTER"
) {
    let left: number | string = null;
    let right: number | string = null;
    let bottom: number | string = null;
    let top: number | string = null;
    let transform: string = null;

    // prettier-ignore
    switch (horizontalPosition) {
        case "RIGHT": right = LEGEND_MARGIN; break;
        case "LEFT": left = LEGEND_MARGIN; break;
        case "CENTER": left = "50%"; transform = "translateX(-50%)"; break;
    }

    // prettier-ignore
    switch (verticalPosition) {
        case "BOTTOM": bottom = LEGEND_MARGIN; break;
        case "TOP": top = LEGEND_MARGIN; break;
        case "CENTER": top = "50%"; transform = "translateY(-50%)"; break;
    }

    return {
        position: "absolute",
        left,
        right,
        transform,
        top,
        bottom,
    };
}
