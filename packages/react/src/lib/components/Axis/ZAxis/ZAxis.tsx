import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IScaleType, IValue } from "@chart-io/core";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useArray } from "../../../hooks";
import { ZScale } from "../../Scale";

export interface IZAxisProps {
    /**
     * The key of the field used to build the z (size) scale - pass the same field to a
     * `<Scatter z>`/`<Scatters z>` so its circles are sized against this legend
     */
    fields: string | Array<string>;
    /**
     * (Optional) An override of the domain to use with the d3 scale
     */
    domain?: IValue[];
    /**
     * (Optional) An override of the type of d3 scale to use
     */
    scaleType?: IScaleType;
    /**
     * (Optional) An override of the pixel radius range the scale maps values onto. Keep this in
     * sync with any other `<ZAxis>`/`<ZScale>` sharing the field, so the legend's circles are drawn
     * at the same size as the series' circles they describe
     * @default [5, 25]
     */
    range?: number[];
    /**
     * The number of concentric circles to draw, each a representative value picked from the scale's
     * domain (e.g. a low/mid/high spread). Ignored when `tickValues` is provided
     * @default 3
     */
    ticks?: number;
    /**
     * (Optional) Explicit values to draw a circle for, instead of letting `ticks` pick them
     * automatically
     */
    tickValues?: IValue[];
    /**
     * A function to format each circle's value label
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue) => string;
    /**
     * Which side of the plot to anchor the legend to
     * @default "RIGHT"
     */
    horizontalPosition?: "LEFT" | "RIGHT" | "CENTER";
    /**
     * Which edge of the plot the circles share a baseline with. Circles are nested inside one
     * another growing away from this edge, largest on the outside, in the style of a New York
     * Times bubble-size legend
     * @default "BOTTOM"
     */
    verticalPosition?: "TOP" | "BOTTOM";
    /**
     * The gap, in pixels, to leave between the legend and the edges of the plot area it's anchored to
     * @default 20
     */
    padding?: number;
}

/**
 * Represents a ZAxis, drawing a legend of concentric, nested circles - one per representative
 * value - each labelled via a leader line. Used to explain the size encoding of a `<Scatter z>`/
 * `<Scatters z>`'s circles, in the style of a New York Times bubble-size legend
 * @return The ZAxis component
 */
export function ZAxis({
    fields,
    domain,
    scaleType,
    range = [5, 25],
    ticks = 3,
    tickValues,
    tickFormat,
    horizontalPosition = "RIGHT",
    verticalPosition = "BOTTOM",
    padding = 20,
}: IZAxisProps) {
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    return (
        <React.Fragment>
            <ZAxisLegend
                field={field}
                ticks={ticks}
                tickValues={tickValues}
                tickFormat={tickFormat}
                horizontalPosition={horizontalPosition}
                verticalPosition={verticalPosition}
                padding={padding}
            />
            <ZScale fields={fieldsArray} scaleType={scaleType} range={range} domain={domain} />
        </React.Fragment>
    );
}

const defaultTickFormat = (value: IValue) => `${value}`;
const LABEL_PADDING = 6;
const LEADER_LENGTH = 16;

/**
 * Renders the nested circles, leader lines and labels for a ZAxis. Kept separate from `<ZAxis>`
 * itself since this subscribes to the resolved scale (and so re-renders whenever it's set), whereas
 * the sibling `<ZScale>` that sets it must not, to avoid the two re-triggering one another
 * @return The visual part of the ZAxis
 */
