import React, { forwardRef } from "react";
import type { IData } from "@chart-io/core";

import { Areas, Bars, Columns, Lines, Scatters } from "../Plots";
import type { IXAxisProps, IYAxisProps } from "../Axis";
import { XAxis, YAxis } from "../Axis";
import { IChartRef } from "../Chart";
import type { IXYChartProps } from "../XYChart";
import { useArray } from "../../hooks";
import { XYChart } from "../XYChart";

import type { ISeriesConfig } from "./ISeriesConfig";

export interface IJsonChartProps {
    config: {
        /**
         * The config options for the main chart component
         */
        chart: Omit<IXYChartProps, "data">;
        /**
         * The config options for the series
         */
        series: ISeriesConfig;
        /**
         * The config options for the axis
         */
        axis: {
            /**
             * Configuration for the X-Axis
             */
            x?: IXAxisProps;
            /**
             * Configuration for the Y-Axis
             */
            y?: IYAxisProps;
        };
    };

    /**
     * The data for the chart
     */
    data?: IData;
}

/**
 * Represents an XYChart that can be configured via a serializable JSON string. It is worth noting
 * that some features (e.g. event handlers) will need to by manually applied as these can't be
 * serialised to JSON
 * @param  props        The set of React properties
 * @return              The JsonChart component
 */
export const JsonChart = forwardRef<IChartRef, IJsonChartProps>(({ config, data }: IJsonChartProps, ref) => {
    const { chart, series, axis } = config;
    const { lines, areas, scatters, bars, columns } = series;

    // Automatically determine the fields from the plots themselves
    const xPlotFields = bars?.xs;
    const yPlotFields = [...(lines?.ys ?? []), ...(areas?.ys ?? []), ...(scatters?.ys ?? []), ...(columns?.ys ?? [])];

    // Grab any explicitly set fields
    const xs = useArray(axis.x?.fields ?? xPlotFields);
    const ys = useArray(axis.y?.fields ?? yPlotFields);

    return (
        <XYChart ref={ref} data={data} {...chart}>
            {!!xs && <XAxis fields={xs} {...(axis.x ?? {})} />}
            {!!ys && <YAxis fields={ys} {...(axis.y ?? {})} />}
            {!!lines && <Lines x={xs[0]} ys={lines.ys} colors={lines.colors} interactive={lines.interactive} />}
            {!!areas && (
                <Areas
                    x={xs[0]}
                    ys={areas.ys}
                    colors={areas.colors}
                    interactive={areas.interactive}
                    stacked={areas.stacked}
                />
            )}
            {!!scatters && (
                <Scatters
                    x={xs[0]}
                    ys={scatters.ys}
                    colors={scatters.colors}
                    interactive={scatters.interactive}
                    radius={scatters.radius}
                />
            )}
            {!!columns && (
                <Columns
                    x={xs[0]}
                    ys={columns.ys}
                    colors={columns.colors}
                    interactive={columns.interactive}
                    stacked={columns.stacked}
                    grouped={columns.grouped}
                />
            )}
            {!!bars && (
                <Bars
                    xs={bars.xs}
                    y={ys[0]}
                    colors={bars.colors}
                    interactive={bars.interactive}
                    stacked={bars.stacked}
                    grouped={bars.grouped}
                />
            )}
        </XYChart>
    );
});

JsonChart.displayName = "JsonChart";
