import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";

/**
 * Renders a HorizontalBand
 * @return {ReactElement}  The HorizontalBand component
 */
const HorizontalBand = ({ yStart, yStop, y, opacity = 0.5, fill, stroke }) => {
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, y));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    const startY = yStart ? scale(yStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    const stopY = yStop ? scale(yStop) : scale.range()[1];

    return (
        <rect
            x={margin.left}
            width={width - margin.left - margin.right}
            y={stopY}
            height={startY - stopY}
            className="rect"
            style={{ stroke, opacity, fill, pointerEvents: "none" }}
        />
    );
};

HorizontalBand.propTypes = {
    /**
     * The start y position of the rect given in the scale co-ordinates
     * @type {number|string|date|boolean}
     */
    yStart: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The end y position of the rect given in the scale co-ordinates
     * @type {number|string|date|boolean}
     */
    yStop: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The key to use to determine which scale to use
     * @type {string}
     */
    y: PropTypes.string.isRequired,
    /**
     * The opactity to use for the Polygon
     * @default 0.5
     * @type {Number}
     */
    opacity: PropTypes.number,
    /**
     * The fill color of the Polygon
     * @type {String}
     */
    fill: PropTypes.string,
    /**
     * The stroke color of the Polygon
     * @type {String}
     */
    stroke: PropTypes.string,
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,
};

export { HorizontalBand };
