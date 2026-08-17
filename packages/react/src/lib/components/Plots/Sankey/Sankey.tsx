import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";

import { ISankeyPlotProps, SankeyPlot } from "./SankeyPlot";

export interface ISankeyProps extends Omit<IChartProps, "children">, ISankeyPlotProps {}

/**
 * Represents a Sankey chart, a set of nodes built from the fields listed in `categories` arranged in
 * columns and connected by flows sized proportionally to `value`. A self-contained chart: no need to
 * wrap it in another chart component yourself
 * @param  props       The set of React properties
 * @return             The Sankey component
 */
export const Sankey = forwardRef<IChartRef, ISankeyProps>(
    (
        {
            categories,
            value,
            nodeWidth,
            nodePadding,
            cornerRadius,
            colors,
            buildSankeyGraph,
            labels,
            showInLegend,
            interactive,
            ...chartProps
        },
        ref,
    ) => {
        const plotProps = {
            categories,
            value,
            nodeWidth,
            nodePadding,
            cornerRadius,
            colors,
            buildSankeyGraph,
            labels,
            showInLegend,
            interactive,
        };

        return (
            <Chart ref={ref} {...chartProps}>
                <SankeyPlot {...plotProps} />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
            </Chart>
        );
    },
);

Sankey.displayName = "Sankey";
