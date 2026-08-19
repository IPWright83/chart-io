import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IScale, IValue } from "@chart-io/core";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// How wide, in pixels, the draggable brush handle is either side of the axis line
const BRUSH_HANDLE_WIDTH = 16;

export interface IParallelCoordinatesAxisProps {
    /**
     * The field this axis represents
     */
    dimension: string;
    /**
     * This axis' x-coordinate, shared by its ticks, label and brush
     */
    x: number;
    /**
     * This dimension's independently computed scale, mapping its values onto `[axisBottom, axisTop]`
     */
    scale: IScale;
    /**
     * The pixel y-coordinate of the top of the tick range, leaving room for the label above it
     */
    axisTop: number;
    /**
     * The pixel y-coordinate of the bottom of the tick range
     */
    axisBottom: number;
    /**
     * The number of ticks to aim for
     */
    ticks: number;
    /**
     * Formats each tick's label
     */
    tickFormat?: (value: IValue) => string;
    /**
     * The dimension's display label, shown above the axis
     */
    label: string;
    /**
     * Should this axis support brush filtering?
     */
    brushable: boolean;
    /**
     * Called whenever this axis' brush selection changes (including being cleared)
     */
    onBrushChange: (dimension: string, extent: [number, number] | null) => void;
}

/**
 * Renders a single vertical axis of a `<ParallelCoordinates>` - its tick marks/labels (via
 * `d3.axisLeft`, the same primitive `<Axis>` uses), its dimension label above, and (when `brushable`)
 * a `d3.brushY` overlay used to filter rows by their value on this dimension. Always rendered as SVG
 * regardless of the plot's `useCanvas`, since the brush needs real DOM elements to drag - the same
 * reason `<HorizontalZoomBrush>` renders its brush outside of any Canvas layer
 * @param  props       The set of React properties
 * @return             The ParallelCoordinatesAxis component
 */
export function ParallelCoordinatesAxis({
    dimension,
    x,
    scale,
    axisTop,
    axisBottom,
    ticks,
    tickFormat,
    label,
    brushable,
    onBrushChange,
}: IParallelCoordinatesAxisProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const axis = useRef<SVGGElement>(null);
    const brush = useRef<SVGGElement>(null);

    // Render the tick marks/labels using D3, the same technique <Axis> uses
    useEffect(() => {
        if (!axis.current || !scale) return;

        const d3Axis = d3
            .axisLeft(scale as d3.AxisScale<d3.AxisDomain>)
            .ticks(ticks)
            .tickFormat(tickFormat as (value: d3.AxisDomain) => string);

        d3.select(axis.current)
            .style("color", `${theme.axis.stroke}`)
            .style("stroke-opacity", theme.axis.strokeOpacity)
            .style("stroke-width", theme.axis.strokeWidth)
            .transition()
            .duration(animationDuration)
            .call(d3Axis);
    }, [axis, scale, ticks, tickFormat, theme, animationDuration]);

    // Wire up a d3.brushY that reports its (pixel-space) extent back to the parent, which uses it to
    // dim rows that fall outside every brushed axis - see useParallelCoordinatesLayout/isSelected
    useEffect(() => {
        if (!brush.current || !brushable) return;

        const brushY = d3
            .brushY()
            .extent([
                [-BRUSH_HANDLE_WIDTH / 2, axisTop],
                [BRUSH_HANDLE_WIDTH / 2, axisBottom],
            ])
            .on("brush end", (event) => {
                const extent = event.selection as [number, number] | null;
                onBrushChange(dimension, extent);
            });

        d3.select(brush.current).call(brushY);

        return () => {
            // Remove the brush's own event listeners before the group is torn down/rebuilt
            d3.select(brush.current).on(".brush", null);
        };
    }, [brush, brushable, axisTop, axisBottom, dimension, onBrushChange]);

    return (
        <g className="parallel-coordinates-axis" transform={`translate(${x}, 0)`}>
            <text
                className="parallel-coordinates-axis-label"
                x={0}
                y={axisTop - 8}
                textAnchor="middle"
                style={{
                    fill: `${theme.label.color}`,
                    fontSize: theme.label.fontSize,
                    fontFamily: theme.label.fontFamily,
                    userSelect: "none",
                }}
            >
                {label}
            </text>
            <g ref={axis} className="parallel-coordinates-axis-ticks" style={{ userSelect: "none" }} />
            {brushable ? <g ref={brush} className="parallel-coordinates-axis-brush" /> : null}
        </g>
    );
}
