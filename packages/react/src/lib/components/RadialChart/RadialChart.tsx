import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../Chart";
import { LegendOverlay } from "../LegendOverlay";
import { TooltipOverlay } from "../TooltipOverlay";

export type IRadialChartProps = IChartProps;

/**
 * Represents a radial chart. This is the polar equivalent of the `<XYChart>`, and is
 * intended to wrap `<Pie>`, `<Donut>` or `<StackedDonut>` plots
 */
export const RadialChart = forwardRef<IChartRef, IRadialChartProps>(({ children, ...props }, ref) => {
    return (
        <Chart ref={ref} {...props}>
            {children}
            <TooltipOverlay onlyNearest={true} />
            <LegendOverlay />
        </Chart>
    );
});

RadialChart.displayName = "RadialChart";
