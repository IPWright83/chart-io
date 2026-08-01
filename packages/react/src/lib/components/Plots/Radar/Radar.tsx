import { chartSelectors, IState } from "@chart-io/core";
import type { IColor } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import type { IRadarSeriesProps } from "./RadarSeries";
import { RadarSeries } from "./RadarSeries";

export interface IRadarProps extends Omit<IRadarSeriesProps, "y" | "color"> {
    /**
     * The keys of the fields used for the radial (value) position of each series
     */
    ys: string[];
    /**
     * The set of colors to use for each series. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Radar plot: one closed polygon per field in `ys`, sharing the same angular
 * (category) scale. Requires an `<AngleAxis>` and `<RadiusAxis>` to be present to provide the
 * angular/radial scales
 * @param  props       The set of React properties
 * @return             The Radar plot component
 */
export function Radar({ ys, colors, ...props }: IRadarProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors ?? theme.series.colors;

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <RadarSeries {...props} key={y} y={y} color={palette[i % palette.length]} />
            ))}
        </React.Fragment>
    );
}

Radar.requiresVirtualCanvas = true;
Radar.isPlot = true;
