import PropTypes from "prop-types";
import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { GroupedColumnBase } from "./GroupedColumnBase";

const GroupedCanvasColumn = withCanvas(withXYPlot(GroupedColumnBase));
const GroupedSVGColumn = withSVG(withXYPlot(GroupedColumnBase));

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const GroupedColumn = ({ useCanvas, ...props }) => {
    if (useCanvas) {
        return <GroupedCanvasColumn {...props} />;
    }

    return <GroupedSVGColumn {...props} />;
};

GroupedColumn.propTypes = {
    ...GroupedColumnBase.propTypes,

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     * @type {Boolean}
     */
    useCanvas: PropTypes.bool,
};

GroupedColumn.defaultProps = {
    ...GroupedColumnBase.defaultProps,
    useCanvas: false,
};

export { GroupedColumn };
