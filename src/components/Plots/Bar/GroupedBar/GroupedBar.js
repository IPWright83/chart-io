import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { GroupedBarBase } from "./GroupedBarBase";

const GroupedCanvasBar = withCanvas(withXYPlot(GroupedBarBase), "plot grouped-bar");
const GroupedSVGBar = withSVG(withXYPlot(GroupedBarBase), "plot grouped-bar");

/**
 * Represents a Bar plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Bar plot component
 */
const GroupedBar = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <GroupedCanvasBar {...props} />;
    }

    return <GroupedSVGBar {...props} />;
};

GroupedBar.propTypes = {
    ...GroupedBarBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

GroupedBar.defaultProps = {
    ...GroupedBarBase.defaultProps,
    useCanvas: false,
};

export { GroupedBar };
