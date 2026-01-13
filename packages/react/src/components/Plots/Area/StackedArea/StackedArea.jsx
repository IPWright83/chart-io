import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";
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
const StackedArea = ({ useCanvas, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.colors;

    if (useCanvas) {
        return <StackedCanvasArea {...props} colors={palette} />;
    }

    return <StackedSVGArea {...props} colors={palette} />;
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
