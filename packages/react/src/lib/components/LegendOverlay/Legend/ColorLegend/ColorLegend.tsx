import { chartSelectors, IState } from "@chart-io/core";
import type { IColorLegend as IColorLegendData } from "@chart-io/core";

import React, { useId } from "react";
import { useSelector } from "react-redux";

export interface IColorLegendProps {
    /**
     * The color legend a plot with a continuous color scale (e.g. `<Heatmap>`) has registered with
     * the chart, describing the palette/domain to draw a gradient for
     */
    colorLegend: IColorLegendData;
}

const GRADIENT_WIDTH = 160;
const GRADIENT_HEIGHT = 10;
const LABEL_GAP = 12;
const defaultFormat = (value: number) => `${value}`;

/**
 * Renders the gradient bar at the bottom of a `<Legend>`, explaining the color encoding registered
 * by a plot with a continuous color scale (e.g. `<Heatmap>`) - labelled with the lowest and highest
 * value in its domain. Mirrors `<SizeLegend>`'s "attached at the bottom" convention: a divider line
 * separating it from the color-swatch items above, inside the same Legend box
 * @return The ColorLegend component
 */
export function ColorLegend({ colorLegend: { colors, domain, format = defaultFormat } }: IColorLegendProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const gradientId = `color-legend-gradient-${useId()}`;

    if (colors.length === 0) {
        return null;
    }

    const fill = colors.length === 1 ? `${colors[0]}` : `url(#${gradientId})`;
    const height = GRADIENT_HEIGHT + LABEL_GAP + theme.label.fontSize;

    const styles = {
        container: {
            marginTop: theme.legend.padding,
            paddingTop: theme.legend.padding,
            borderTop: `thin solid ${theme.legend.border}`,
        },
        label: {
            fill: theme.label.color?.toString(),
            fontSize: theme.label.fontSize,
            fontFamily: theme.label.fontFamily,
        },
    };

    return (
        <div className="chart-io color-legend" style={styles.container}>
            <svg width={GRADIENT_WIDTH} height={height}>
                {colors.length > 1 && (
                    <defs>
                        <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                            {colors.map((color, index) => (
                                <stop key={index} offset={`${(index / (colors.length - 1)) * 100}%`} stopColor={`${color}`} />
                            ))}
                        </linearGradient>
                    </defs>
                )}
                <rect
                    className="color-legend-gradient"
                    x={0}
                    y={0}
                    width={GRADIENT_WIDTH}
                    height={GRADIENT_HEIGHT}
                    fill={fill}
                    stroke={theme.axis.stroke?.toString()}
                    strokeOpacity={theme.axis.strokeOpacity}
                />
                <text className="color-legend-min" x={0} y={GRADIENT_HEIGHT + LABEL_GAP} textAnchor="start" style={styles.label}>
                    {format(domain[0])}
                </text>
                <text className="color-legend-max" x={GRADIENT_WIDTH} y={GRADIENT_HEIGHT + LABEL_GAP} textAnchor="end" style={styles.label}>
                    {format(domain[1])}
                </text>
            </svg>
        </div>
    );
}
