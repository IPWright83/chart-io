import React from "react";
import PropTypes from "prop-types";

import { EventReceiver } from "../EventReceiver";
import { Droplines } from "../Droplines";
import { Markers } from "../Markers";
import { Chart, IChartProps } from "../Chart";
import { Crosshair } from "../Crosshair";
import { TooltipOverlay } from "../TooltipOverlay";

import { shouldShowDroplines } from "./shouldShowDroplines";

export interface IXYChartProps extends IChartProps {}

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
            <TooltipOverlay />
        </Chart>
    );
}
