import PropTypes from "prop-types";
import React from "react";

import { withSVG, withCanvas, withXYPlot } from "../../../../hoc";
import { plotsPropTypes, eventPropTypes, eventDefaultProps, plotsDefaultProps } from "../../../../types";
import { StackedCanvasArea } from "./StackedCanvasArea";
import { StackedSVGArea } from "./StackedSVGArea";

const WrappedStackedCanvasArea = withCanvas(withXYPlot(StackedCanvasArea));
const WrappedStackedSVGArea = withSVG(withXYPlot(StackedSVGArea));

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const StackedArea = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <WrappedStackedCanvasArea {...props} />;
    }

    return <WrappedStackedSVGArea {...props} />;
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

export { StackedArea };
