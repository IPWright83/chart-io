import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { CanvasArea } from "./CanvasArea";
import { SVGArea } from "./SVGArea";

const WrappedCanvasArea = withCanvas(withXYPlot(CanvasArea));
const WrappedSVGArea = withSVG(withXYPlot(SVGArea));

/**
 * Represents a Area plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Area plot component
 */
const Area = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <WrappedCanvasArea {...props} />;
    }

    return <WrappedSVGArea {...props} />;
};

Area.propTypes = {
    ...SVGArea.propTypes,

    /**
     * The key of the field used for the y2 position for a stream graph
     * @type {String}
     */
    y2: PropTypes.string,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {[type]}
     */
    useCanvas: PropTypes.bool,
};

export { Area };
