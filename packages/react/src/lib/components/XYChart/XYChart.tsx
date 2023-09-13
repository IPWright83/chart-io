import React, { forwardRef } from "react";
import { IMargin } from "@chart-io/types";

import { Chart, IChartProps, IChartRef } from "../Chart";
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

    /**
     * The margin to apply around a zoomable brush if present
     * @default { left: 0, top: 10, right: 0, bottom: 10 }
     */
    brushMargin?: IMargin;
}

export const XYChart = forwardRef<IChartRef, IXYChartProps>((props, ref) => {
    const { children } = props;
    const showDroplines = shouldShowDroplines(children);
    const showCrosshair = !showDroplines;

    return (
        <Chart ref={ref} {...props}>
            <EventReceiver />
            <RectangleClipPath />
            {children}
            <Markers />
            {showDroplines && <Droplines />}
            {showCrosshair && <Crosshair />}
            {props.zoomBrush && (
                <ZoomBrush type={props.zoomBrush} margin={props.brushMargin}>
                    {children}
                </ZoomBrush>
            )}
            <TooltipOverlay />
            <LegendOverlay />
        </Chart>
    );
});

XYChart.displayName = "XYChart";
