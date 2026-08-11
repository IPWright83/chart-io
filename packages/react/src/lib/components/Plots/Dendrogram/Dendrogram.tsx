import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { RadialChart } from "../../RadialChart";
import { TooltipOverlay } from "../../TooltipOverlay";
import { ZoomBreadcrumb } from "../../ZoomBreadcrumb";
import { RadialDendrogramPlot } from "../RadialDendrogram/RadialDendrogramPlot";

import { DendrogramPlot, IDendrogramPlotProps } from "./DendrogramPlot";

export interface IDendrogramProps extends Omit<IChartProps, "children">, IDendrogramPlotProps {
    /**
     * Renders the tree radiating outward from the center instead of growing left-to-right, with every
     * leaf aligned at the same radius instead of the same depth
     * @default false
     */
    radial?: boolean;
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
 * connected by links, laid out left-to-right with every leaf aligned at the same depth - or radiating
 * outward from the center with every leaf aligned at the same radius, if `radial` is set. A
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
            radial = false,
            ...chartProps
        },
        ref,
    ) => {
        const plotProps = {
            categories,
            value,
            nodeRadius,
            sort,
            colors,
            buildHierarchy,
            labels,
            showInLegend,
            interactive,
            zoomable,
        };

        if (radial) {
            return (
                <RadialChart ref={ref} breadcrumb={breadcrumb} {...chartProps}>
                    <RadialDendrogramPlot {...plotProps} />
                </RadialChart>
            );
        }

        return (
            <Chart ref={ref} {...chartProps}>
                <DendrogramPlot {...plotProps} />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
                {breadcrumb && <ZoomBreadcrumb />}
            </Chart>
        );
    },
);

Dendrogram.displayName = "Dendrogram";
