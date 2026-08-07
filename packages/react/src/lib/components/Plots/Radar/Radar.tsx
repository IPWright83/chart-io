import { chartSelectors, IState } from "@chart-io/core";
import type { IColor } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import type { IRadarSeriesProps } from "./RadarSeries";
import { RadarSeries } from "./RadarSeries";

export interface IRadarProps extends Omit<IRadarSeriesProps, "name" | "seriesName" | "color"> {
    /**
     * The key of the field that identifies each series - `data` should have one row per series,
     * e.g. `{ player: "RTX 4060 Ti", "Memory Size": 16, "CUDA Cores": 4352, ... }`
     */
    name: string;
    /**
     * The set of colors to use for each series. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Radar plot: one closed polygon per row of `data` (one series per row), connecting
 * a point for each field in `ys` around a shared angular scale. Requires an `<AngleAxis>` (with
 * `domain={ys}`) and a `<RadialAxis fields={ys}>` to be present to provide the angular/radial
 * scales
 * @param  props       The set of React properties
 * @return             The Radar plot component
 */
export function Radar({ name, colors, ...props }: IRadarProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const palette = colors ?? theme.series.colors;

    return (
        <React.Fragment>
            {data.map((row, i) => (
                <RadarSeries
                    {...props}
                    key={`${row[name]}`}
                    name={name}
                    seriesName={`${row[name]}`}
                    color={palette[i % palette.length]}
                />
            ))}
        </React.Fragment>
    );
}

Radar.requiresVirtualCanvas = true;
Radar.isPlot = true;
