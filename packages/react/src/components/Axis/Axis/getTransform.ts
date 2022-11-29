import { Margin, Position } from "../../../types";

/**
 * Obtain the transform for the Axis group
 * @param  position     The position of the axis [left, right, top, bottom]
 * @param  width        The width for the chart
 * @param  height       The height for the chart
 * @param  margin       The margin object for the chart
 * @return              The transform
 */
const getTransform = (position: Position, width: number, height: number, margin: Margin): string => {
    if (width === 0 || height === 0) {
        return "translate(0, 0)";
    }

    switch (position) {
        case "left":
            return `translate(${margin.left}, 0)`;
        case "right":
            return `translate(${width - margin.right}, 0)`;
        case "top":
            return `translate(0, ${margin.top})`;
        case "bottom":
            return `translate(0, ${height - margin.bottom})`;
        default:
            throw new Error(`Invalid position: ${position}`);
    }
};

export { getTransform };
