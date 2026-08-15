import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";

import { ChordPlot, IChordPlotProps } from "./ChordPlot";

export interface IChordProps
    extends Omit<IChartProps, "children">,
        Omit<IChordPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a Chord chart, showing the flow between nodes (built from `source`/`target`) as ribbons
 * connecting arcs arranged around a circle, each arc sized proportionally to its node's total flow. A
 * self-contained chart: no need to wrap it in another chart component yourself
 * @param  props       The set of React properties
 * @return             The Chord component
 */
export const Chord = forwardRef<IChartRef, IChordProps>(
    (
        {
            source,
            target,
            value,
            innerRadius,
            outerRadius,
            padAngle,
            cornerRadius,
            sort,
            colors,
            labels,
            showInLegend,
            interactive,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <ChordPlot
                    source={source}
                    target={target}
                    value={value}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    padAngle={padAngle}
                    cornerRadius={cornerRadius}
                    sort={sort}
                    colors={colors}
                    labels={labels}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
            </Chart>
        );
    },
);

Chord.displayName = "Chord";
