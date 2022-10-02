import React from "react";
import PropTypes from "prop-types";

import "./Rect.css";

/**
 * Renders a Rect
 * @return {ReactElement}  The Rect component
 */
const Rect = ({ x, y, width, height, opacity, fill, stroke }) => {
    if (
        x === null ||
        x === undefined ||
        y === null ||
        y === undefined ||
        width === null ||
        width === undefined ||
        height === null ||
        height === undefined
    ) {
        return null;
    }

    return <rect x={x} y={y} width={width} height={height} className="rect" style={{ stroke, opacity, fill }} />;
};

Rect.propTypes = {
    /**
     * The x position of the rect https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
     * @type {number}
     */
    x: PropTypes.number.isRequired,
    /**
     * The y position of the rect https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y
     * @type {number}
     */
    y: PropTypes.number.isRequired,
    /**
     * The width of the rect https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width
     * @type {number}
     */
    width: PropTypes.number.isRequired,
    /**
     * The height of the rect https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height
     * @type {number}
     */
    height: PropTypes.number.isRequired,
    /**
     * The opactity to use for the Polygon
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

export { Rect };
