import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { CanvasLine } from "./CanvasLine";
import { SVGLine } from "./SVGLine";

const WrappedCanvasLine = withCanvas(withXYPlot(CanvasLine));
const WrappedSVGLine = withSVG(withXYPlot(SVGLine));

/**
 * Represents a Line plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Line plot component
 */
const Line = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <WrappedCanvasLine {...props} />;
    }

    return <WrappedSVGLine {...props} />;
};

Line.propTypes = {
    ...SVGLine.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {[type]}
     */
    useCanvas: PropTypes.bool,
};

export { Line };
