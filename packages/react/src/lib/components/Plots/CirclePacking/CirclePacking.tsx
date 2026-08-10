import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";
import { ZoomBreadcrumb } from "../../ZoomBreadcrumb";
import { SetZoomable } from "../SetZoomable";

import { CirclePackingPlot, ICirclePackingPlotProps } from "./CirclePackingPlot";

export interface ICirclePackingProps
    extends Omit<IChartProps, "children">,
        Omit<ICirclePackingPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {
    /**
     * Should a click on a non-leaf node zoom in and refocus on its subtree?
     * @default false
     */
    zoomable?: boolean;
    /**
     * Shows the current zoom path as a clickable breadcrumb trail, letting the user jump back to any
     * ancestor level. Only meaningful alongside `zoomable` - renders nothing while fully zoomed out
     * @default false
     */
    breadcrumb?: boolean;
}

/**
 * Represents a CirclePacking chart, nesting a circle per node of the hierarchy built from the fields
 * listed in `categories` inside its parent's circle, each sized proportionally to `value`. A
 * self-contained chart: no need to wrap it in another chart component yourself. Set `zoomable` to let
 * a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the
 * current zoom path as a clickable trail
 * @param  props       The set of React properties
 * @return             The CirclePacking component
 */
export const CirclePacking = forwardRef<IChartRef, ICirclePackingProps>(
    (
        {
            categories,
            value,
            padding,
            sort,
            colors,
            buildHierarchy,
            labels,
            showInLegend,
            interactive,
            zoomable = false,
            breadcrumb = false,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <SetZoomable zoomable={zoomable} />
                <CirclePackingPlot
                    categories={categories}
                    value={value}
                    padding={padding}
                    sort={sort}
                    colors={colors}
                    buildHierarchy={buildHierarchy}
                    labels={labels}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
                {breadcrumb && <ZoomBreadcrumb />}
            </Chart>
        );
    },
);

CirclePacking.displayName = "CirclePacking";
