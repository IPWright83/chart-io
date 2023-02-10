import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { GroupedBarBase, IGroupedBarBaseProps } from "./GroupedBarBase";

export interface IGroupedBarProps extends Omit<IGroupedBarBaseProps, "interactive" | "layer"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const GroupedCanvasBar = withCanvas(withXYPlot<IGroupedBarProps>(GroupedBarBase), "plot grouped-bar");
const GroupedSVGBar = withSVG(withXYPlot<IGroupedBarProps>(GroupedBarBase), "plot grouped-bar");

/**
 * Represents a Bar plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function GroupedBar({ useCanvas = false, colors, ...props }: IGroupedBarProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <GroupedCanvasBar {...props} colors={palette} />;
    }

    return <GroupedSVGBar {...props} colors={palette} />;
}

GroupedBar.requiresVirtualCanvas = true;
