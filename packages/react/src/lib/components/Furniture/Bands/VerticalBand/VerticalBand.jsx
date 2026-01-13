import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";

/**
 * Renders a VerticalBand
 * @return {ReactElement}  The VerticalBand component
 */
const VerticalBand = ({ xStart, xStop, x, opacity = 0.5, fill, stroke }) => {
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, x));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    // Calculate the position based on the scale. If no start was given
    // use the start of the scale "range" which are the pixel co-ordinates
    // for the start of the Y axis
    const startX = xStart ? scale(xStart) : scale.range()[0];

    // Calculate the position based on the scale. If no stop was given
    // use the end of the scale "range" which are the pixel co-ordinates
    // for the end of the Y axis
    const stopX = xStop ? scale(xStop) : scale.range()[1];

    return (
        <rect
            y={margin.top}
            height={height - margin.bottom - margin.top}
            width={stopX - startX}
            x={startX}
            className="rect"
            style={{ stroke, opacity, fill, pointerEvents: "none" }}
        />
    );
};

VerticalBand.propTypes = {
    /**
     * The start x position of the rect given in the scale co-ordinates
     * @type {number|string|date|boolean}
     */
    xStart: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The end x position of the rect given in the scale co-ordinates
     * @type {number|string|date|boolean}
     */
    xStop: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The key to use to determine which scale to use
     * @type {string}
     */
    x: PropTypes.string.isRequired,
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

export { VerticalBand };
