import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { StackedBarBase } from "./StackedBarBase";

const StackedCanvasBar = withCanvas(withXYPlot(StackedBarBase), "plot stacked-bar");
const StackedSVGBar = withSVG(withXYPlot(StackedBarBase), "plot stacked-bar");

/**
 * Represents a Bar plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bar plot component
 */
const StackedBar = ({ useCanvas, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <StackedCanvasBar {...props} colors={palette} />;
    }

    return <StackedSVGBar {...props} colors={palette} />;
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
