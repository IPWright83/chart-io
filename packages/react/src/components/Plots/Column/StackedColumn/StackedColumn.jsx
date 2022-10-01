import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { StackedColumnBase } from "./StackedColumnBase";

const StackedCanvasColumn = withCanvas(withXYPlot(StackedColumnBase), "plot stacked-column");
const StackedSVGColumn = withSVG(withXYPlot(StackedColumnBase), "plot stacked-column");

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const StackedColumn = ({ useCanvas, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <StackedCanvasColumn {...props} colors={palette} />;
    }

    return <StackedSVGColumn {...props} colors={palette} />;
};

StackedColumn.propTypes = {
    ...StackedColumnBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

StackedColumn.defaultProps = {
    ...StackedColumnBase.defaultProps,
    useCanvas: false,
};

StackedColumn.requiresVirtualCanvas = true;

export { StackedColumn };
