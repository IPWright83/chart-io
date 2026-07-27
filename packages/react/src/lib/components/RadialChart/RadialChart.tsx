import React, { forwardRef } from "react";

import { CenterValueOverlay } from "../CenterValueOverlay";
import { Chart, IChartProps, IChartRef } from "../Chart";
import { LegendOverlay } from "../LegendOverlay";
import { TooltipOverlay } from "../TooltipOverlay";

export interface IRadialChartProps extends IChartProps {
    /**
     * Displays the hovered datapoint's name/value in the center of the chart's hole (e.g. a `<Donut>`
     * or `<StackedDonut>`) instead of in a floating Tooltip
     * @default false
     */
    centerValue?: boolean;
}

/**
 * Represents a radial chart. This is the polar equivalent of the `<XYChart>`, and is
 * intended to wrap `<Pie>`, `<Donut>` or `<StackedDonut>` plots
 */
export const RadialChart = forwardRef<IChartRef, IRadialChartProps>(({ children, centerValue = false, ...props }, ref) => {
    return (
        <Chart ref={ref} {...props}>
            {children}
            {centerValue ? <CenterValueOverlay /> : <TooltipOverlay onlyNearest={true} />}
            <LegendOverlay />
        </Chart>
    );
});

RadialChart.displayName = "RadialChart";
