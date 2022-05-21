import { Circle } from "./Circle";
import { Square } from "./Square";
import { Line } from "./Line";

/**
 * Retrieve the appropriate shape for the tooltip from the seriesType
 * @param {String} seriesType   The type of the series
 * @returns {ReactDOMComponent}  The appropriate shape component to display within the tooltip
 **/
const getShape = (seriesType) => {
    switch (seriesType) {
        case "scatter":
            return Circle;
        case "bar":
        case "column":
        case "area":
            return Square;
        case "line":
            return Line;
        default:
            return null;
    }
};

export { getShape };
