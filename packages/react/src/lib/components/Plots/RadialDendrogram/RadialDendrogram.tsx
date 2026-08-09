import React, { forwardRef } from "react";

import { IChartRef } from "../../Chart";
import { IRadialChartProps, RadialChart } from "../../RadialChart";

import { IRadialDendrogramPlotProps, RadialDendrogramPlot } from "./RadialDendrogramPlot";

export interface IRadialDendrogramProps
    extends Omit<IRadialChartProps, "children">,
        Omit<IRadialDendrogramPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a RadialDendrogram chart, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from the fields listed in `categories`, radiating outward from the center with every leaf aligned at
 * the same radius. A self-contained chart: no need to wrap it in `<RadialChart>` yourself. Set
 * `zoomable` to let a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb`
 * to also show the current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The RadialDendrogram component
 */
export const RadialDendrogram = forwardRef<IChartRef, IRadialDendrogramProps>(
    (
        { categories, value, nodeRadius, sort, colors, buildHierarchy, labels, showInLegend, interactive, ...chartProps },
        ref,
    ) => {
        return (
            <RadialChart ref={ref} {...chartProps}>
                <RadialDendrogramPlot
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
            </RadialChart>
        );
    },
);

RadialDendrogram.displayName = "RadialDendrogram";
