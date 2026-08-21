import { chartSelectors, IState } from "@chart-io/core";

import React, { useId } from "react";
import { useSelector } from "react-redux";

export interface IHeatmapLegendProps {
    /**
     * Evenly spaced color stops across the value range, lowest value first
     */
    legendStops: Array<{ value: number; color: string }>;
    /**
     * A function that formats a legend value for display
     */
    format: (value: number) => string;
}

/**
 * Renders a small gradient legend for a `<Heatmap>`'s sequential color scale, labelled with its lowest
 * and highest value. Sits centered beneath the plot area - widen `plotMargin.bottom` to give it (and
 * the x-axis above it) room
 * @param  props       The set of React properties
 * @return             The HeatmapLegend component
 */
export function HeatmapLegend({ legendStops, format }: IHeatmapLegendProps) {
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotBottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const gradientId = `heatmap-legend-gradient-${useId()}`;

    if (legendStops.length === 0) {
        return null;
    }

    const legendWidth = Math.min(200, plotWidth / 2);
    const legendHeight = 10;
    const x = plotLeft + plotWidth / 2 - legendWidth / 2;
    const y = plotBottom + 30;

    return (
        <g className="heatmap-legend">
            <defs>
                <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                    {legendStops.map(({ value, color }, index) => (
                        <stop key={value} offset={`${(index / (legendStops.length - 1)) * 100}%`} stopColor={color} />
                    ))}
                </linearGradient>
            </defs>
            <rect x={x} y={y} width={legendWidth} height={legendHeight} fill={`url(#${gradientId})`} stroke={theme.axis.stroke.toString()} strokeOpacity={theme.axis.strokeOpacity} />
            <text x={x} y={y + legendHeight + 12} textAnchor="start" fontSize={theme.label.fontSize} fontFamily={theme.label.fontFamily} fill={theme.label.color.toString()}>
                {format(legendStops[0].value)}
            </text>
            <text
                x={x + legendWidth}
                y={y + legendHeight + 12}
                textAnchor="end"
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
                fill={theme.label.color.toString()}
            >
                {format(legendStops[legendStops.length - 1].value)}
            </text>
        </g>
    );
}
