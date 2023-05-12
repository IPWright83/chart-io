import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { IStackedBarBaseProps, StackedBarBase } from "./StackedBarBase";

export interface IStackedBarProps extends Omit<IStackedBarBaseProps, "interactive" | "layer"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const StackedCanvasBar = withCanvas(withXYPlot<IStackedBarProps>(StackedBarBase), "plot stacked-bar");
const StackedSVGBar = withSVG(withXYPlot<IStackedBarProps>(StackedBarBase), "plot stacked-bar");

/**
 * Represents a Bar plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function StackedBar({ useCanvas = false, colors, ...props }: IStackedBarProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <StackedCanvasBar {...props} colors={palette} />;
    }

    return <StackedSVGBar {...props} colors={palette} />;
}

StackedBar.requiresVirtualCanvas = true;
StackedBar.isPlot = true;
StackedBar.brushHorizontal = false;
StackedBar.brushVertical = true;
