import React from "react";

import { Chart, IChartProps } from "../Chart";
import { Crosshair } from "../Crosshair";
import { Droplines } from "../Droplines";
import { EventReceiver } from "../EventReceiver";
import { LegendOverlay } from "../LegendOverlay";
import { Markers } from "../Markers";
import { TooltipOverlay } from "../TooltipOverlay";
import { Brush } from "../Brush";

import { shouldShowDroplines } from "./shouldShowDroplines";

export type IXYChartProps = IChartProps;

export function XYChart({ children, ...props }: IXYChartProps) {
    const showDroplines = shouldShowDroplines(children);
    const showCrosshair = !showDroplines;

    return (
        <Chart {...props}>
            <EventReceiver />
            {children}
            <Markers />
            {showDroplines && <Droplines />}
            {showCrosshair && <Crosshair />}
            <Brush>{children}</Brush>
            <TooltipOverlay />
            <LegendOverlay />
        </Chart>
    );
}
