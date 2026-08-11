import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";
import { ZoomBreadcrumb } from "../../ZoomBreadcrumb";

import { ITreemapPlotProps, TreemapPlot } from "./TreemapPlot";

export interface ITreemapProps
    extends Omit<IChartProps, "children">,
        Omit<ITreemapPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {
    /**
     * Should a click on a cell zoom in and refocus on its immediate parent group?
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
 * Represents a Treemap chart, subdividing the plot area into nested rectangles built from the fields
 * listed in `categories` - one per leaf of the hierarchy - sized proportionally to `value`. A
 * self-contained chart: no need to wrap it in another chart component yourself. Set `zoomable` to let a
 * click on a cell zoom in and refocus on its immediate parent group, and `breadcrumb` to also show the
 * current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The Treemap component
 */
export const Treemap = forwardRef<IChartRef, ITreemapProps>(
    (
        {
            categories,
            value,
            padding,
            cornerRadius,
            sort,
            colors,
            buildHierarchy,
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
                <TreemapPlot
                    categories={categories}
                    value={value}
                    padding={padding}
                    cornerRadius={cornerRadius}
                    sort={sort}
                    colors={colors}
                    buildHierarchy={buildHierarchy}
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

Treemap.displayName = "Treemap";
