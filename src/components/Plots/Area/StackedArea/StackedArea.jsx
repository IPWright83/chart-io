import PropTypes from "prop-types";
import React from "react";

import { withSVG, withCanvas, withXYPlot } from "../../../../hoc";
import { plotsPropTypes, eventPropTypes, eventDefaultProps, plotsDefaultProps } from "../../../../types";
import { StackedAreaBase } from "./StackedAreaBase";

const StackedCanvasArea = withCanvas(withXYPlot(StackedAreaBase), "plot stacked-area");
const StackedSVGArea = withSVG(withXYPlot(StackedAreaBase), "plot stacked-area");

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const StackedArea = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <StackedCanvasArea {...props} />;
    }

    return <StackedSVGArea {...props} />;
};

StackedArea.propTypes = {
    ...plotsPropTypes,
    ...eventPropTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

StackedArea.defaultProps = {
    ...plotsDefaultProps,
    ...eventDefaultProps,
    useCanvas: false,
};

StackedArea.requiresVirtualCanvas = false;

export { StackedArea };
