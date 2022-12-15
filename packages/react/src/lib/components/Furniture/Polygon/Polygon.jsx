import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a Polygon
 * @return {ReactElement}  The Polygon component
 */
const Polygon = ({ points, opacity = 0.5, fill, stroke }) => {
    if (!points) {
        return null;
    }

    return <polygon className="polygon" style={{ stroke, opacity, fill, pointerEvents: "none" }} points={points} />;
};

Polygon.propTypes = {
    /**
     * The set of points to display. See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     * @type {String}
     */
    points: PropTypes.string,
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

export { Polygon };
