import React from "react";

import { AreaBase, IAreaBaseProps } from "./AreaBase";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

export interface IAreaProps extends Omit<IAreaBaseProps, "layer" | "canvas"> {
    /**
     * Should this plot use an HTML Canvas instead of SVG?
     */
    useCanvas?: boolean;
}

const WrappedCanvasArea = withCanvas<IAreaProps>(withXYPlot(AreaBase), "plot area");
const WrappedSVGArea = withSVG<IAreaProps>(withXYPlot(AreaBase), "plot area");

/**
 * Represents a Area plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Area plot component
 */
export function Area({ useCanvas = false, ...props }: IAreaProps) {
    if (useCanvas) {
        return <WrappedCanvasArea {...props} />;
    }

    return <WrappedSVGArea {...props} />;
}

Area.requiresVirtualCanvas = false;
Area.isPlot = true;
Area.brushHorizontal = true;
Area.brushVertical = false;
