import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";

/**
 * Renders a HorizontalLine
 * @return {ReactElement}  The HorizontalLine component
 */
const HorizontalLine = ({ y, value, opacity = 1, stroke }) => {
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, y));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const yValue = scale(value);

    return (
        <line
            x1={margin.left}
            x2={width - margin.right}
            y1={yValue}
            y2={yValue}
            style={{ stroke, opacity, pointerEvents: "none" }}
        />
    );
};

HorizontalLine.propTypes = {
    /**
     * The y value to position the constant line at
     * @type {number|string|date|boolean}
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The key to use to determine which scale to use
     * @type {string}
     */
    y: PropTypes.string.isRequired,
    /**
     * The opactity to use for the Polygon
     * @default 1
     * @type {Number}
     */
    opacity: PropTypes.number,
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

export { HorizontalLine };
