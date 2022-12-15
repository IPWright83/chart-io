import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";

/**
 * Renders a VerticalLine
 * @return {ReactElement}  The VerticalLine component
 */
const VerticalLine = ({ x, value, opacity = 1, stroke }) => {
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, x));

    // Scale may not yet have been initialized
    if (!scale) {
        return null;
    }

    const xValue = scale(value);

    return (
        <line
            y1={margin.top}
            y2={height - margin.bottom}
            x1={xValue}
            x2={xValue}
            style={{ stroke, opacity, pointerEvents: "none" }}
        />
    );
};

VerticalLine.propTypes = {
    /**
     * The x value to position the constant line at
     * @type {number|string|date|boolean}
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool]),
    /**
     * The key to use to determine which scale to use
     * @type {string}
     */
    x: PropTypes.string.isRequired,
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

export { VerticalLine };
