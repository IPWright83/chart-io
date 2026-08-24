import React, { forwardRef } from "react";

import { CenterValueOverlay } from "../CenterValueOverlay";
import { Chart, IChartProps, IChartRef } from "../Chart";
import { ContextMenuOverlay } from "../ContextMenu";
import { EventReceiver } from "../EventReceiver";
import { LegendOverlay } from "../LegendOverlay";
import { Markers } from "../Markers";
import { TooltipOverlay } from "../TooltipOverlay";
import { ZoomBreadcrumb } from "../ZoomBreadcrumb";

import { hasCenterHolePlot } from "./hasCenterHolePlot";

export interface IRadialChartProps extends IChartProps {
    /**
     * Displays the hovered datapoint's name/value in the center of the chart's hole (e.g. a `<Donut>`
     * or `<StackedDonut>`) instead of in a floating Tooltip
     * @default true if a `<Donut>` or `<StackedDonut>` child is present, false otherwise (e.g. for `<Pie>`)
     */
    centerValue?: boolean;
    /**
     * Shows the current zoom path as a clickable breadcrumb trail, letting the user jump back to any
     * ancestor level. Only meaningful alongside `zoomable` - renders nothing while fully zoomed out
     * @default false
     */
    breadcrumb?: boolean;
    /**
     * Shows a pluggable radial `<ContextMenu>` (see `<ContextMenuOverlay>`) with "Reset zoom",
     * "Pivot", "Draw polygon" and "Hide/Show legend" actions when clicking the chart. Set to `false`
     * to turn it off, e.g. if you're wiring up your own via `<ContextMenuOverlay getItems={...}>`
     * @default true
     */
    contextMenu?: boolean;
}

/**
 * Represents a radial chart. This is the polar equivalent of the `<XYChart>`, and is
 * intended to wrap `<Pie>`, `<Donut>`, `<StackedDonut>` or `<RadialDendrogramPlot>` plots
 */
export const RadialChart = forwardRef<IChartRef, IRadialChartProps>(
    ({ children, centerValue, breadcrumb = false, contextMenu = true, ...props }, ref) => {
        const showCenterValue = centerValue ?? hasCenterHolePlot(children);

        return (
            <Chart ref={ref} {...props}>
                <EventReceiver />
                {children}
                {showCenterValue ? <CenterValueOverlay /> : <TooltipOverlay onlyNearest={true} />}
                <Markers onlyNearest={true} />
                <LegendOverlay />
                {breadcrumb && <ZoomBreadcrumb />}
                {contextMenu && <ContextMenuOverlay />}
            </Chart>
        );
    },
);

RadialChart.displayName = "RadialChart";
