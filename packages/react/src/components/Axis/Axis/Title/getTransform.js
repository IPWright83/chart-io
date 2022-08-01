/**
 * Obtain the transform for the Axis title
 * @param  {String} position     The position of the axis [left, right, top, bottom]
 * @param  {Number} width        The width for the chart
 * @param  {Number} height       The height for the chart
 * @param  {Number} margin       The margin object for the chart
 * @return {String}              The transform
 */
const getTransform = (position, width, height, margin) => {
    if (width === 0 || height === 0) {
        return "translate(0, 0)";
    }

    const actualWidth = width - margin.left - margin.right;
    const actualHeight = height - margin.top - margin.bottom;
    const halfWidth = actualWidth / 2;
    const halfHeight = actualHeight / 2;

    switch (position) {
        case "left":
            return `translate(${margin.left / 2 - 25}, ${halfHeight + margin.top / 2})rotate(270)`;
        case "right":
            return `translate(${width - margin.right / 2 + 25}, ${halfHeight + margin.top / 2})rotate(270)`;
        case "top":
            return `translate(${halfWidth + margin.left / 2}, ${margin.top - 25})`;
        case "bottom":
            return `translate(${halfWidth + margin.left / 2}, ${height - margin.bottom + 35})`;
        default:
            throw new Error(`Invalid position: ${position}`);
    }
};

export { getTransform };
