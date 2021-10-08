import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { StackedColumnBase } from "./StackedColumnBase";

const StackedCanvasColumn = withCanvas(withXYPlot(StackedColumnBase));
const StackedSVGColumn = withSVG(withXYPlot(StackedColumnBase));

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const StackedColumn = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <StackedCanvasColumn {...props} />;
    }

    return <StackedSVGColumn {...props} />;
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

export { StackedColumn };
