import type { IShape } from "@chart-io/types";

import Circle from "./Circle/Circle.svelte";
import Line from "./Line/Line.svelte";
import Square from "./Square/Square.svelte";

/**
 * Retrieve the appropriate shape for the tooltip from the shape
 * @param  icon   The type of icon requested
 * @returns       The appropriate shape component to display within the tooltip
 **/
export function getShape(icon?: IShape) {
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