import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../Chart";
import { LegendOverlay } from "../LegendOverlay";
import { TooltipOverlay } from "../TooltipOverlay";

export type IRectangularChartProps = IChartProps;

/**
 * Represents a rectangular chart, intended to wrap plots that lay themselves out within the full plot
 * area rather than against x/y scales (e.g. `<Treemap>`), so don't need axes or scales. Tooltips on
 * these plots are triggered directly per-element rather than by matching the nearest data point to the
 * mouse position, so unlike `<XYChart>`/`<RadialChart>` this doesn't include an `<EventReceiver>` or
 * `<Markers>` overlay
 */
export const RectangularChart = forwardRef<IChartRef, IRectangularChartProps>(({ children, ...props }, ref) => {
    return (
        <Chart ref={ref} {...props}>
            {children}
            <TooltipOverlay onlyNearest={true} />
            <LegendOverlay />
        </Chart>
    );
});

RectangularChart.displayName = "RectangularChart";
