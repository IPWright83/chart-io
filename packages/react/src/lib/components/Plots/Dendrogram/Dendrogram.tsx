import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";
import { ZoomBreadcrumb } from "../../ZoomBreadcrumb";

import { DendrogramPlot, IDendrogramPlotProps } from "./DendrogramPlot";

export interface IDendrogramProps
    extends Omit<IChartProps, "children">,
        Omit<IDendrogramPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {
    /**
     * Should a click on a node zoom in and refocus on its subtree?
     * @default true
     */
    zoomable?: boolean;
    /**
     * Shows the current zoom path as a clickable breadcrumb trail, letting the user jump back to any
     * ancestor level. Only meaningful alongside `zoomable` - renders nothing while fully zoomed out
     * @default true
     */
    breadcrumb?: boolean;
}

/**
 * Represents a Dendrogram chart, a tree of nodes built from the fields listed in `categories`
 * connected by links, laid out left-to-right with every leaf aligned at the same depth. A
 * self-contained chart: no need to wrap it in another chart component yourself. Set `zoomable` to let
 * a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the
 * current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The Dendrogram component
 */
export const Dendrogram = forwardRef<IChartRef, IDendrogramProps>(
    (
        {
            categories,
            value,
            nodeRadius,
            sort,
            colors,
            buildHierarchy,
            labels,
            showInLegend,
            interactive,
            zoomable = true,
            breadcrumb = true,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
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
                    zoomable={zoomable}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
                {breadcrumb && <ZoomBreadcrumb />}
            </Chart>
        );
    },
);

Dendrogram.displayName = "Dendrogram";
