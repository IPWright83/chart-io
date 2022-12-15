import PropTypes from "prop-types";
import React from "react";

import { AreaBase, IAreaBaseProps } from "./AreaBase";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

const WrappedCanvasArea = withCanvas(withXYPlot(AreaBase), "plot area");
const WrappedSVGArea = withSVG(withXYPlot(AreaBase), "plot area");

export interface IAreaProps extends Omit<IAreaBaseProps, "canvas"> {
    /**
     * Should this plot use an HTML Canvas instead of SVG?
     */
    useCanvas?: boolean;
}

/**
 * Represents a Area plot
 * @param  props       The set of React properties
 * @return             The Area plot component
 */
export const Area = ({ useCanvas = false, ...props }) => {
    if (useCanvas) {
        return <WrappedCanvasArea {...props} />;
    }

    return <WrappedSVGArea {...props} />;
};

Area.requiresVirtualCanvas = false;
