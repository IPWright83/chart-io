import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";

import { IWordCloudPlotProps, WordCloudPlot } from "./WordCloudPlot";

export interface IWordCloudProps
    extends Omit<IChartProps, "children">,
        Omit<IWordCloudPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a WordCloud chart, sizing each word in the dataset's `category` field proportionally to
 * `value` and packing them - largest first, working outward from the center - into the available
 * space without overlapping. A self-contained chart: no need to wrap it in another chart component
 * yourself
 * @param  props       The set of React properties
 * @return             The WordCloud component
 */
export const WordCloud = forwardRef<IChartRef, IWordCloudProps>(
    (
        {
            category,
            value,
            minFontSize,
            maxFontSize,
            padding,
            fontFamily,
            rotate,
            colors,
            measureText,
            showInLegend,
            interactive,
            ...chartProps
        },
        ref,
    ) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <WordCloudPlot
                    category={category}
                    value={value}
                    minFontSize={minFontSize}
                    maxFontSize={maxFontSize}
                    padding={padding}
                    fontFamily={fontFamily}
                    rotate={rotate}
                    colors={colors}
                    measureText={measureText}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
            </Chart>
        );
    },
);

WordCloud.displayName = "WordCloud";
