import { chartSelectors, IState } from "@chart-io/core";
import type { ISizeLegend as ISizeLegendData, IValue } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

export interface ISizeLegendProps {
    /**
     * The size legend a `<ZAxis>` has registered with the chart, describing the field/ticks to draw
     */
    sizeLegend: ISizeLegendData;
}

const PADDING = 4;
const LEADER_LENGTH = 14;
const LABEL_GAP = 4;
// Scales up the diagram's own circles, independent of the scale's real radius range, so the
// legend reads clearly without changing the size of any actual data point
const SIZE_SCALE = 1.3;
// The leader lines are dashed guides rather than data ink, so they're drawn lighter than the
// circles they connect to their labels
const LEADER_OPACITY = 0.35;
// A rough average glyph width, as a fraction of font size, used to reserve enough room for the
// labels without measuring the actual rendered text (which needs the element mounted in the DOM
// first). Deliberately generous - a slightly wider box reads better than clipped/escaping text
const AVERAGE_CHAR_WIDTH_RATIO = 0.68;
const defaultTickFormat = (value: IValue) => `${value}`;

/**
 * Renders the nested-circle diagram at the bottom of a `<Legend>`, explaining the size (`z`)
 * encoding registered by a `<ZAxis>` - one circle per representative value, all sharing a baseline,
 * each labelled via a leader line
 * @return The SizeLegend component, or null while its scale isn't resolved yet
 */
export function SizeLegend({ sizeLegend: { field, ticks = 3, tickValues, tickFormat = defaultTickFormat } }: ISizeLegendProps) {
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const labeller = useSelector((s: IState) => chartSelectors.labeller(s));
    const items = useSelector((s: IState) => chartSelectors.legend.items(s));

    if (!scale) {
        return null;
    }

    // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
    const scaleOf = scale as unknown as (value: IValue) => number;

    // A continuous scale (e.g. linear/power) has `ticks()`; a categorical scale doesn't, so fall
    // back to its raw domain values
    const hasTicks = typeof (scale as unknown as { ticks?: unknown }).ticks === "function";
    const rawValues = (
        tickValues ??
        (hasTicks ? (scale as unknown as { ticks: (count: number) => IValue[] }).ticks(ticks) : scale.domain())
    ) as IValue[];

    // Largest first, so it's drawn behind the smaller circles nested inside it
    const values = [...rawValues].sort((a, b) => scaleOf(b) - scaleOf(a));

    if (values.length === 0) {
        return null;
    }

    // Borrow the color of the first series actually plotted against this scale (e.g. a
    // `<Scatter z>`) instead of a fixed axis color, so the legend visually ties back to its series.
    // Falls back to the axis color if nothing has registered against this field yet
    const stroke = (items.find((item) => item.zField === field)?.color ?? theme.axis.stroke)?.toString();

    const maxRadius = values.reduce<number>((max, d) => Math.max(max, Math.max(0, scaleOf(d))), 0) * SIZE_SCALE;
    const cx = PADDING + maxRadius;
    const baselineY = PADDING + maxRadius * 2;
    const leaderEndX = cx + maxRadius + LEADER_LENGTH;
    const height = baselineY + PADDING;

    // Reserve enough width for the longest label so it's never clipped or left overflowing outside
    // the Legend's own box
    const longestLabelLength = values.reduce<number>((max, value) => Math.max(max, tickFormat(value).length), 0);
    const labelWidth = longestLabelLength * theme.label.fontSize * AVERAGE_CHAR_WIDTH_RATIO;
    const width = leaderEndX + LABEL_GAP + labelWidth;

    const styles = {
        container: {
            marginTop: theme.legend.padding,
            paddingTop: theme.legend.padding,
            borderTop: `thin solid ${theme.legend.border}`,
        },
        title: {
            color: theme.tooltip.text?.toString(),
            fontSize: theme.font.size,
            fontFamily: theme.font.family,
            marginBottom: 4,
        },
        label: {
            fill: theme.label.color?.toString(),
            fontSize: theme.label.fontSize,
            fontFamily: theme.label.fontFamily,
        },
    };

    return (
        <div className="chart-io size-legend" style={styles.container}>
            <div className="chart-io size-legend-title" style={styles.title}>
                {labeller(field)}
            </div>
            <svg width={width} height={height}>
                {values.map((value) => {
                    const r = Math.max(0, scaleOf(value)) * SIZE_SCALE;
                    const cy = baselineY - r;
                    const edgeY = cy - r;

                    return (
                        <g key={`${value}`} className="size-legend-tick">
                            <circle
                                className="size-legend-ring"
                                cx={cx}
                                cy={cy}
                                r={r}
                                fill="none"
                                stroke={stroke}
                                strokeOpacity={theme.axis.strokeOpacity}
                                strokeWidth={theme.axis.strokeWidth}
                            />
                            <line
                                className="size-legend-leader"
                                x1={cx}
                                y1={edgeY}
                                x2={leaderEndX}
                                y2={edgeY}
                                stroke={stroke}
                                strokeOpacity={LEADER_OPACITY}
                                strokeWidth={theme.axis.strokeWidth}
                                strokeDasharray="2,2"
                            />
                            <text
                                className="size-legend-label"
                                x={leaderEndX + LABEL_GAP}
                                y={edgeY}
                                dominantBaseline="middle"
                                style={styles.label}
                            >
                                {tickFormat(value)}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
