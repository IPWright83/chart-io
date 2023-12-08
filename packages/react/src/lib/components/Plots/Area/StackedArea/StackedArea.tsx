import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { IStackedAreaBaseProps, StackedAreaBase } from "./StackedAreaBase";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

export interface IStackedAreaProps extends Omit<IStackedAreaBaseProps, "interactive" | "layer"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const StackedCanvasArea = withCanvas(withXYPlot<IStackedAreaProps>(StackedAreaBase), "plot stacked-area");
const StackedSVGArea = withSVG(withXYPlot<IStackedAreaProps>(StackedAreaBase), "plot stacked-area");

/**
 * Represents a Column plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function StackedArea({ useCanvas = false, colors, ...props }: IStackedAreaProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <StackedCanvasArea {...props} colors={palette} />;
    }

    return <StackedSVGArea {...props} colors={palette} />;
}

StackedArea.requiresVirtualCanvas = false;
StackedArea.isPlot = true;
StackedArea.brush = {
    horizontal: true,
    vertical: false,
};
StackedArea.zoom = {
    horizontal: true,
    vertical: false,
};
