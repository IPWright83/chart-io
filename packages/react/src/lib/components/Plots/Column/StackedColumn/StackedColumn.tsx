import { chartSelectors, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { IStackedColumnBaseProps, StackedColumnBase } from "./StackedColumnBase";

export interface IStackedColumnProps extends Omit<IStackedColumnBaseProps, "interactive" | "layer"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const StackedCanvasColumn = withCanvas(withXYPlot<IStackedColumnProps>(StackedColumnBase), "plot stacked-column");
const StackedSVGColumn = withSVG(withXYPlot<IStackedColumnProps>(StackedColumnBase), "plot stacked-column");

/**
 * Represents a Column plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function StackedColumn({ useCanvas, colors, ...props }: IStackedColumnProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <StackedCanvasColumn {...props} colors={palette} />;
    }

    return <StackedSVGColumn {...props} colors={palette} />;
}

StackedColumn.requiresVirtualCanvas = true;
StackedColumn.isPlot = true;
StackedColumn.brush = {
    horizontal: true,
    vertical: false,
};
StackedColumn.zoom = {
    horizontal: true,
    vertical: false,
};
