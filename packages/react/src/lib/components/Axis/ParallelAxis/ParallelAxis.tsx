import { chartActions, chartSelectors, d3, IState } from "@chart-io/core";
import type { IValue } from "@chart-io/core";

import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { calculateScale } from "../../Scale/calculateScale";

// The vertical space, in pixels, reserved above the tick range for the dimension label, so label
// text doesn't collide with the topmost tick - the same purpose as `useChordLayout`'s LABEL_MARGIN
const AXIS_LABEL_MARGIN = 24;

// How wide, in pixels, the draggable brush handle is either side of the axis line
const BRUSH_HANDLE_WIDTH = 16;

export interface IParallelAxisProps {
    /**
     * The field this axis represents
     */
    dimension: string;
    /**
     * The full ordered list of dimensions on the chart, used to work out this axis' x-coordinate -
     * evenly spaced across the plot, the same position `<ParallelCoordinatesPlot>` uses for this
     * dimension's line points
     */
    dimensions: string[];
    /**
     * The number of ticks to aim for
     */
    ticks: number;
    /**
     * Formats each tick's label for a given dimension
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue, dimension: string) => string;
    /**
     * Should this axis support brush filtering? Sets `chartActions.setFilter` for this axis'
     * `dimension` with the brushed pixel extent (or clears it) - see `<ParallelCoordinatesPlot>`,
     * which reads it back via `chartSelectors.filters` to dim rows outside the selection
     * @default true
     */
    brushable?: boolean;
}

/**
 * Renders a single vertical axis of a `<ParallelCoordinates>` - its tick marks/labels (via
 * `d3.axisLeft`, the same primitive `<Axis>` uses) and its dimension label above, plus (when
 * `brushable`) a `d3.brushY` overlay used to filter rows by their value on this dimension.
 *
 * Deliberately doesn't reuse `<Axis>`/`<YAxis>`: those are built around a single scale shared by every
 * plot in the chart (registered once via `<Scale>`/`chartSelectors.scales.getScale` and rendered at a
 * fixed plot edge), whereas each `<ParallelAxis>` needs its own independently-scaled, arbitrarily
 * x-positioned scale (evenly spaced across the plot, one per dimension) plus a brush - close enough
 * in spirit to share the tick-rendering technique, but not the surrounding assumptions
 * @param  props       The set of React properties
 * @return             The ParallelAxis component
 */
export function ParallelAxis({ dimension, dimensions, ticks, tickFormat, brushable = true }: IParallelAxisProps) {
    const dispatch = useDispatch();
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const chartLabeller = useSelector((s: IState) => chartSelectors.labeller(s));
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const right = useSelector((s: IState) => chartSelectors.dimensions.plot.right(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const bottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));

    const axisTop = top + AXIS_LABEL_MARGIN;
    const axisBottom = bottom;

    const x = useMemo(
        () => d3.scalePoint<string>().domain(dimensions).range([left, right])(dimension),
        [dimensions, left, right, dimension],
    );
    const scale = useMemo(
        () => calculateScale(data, [dimension], [axisBottom, axisTop], undefined, false),
        [data, dimension, axisBottom, axisTop],
    );

    const axis = useRef<SVGGElement>(null);
    const brush = useRef<SVGGElement>(null);

    // Render the tick marks/labels using D3, the same technique <Axis> uses
    useEffect(() => {
        if (!axis.current || !scale) return;

        const d3Axis = d3
            .axisLeft(scale as d3.AxisScale<d3.AxisDomain>)
            .ticks(ticks)
            .tickFormat((tickFormat ? (value) => tickFormat(value as IValue, dimension) : undefined) as (
                value: d3.AxisDomain,
            ) => string);

        d3.select(axis.current)
            .style("color", `${theme.axis.stroke}`)
            .style("stroke-opacity", theme.axis.strokeOpacity)
            .style("stroke-width", theme.axis.strokeWidth)
            .transition()
            .duration(animationDuration)
            .call(d3Axis);
    }, [axis, scale, ticks, tickFormat, dimension, theme, animationDuration]);

    // Wire up a d3.brushY that dispatches its (pixel-space) extent straight to the store, rather than
    // via a prop callback - <ParallelCoordinatesPlot> reads it back independently to dim rows outside
    // the selection, so no direct coupling between the axes and the lines plot is needed
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
                dispatch(chartActions.setFilter({ field: dimension, value: extent }));
            });

        d3.select(brush.current).call(brushY);

        return () => {
            // Remove the brush's own event listeners before the group is torn down/rebuilt, and clear
            // any filter it left behind so a remounted/removed axis doesn't leave rows stuck dimmed
            d3.select(brush.current).on(".brush", null);
            dispatch(chartActions.setFilter({ field: dimension, value: null }));
        };
    }, [brush, brushable, axisTop, axisBottom, dimension, dispatch]);

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
                {chartLabeller(dimension)}
            </text>
            <g ref={axis} className="parallel-coordinates-axis-ticks" style={{ userSelect: "none" }} />
            {brushable ? <g ref={brush} className="parallel-coordinates-axis-brush" /> : null}
        </g>
    );
}