function ZAxisLegend({
    field,
    ticks,
    tickValues,
    tickFormat = defaultTickFormat,
    horizontalPosition,
    verticalPosition,
    padding,
}: {
    field: string;
    ticks: number;
    tickValues: IValue[] | undefined;
    tickFormat: ((value: IValue) => string) | undefined;
    horizontalPosition: "LEFT" | "RIGHT" | "CENTER";
    verticalPosition: "TOP" | "BOTTOM";
    padding: number;
}) {
    const left = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const right = useSelector((s: IState) => chartSelectors.dimensions.plot.right(s));
    const top = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const bottom = useSelector((s: IState) => chartSelectors.dimensions.plot.bottom(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current || !scale) {
            return;
        }

        // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
        const scaleOf = scale as unknown as (value: IValue) => number;

        // A continuous scale (e.g. linear/power) has `ticks()`; a categorical scale doesn't, so
        // fall back to its raw domain values
        const hasTicks = typeof (scale as unknown as { ticks?: unknown }).ticks === "function";
        const rawValues = (
            tickValues ??
            (hasTicks ? (scale as unknown as { ticks: (count: number) => IValue[] }).ticks(ticks) : scale.domain())
        ) as IValue[];

        // Largest first, so its circle is entered/exited first and the smaller circles nest visibly
        // on top of it
        const values = [...rawValues].sort((a, b) => scaleOf(b) - scaleOf(a));

        const maxRadius = values.reduce<number>((max, d) => Math.max(max, scaleOf(d)), 0);
        const labelDirection = horizontalPosition === "LEFT" ? -1 : 1;

        const cx =
            horizontalPosition === "LEFT"
                ? left + padding + maxRadius
                : horizontalPosition === "CENTER"
                  ? (left + right) / 2
                  : right - padding - maxRadius;
        const baselineY = verticalPosition === "TOP" ? top + padding : bottom - padding;
        const leaderEndX = cx + labelDirection * (maxRadius + LEADER_LENGTH);

        // Where a circle's center sits, offset from the shared baseline by its own radius so every
        // circle's edge touches the same baseline
        const cyOf = (d: IValue) => (verticalPosition === "TOP" ? baselineY + scaleOf(d) : baselineY - scaleOf(d));
        // The circle's edge furthest from the baseline - the part that's uniquely visible above/below
        // the circles nested inside it, and so where its leader line/label anchor
        const edgeOf = (d: IValue) => (verticalPosition === "TOP" ? cyOf(d) + scaleOf(d) : cyOf(d) - scaleOf(d));

        const join = d3
            .select(layer.current)
            .selectAll(".z-axis-tick")
            .data(values, (d) => `${d}`);

        join.exit().remove();

        const enter = join.enter().append("g").attr("class", "z-axis-tick");
        // Entering circles/leaders/labels start at their final position rather than the SVG
        // attribute defaults - only pre-existing ticks moving to a new position should animate, not
        // ones appearing for the first time
        enter
            .append("circle")
            .attr("class", "z-axis-ring")
            .attr("cx", cx)
            .attr("cy", (d) => cyOf(d))
            .attr("r", (d) => Math.max(0, scaleOf(d)));
        enter
            .append("line")
            .attr("class", "z-axis-leader")
            .attr("x1", cx)
            .attr("y1", (d) => edgeOf(d))
            .attr("x2", leaderEndX)
            .attr("y2", (d) => edgeOf(d));
        enter
            .append("text")
            .attr("class", "z-axis-label")
            .attr("x", leaderEndX + labelDirection * LABEL_PADDING)
            .attr("y", (d) => edgeOf(d));

        const update = enter.merge(join as any);

        update
            .select<SVGCircleElement>("circle.z-axis-ring")
            .style("fill", "none")
            .style("stroke", theme.axis.stroke?.toString())
            .style("stroke-opacity", theme.axis.strokeOpacity)
            .style("stroke-width", theme.axis.strokeWidth)
            .attr("cx", cx)
            .transition()
            .duration(animationDuration)
            .attr("cy", (d) => cyOf(d))
            .attr("r", (d) => Math.max(0, scaleOf(d)));

        update
            .select<SVGLineElement>("line.z-axis-leader")
            .style("stroke", theme.axis.stroke?.toString())
            .style("stroke-opacity", theme.axis.strokeOpacity)
            .style("stroke-width", theme.axis.strokeWidth)
            .style("stroke-dasharray", "2,2")
            .attr("x1", cx)
            .attr("x2", leaderEndX)
            .transition()
            .duration(animationDuration)
            .attr("y1", (d) => edgeOf(d))
            .attr("y2", (d) => edgeOf(d));

        update
            .select<SVGTextElement>("text.z-axis-label")
            .text((d) => tickFormat(d))
            .style("fill", theme.label.color?.toString())
            .style("font-size", theme.label.fontSize)
            .style("font-family", theme.label.fontFamily)
            .style("user-select", "none")
            .attr("text-anchor", labelDirection === 1 ? "start" : "end")
            .attr("dominant-baseline", "middle")
            .attr("x", leaderEndX + labelDirection * LABEL_PADDING)
            .transition()
            .duration(animationDuration)
            .attr("y", (d) => edgeOf(d));
    }, [
        field,
        scale,
        left,
        right,
        top,
        bottom,
        theme,
        animationDuration,
        ticks,
        tickValues,
        tickFormat,
        horizontalPosition,
        verticalPosition,
        padding,
    ]);

    return <g className="chart-io z-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}
