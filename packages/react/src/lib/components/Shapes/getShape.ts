import { Circle } from "./Circle";
import { Line } from "./Line";
import { Square } from "./Square";

/**
 * Retrieve the appropriate shape for the tooltip from the shape
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
