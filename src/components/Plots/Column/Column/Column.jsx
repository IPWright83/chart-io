import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { ColumnBase } from "./ColumnBase";

const CanvasColumn = withCanvas(withXYPlot(ColumnBase), "plot column");
const SVGColumn = withSVG(withXYPlot(ColumnBase), "plot column");

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const Column = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <CanvasColumn {...props} />;
    }

    return <SVGColumn {...props} />;
};

Column.propTypes = {
    ...ColumnBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

Column.defaultProps = {
    ...ColumnBase.defaultProps,
    useCanvas: false,
};

Column.requiresVirtualCanvas = true;

export { Column };
