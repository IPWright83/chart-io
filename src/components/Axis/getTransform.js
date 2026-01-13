/**
 * Obtain the transform for the Axis group
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
