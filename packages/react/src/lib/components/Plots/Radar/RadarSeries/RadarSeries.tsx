import React from "react";

import { withCanvas, withRadialPlot, withSVG } from "../../../../hoc";

import { IRadarSeriesBaseProps, RadarSeriesBase } from "./RadarSeriesBase";

export interface IRadarSeriesProps
    extends Omit<IRadarSeriesBaseProps, "layer" | "canvas" | "cx" | "cy" | "maxRadius"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasRadarSeries = withCanvas(withRadialPlot<IRadarSeriesProps>(RadarSeriesBase), "plot radar-series");
const SVGRadarSeries = withSVG(withRadialPlot<IRadarSeriesProps>(RadarSeriesBase), "plot radar-series");

/**
 * Represents a single series of a Radar plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The RadarSeries plot component
 */
export function RadarSeries({ useCanvas = false, ...props }: IRadarSeriesProps) {
    if (useCanvas) {
        return <CanvasRadarSeries {...props} />;
    }

    return <SVGRadarSeries {...props} />;
}

RadarSeries.requiresVirtualCanvas = true;
RadarSeries.isPlot = true;
