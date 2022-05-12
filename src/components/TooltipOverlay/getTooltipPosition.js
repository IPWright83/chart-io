const OFFSET = 20;

/**
 * Returns a position for the tooltip from the moust event
 * @param  {Object} mouseEvent  The mouse event that triggered the tooltip
 * @param  {Number} width       The width of the chart
 * @param  {Number} height      The height of the chart
 * @return {Object}             The tooltip position style object
 */
export const getTooltipPosition = (mouseEvent, width, height) => {
    const x = mouseEvent.offsetX;
    const y = mouseEvent.offsetY;

    if (!mouseEvent) {
        return { x: 0, y: 0 };
    }

    // Left means we're positioning the left most edge
    // of the tooltip. Normally on the right hand side of
    // the data point
    const left = x <= width / 2 ? `${x + OFFSET}px` : null;
    const right = x > width / 2 ? `${width - (x - OFFSET)}px` : null;
    const top = y < height / 2 ? `${y + OFFSET}px` : null;
    const bottom = y >= height / 2 ? `${height - (y - OFFSET)}px` : null;

    return {
        position: "absolute",
        left,
        right,
        top,
        bottom,
    };
};
