import type { ICoordinate } from "@chart-io/types";

/**
 * Returns a position for the tooltip from the moust event
 * @param  mouseEvent  The mouse event that triggered the tooltip
 * @param  width       The width of the chart
 * @param  height      The height of the chart
 * @param  offset      The pixel offset that the tooltip should be from the cursor
 * @return             The tooltip position style object
 */
export const getTooltipPosition = (mouseEvent: ICoordinate, width: number, height: number, offset: number) => {
    if (!mouseEvent) {
        return { x: 0, y: 0 };
    }

    const { x, y } = mouseEvent;

    // Left means we're positioning the left most edge
    // of the tooltip. Normally on the right hand side of
    // the data point
    const left = x <= width / 2 ? `${x + offset}px` : null;
    const right = x > width / 2 ? `${width - (x - offset)}px` : null;
    const top = y < height / 2 ? `${y + offset}px` : null;
    const bottom = y >= height / 2 ? `${height - (y - offset)}px` : null;

    return {
        position: "absolute",
        left,
        right,
        top,
        bottom,
    };
};
