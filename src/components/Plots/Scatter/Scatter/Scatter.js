import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";
import { ScatterBase } from "./ScatterBase";

const CanvasScatter = withCanvas(withXYPlot(ScatterBase), "plot scatter");
const SVGScatter = withSVG(withXYPlot(ScatterBase), "plot scatter");

/**
 * Represents a Scatter plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Scatter plot component
 */
const Scatter = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <CanvasScatter {...props} />;
    }

    return <SVGScatter {...props} />;
};

Scatter.propTypes = {
    ...ScatterBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

Scatter.defaultProps = {
    ...ScatterBase.defaultProps,
    useCanvas: false,
};

export { Scatter };
