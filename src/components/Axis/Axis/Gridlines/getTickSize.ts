import { IPosition, IMargin } from "../../../../types";

/**
 * Obtain the tick size used for gridlines
 * @param  {String} position     The position of the axis [left, right, top, bottom]
 * @param  {Number} width        The width for the chart
 * @param  {Number} height       The height for the chart
 * @param  {Number} margin       The margin object for the chart
 * @return {String}              The transform
 */
const getTickSize = (position: IPosition, width: number, height: number, margin : IMargin): number => {
    if (width === 0 || height === 0) {
        return 0;
    }

    switch (position) {
        case "left":
        case "right":
            return width - margin.left - margin.right;
        case "top":
        case "bottom":
            return height - margin.top - margin.bottom;
        default:
            throw new Error(`Invalid position: ${position}`);
    }
};

export { getTickSize };
