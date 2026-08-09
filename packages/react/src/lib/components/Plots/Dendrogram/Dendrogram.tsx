import React, { forwardRef } from "react";

import { IChartRef } from "../../Chart";
import { IRectangularChartProps, RectangularChart } from "../../RectangularChart";

import { DendrogramPlot, IDendrogramPlotProps } from "./DendrogramPlot";

export interface IDendrogramProps
    extends Omit<IRectangularChartProps, "children">,
        Omit<IDendrogramPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a Dendrogram chart, a tree of nodes built from the fields listed in `categories`
 * connected by links, laid out left-to-right with every leaf aligned at the same depth. A
 * self-contained chart: no need to wrap it in `<RectangularChart>` yourself. Set `zoomable` to let a
 * click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the
 * current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The Dendrogram component
 */
export const Dendrogram = forwardRef<IChartRef, IDendrogramProps>(
    (
        { categories, value, nodeRadius, sort, colors, buildHierarchy, labels, showInLegend, interactive, ...chartProps },
        ref,
    ) => {
        return (
            <RectangularChart ref={ref} {...chartProps}>
                <DendrogramPlot
                    categories={categories}
                    value={value}
                    nodeRadius={nodeRadius}
                    sort={sort}
                    colors={colors}
                    buildHierarchy={buildHierarchy}
                    labels={labels}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
            </RectangularChart>
        );
    },
);

Dendrogram.displayName = "Dendrogram";
