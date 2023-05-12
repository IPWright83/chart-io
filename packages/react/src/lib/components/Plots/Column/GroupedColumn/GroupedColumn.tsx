import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../../store";
import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { GroupedColumnBase, IGroupedColumnBaseProps } from "./GroupedColumnBase";

export interface IGroupedColumnProps extends Omit<IGroupedColumnBaseProps, "interactive" | "layer"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const GroupedCanvasColumn = withCanvas(withXYPlot<IGroupedColumnProps>(GroupedColumnBase), "plot grouped-column");
const GroupedSVGColumn = withSVG(withXYPlot<IGroupedColumnProps>(GroupedColumnBase), "plot grouped-column");

/**
 * Represents a Column plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedColumn({ useCanvas = false, colors, ...props }: IGroupedColumnProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (useCanvas) {
        return <GroupedCanvasColumn {...props} colors={palette} />;
    }

    return <GroupedSVGColumn {...props} colors={palette} />;
}

GroupedColumn.requiresVirtualCanvas = true;
GroupedColumn.isPlot = true;
GroupedColumn.brushHorizontal = true;
GroupedColumn.brushVertical = false;
