import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../Chart";
import { LegendOverlay } from "../LegendOverlay";
import { TooltipOverlay } from "../TooltipOverlay";

export type IPieChartProps = IChartProps;

/**
 * Represents a Pie/Donut chart. This is the polar equivalent of the `<XYChart>`, and is
 * intended to wrap `<Pie>`, `<Donut>` or `<StackedDonut>` plots
 */
export const PieChart = forwardRef<IChartRef, IPieChartProps>(({ children, ...props }, ref) => {
    return (
        <Chart ref={ref} {...props}>
            {children}
            <TooltipOverlay onlyNearest={true} />
            <LegendOverlay />
        </Chart>
    );
});

PieChart.displayName = "PieChart";
