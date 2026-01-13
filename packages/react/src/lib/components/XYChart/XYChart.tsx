import React from "react";

import { Chart, IChartProps } from "../Chart";
import { Crosshair } from "../Crosshair";
import { Droplines } from "../Droplines";
import { EventReceiver } from "../EventReceiver";
import { LegendOverlay } from "../LegendOverlay";
import { Markers } from "../Markers";
import { RectangleClipPath } from "../ClipPath";
import { TooltipOverlay } from "../TooltipOverlay";
import { ZoomBrush } from "../ZoomBrush";

import { shouldShowDroplines } from "./shouldShowDroplines";

export interface IXYChartProps extends IChartProps {
    /**
     * The type of zoom brush to show if any
     */
    zoomBrush?: "inline" | "overlay";
}

export function XYChart({ children, ...props }: IXYChartProps) {
    const showDroplines = shouldShowDroplines(children);
    const showCrosshair = !showDroplines;

    return (
        <Chart {...props}>
            <EventReceiver />
            <RectangleClipPath>{children}</RectangleClipPath>
            <Markers />
            {showDroplines && <Droplines />}
            {showCrosshair && <Crosshair />}
            {props.zoomBrush && <ZoomBrush type={props.zoomBrush}>{children}</ZoomBrush>}
            <TooltipOverlay />
            <LegendOverlay />
        </Chart>
    );
}
