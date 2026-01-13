import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { GroupedColumnBase } from "./GroupedColumnBase";

const GroupedCanvasColumn = withCanvas(withXYPlot(GroupedColumnBase), "plot grouped-column");
const GroupedSVGColumn = withSVG(withXYPlot(GroupedColumnBase), "plot grouped-column");

/**
 * Represents a Column plot
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Column plot component
 */
const GroupedColumn = ({ useCanvas, colors, ...props }) => {
    const theme = useSelector((s) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <GroupedCanvasColumn {...props} colors={palette} />;
    }

    return <GroupedSVGColumn {...props} colors={palette} />;
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

GroupedColumn.requiresVirtualCanvas = true;

export { GroupedColumn };
