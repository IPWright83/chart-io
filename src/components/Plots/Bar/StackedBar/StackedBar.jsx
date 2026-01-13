import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { StackedBarBase } from "./StackedBarBase";

const StackedCanvasBar = withCanvas(withXYPlot(StackedBarBase), "plot stacked-bar");
const StackedSVGBar = withSVG(withXYPlot(StackedBarBase), "plot stacked-bar");

/**
 * Represents a Bar plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bar plot component
 */
const StackedBar = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <StackedCanvasBar {...props} />;
    }

    return <StackedSVGBar {...props} />;
};

StackedBar.propTypes = {
    ...StackedBarBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

StackedBar.defaultProps = {
    ...StackedBarBase.defaultProps,
    useCanvas: false,
};

StackedBar.requiresVirtualCanvas = true;

export { StackedBar };
