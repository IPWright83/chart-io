import { Circle } from "./Circle";
import { Square } from "./Square";
import { Line } from "./Line";

/**
 * Retrieve the appropriate shape for the tooltip from the seriesType
 * @param  icon   The type of icon requested
 * @returns       The appropriate shape component to display within the tooltip
 **/
export function getShape(icon?: "circle" | "line" | "square" | "none") {
    switch (icon) {
        case "circle":
            return Circle;
        case "square":
            return Square;
        case "line":
            return Line;
        default:
            return null;
    }
}
