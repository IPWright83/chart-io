import { LEGEND_MARGIN } from "./getLegendPosition";

/**
 * Return the max width/height that the legend can take
 * @param horizontalPosition     The horizontal position of the legend
 * @param verticalPosition       The vertical position of the legend
 * @param width                  The width of the chart
 * @param height                 The height of the chart
 * @param defaultMaxWidth        The max width of the legend when docked left or right
 * @param defaultMaxHeight       The max height of the legend when docked top or bottom
 * @returns                      A style object with the max width/height information
 */
export function getLegendMaxDimensions(
    horizontalPosition: "LEFT" | "RIGHT" | "CENTER",
    verticalPosition: "TOP" | "BOTTOM" | "CENTER",
    width: number,
    height: number,
    defaultMaxWidth: number,
    defaultMaxHeight: number
) {
    let maxWidth = defaultMaxWidth;
    let maxHeight = defaultMaxHeight;

    // prettier-ignore
    switch (horizontalPosition) {
        case "RIGHT": 
        case "LEFT":
                maxHeight = height - (4 * LEGEND_MARGIN); 
                break;
        default:  break;
    }

    // prettier-ignore
    switch (verticalPosition) {
        case "BOTTOM": 
        case "TOP": 
            maxWidth = width - (4 * LEGEND_MARGIN);
            break;
        default: break;
    }

    return {
        maxWidth,
        maxHeight,
    };
}
