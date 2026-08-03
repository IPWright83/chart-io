import React, { forwardRef } from "react";

import { CenterValueOverlay } from "../CenterValueOverlay";
import { Chart, IChartProps, IChartRef } from "../Chart";
import { EventReceiver } from "../EventReceiver";
import { LegendOverlay } from "../LegendOverlay";
import { Markers } from "../Markers";
import { TooltipOverlay } from "../TooltipOverlay";

import { hasCenterHolePlot } from "./hasCenterHolePlot";

export interface IRadialChartProps extends IChartProps {
    /**
     * Displays the hovered datapoint's name/value in the center of the chart's hole (e.g. a `<Donut>`
     * or `<StackedDonut>`) instead of in a floating Tooltip
     * @default true if a `<Donut>` or `<StackedDonut>` child is present, false otherwise (e.g. for `<Pie>`)
     */
    centerValue?: boolean;
}

/**
 * Represents a radial chart. This is the polar equivalent of the `<XYChart>`, and is
 * intended to wrap `<Pie>`, `<Donut>` or `<StackedDonut>` plots
 */
export const RadialChart = forwardRef<IChartRef, IRadialChartProps>(({ children, centerValue, ...props }, ref) => {
    const showCenterValue = centerValue ?? hasCenterHolePlot(children);

    return (
        <Chart ref={ref} {...props}>
            <EventReceiver />
            {children}
            {showCenterValue ? <CenterValueOverlay /> : <TooltipOverlay onlyNearest={true} />}
            <Markers onlyNearest={true} />
            <LegendOverlay />
        </Chart>
    );
});

RadialChart.displayName = "RadialChart";
