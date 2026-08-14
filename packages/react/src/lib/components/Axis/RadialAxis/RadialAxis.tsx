import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IScaleType, IValue } from "@chart-io/core";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useArray } from "../../../hooks";
import { RadiusScale } from "../../Scale";

export interface IRadialAxisProps {
    /**
     * The key(s) of the field(s) used to build the radial (value) scale(s) - one per spoke. Each
     * field gets its own independently computed domain (e.g. one spoke can be 1-5 while another is
     * a percentage), all mapped onto the same set of rings. See `domain`/`aggregate` for ways to put
     * multiple fields on one shared domain instead
     */
    fields: string | Array<string>;
    /**
     * (Optional) An override of the domain to use for every field's d3 scale, unchanged. Since
     * fields are otherwise scaled independently, this is how to compare multiple fields on one
     * common domain (e.g. multiple `<RadialArea>` series measured in the same units)
     */
    domain?: IValue[];
    /**
     * (Optional) An override of the type of d3 scale to use
     */
    scaleType?: IScaleType;
    /**
     * Should every field share a single domain computed from the *sum* of their values per row,
     * rather than each field getting its own independent domain? The same aggregation
     * `<XAxis>`/`<YAxis>` use for a stacked chart (e.g. `<YAxis aggregate>` sizing the scale to fit
     * a `<StackedArea>`'s stacked total). Rarely needed here, since `<Radar>`/`<RadialArea>` fields
     * are usually independent measurements rather than segments of a whole - if you just want
     * multiple fields to share one domain unchanged (not summed), pass `domain` instead
     * @default false
     */
    aggregate?: boolean;
    /**
     * The number of concentric rings to aim for
     * @default 5
     */
    ticks?: number;
    /**
     * A function to format each ring's label. When `fields` resolves to a single real scale (one
     * field, or `aggregate`), this defaults to the field's raw value. Otherwise each spoke maps its
     * own field's domain independently onto the same rings, so a ring represents a normalized 0-1
     * position rather than any single field's real values, and this defaults to a percentage instead
     * @default (value) => `${value}`, or d3.format(".0%") when normalized
     */
    tickFormat?: (value: IValue) => string;
}

// d3.format's own signature is narrower (number-like only) than the general IValue tickFormat prop
const defaultNormalizedTickFormat = d3.format(".0%") as unknown as (value: IValue) => string;
const defaultRealTickFormat = (value: IValue) => `${value}`;

/**
 * Represents a RadialAxis, drawing a concentric ring and label for each value tick around a
 * radial plot such as `<Radar>` or `<RadialArea>`
 * @return The RadialAxis component
 */
export function RadialAxis({
    fields,
    domain,
    scaleType,
    aggregate = false,
    ticks = 5,
    tickFormat,
}: IRadialAxisProps) {
    const fieldsArray = useArray(fields);

    // A single field (or an aggregate of several) resolves to one real, meaningful scale, so the
    // rings can show its actual values. With multiple independently-scaled fields (e.g. a Radar
    // with a different domain per spoke) there's no single "real" value a shared ring represents,
    // so the rings fall back to a normalized 0-1 position instead
    const realValueField = aggregate || fieldsArray.length === 1 ? fieldsArray[0] : undefined;

    return (
        <React.Fragment>
            <RadialAxisRing field={realValueField} ticks={ticks} tickFormat={tickFormat} />
            <RadiusScale fields={fieldsArray} scaleType={scaleType} domain={domain} aggregate={aggregate} />
        </React.Fragment>
    );
}

/**
 * Renders the concentric rings and labels for a RadialAxis. Kept separate from `<RadialAxis>`
 * itself since this subscribes to the resolved scale (and so re-renders whenever it's set), whereas
 * the sibling `<RadiusScale>` that sets it must not, to avoid the two re-triggering one another
 * @return The visual part of the RadialAxis
 */
function RadialAxisRing({
    field,
    ticks,
    tickFormat,
}: {
    field: string | undefined;
    ticks: number;
    tickFormat: ((value: IValue) => string) | undefined;
}) {
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const maxRadius = useSelector((s: IState) => chartSelectors.dimensions.plot.maxRadius(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    // Only subscribed to when a single real scale applies - see `realValueField` above
    const fieldScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field ?? "", "plot"));

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current) {
            return;
        }

        // Without a single real field scale, rings are an even, normalized [0, 1] split of the
        // available radius - each spoke maps its own field's domain onto this same range
        // independently, so a single ring doesn't correspond to one particular value
        const scale = field && fieldScale ? fieldScale : d3.scaleLinear().domain([0, 1]).range([0, maxRadius]);
        const format = tickFormat ?? (field ? defaultRealTickFormat : defaultNormalizedTickFormat);

        if (field && !fieldScale) {
            d3.select(layer.current).selectAll("*").remove();
            return;
        }

        // A continuous scale (e.g. time/linear) has `ticks()`; a categorical (band/point) scale
        // doesn't, so fall back to its raw domain values
        const tickValues =
            typeof (scale as unknown as { ticks?: unknown }).ticks === "function"
                ? (scale as unknown as { ticks: (count: number) => IValue[] }).ticks(ticks)
                : (scale.domain() as IValue[]);

        // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
        const scaleOf = scale as unknown as (value: IValue) => number;

        const join = d3
            .select(layer.current)
            .selectAll(".radial-axis-tick")
            .data(tickValues, (d) => `${d}`);

        join.exit().remove();

        const enter = join.enter().append("g").attr("class", "radial-axis-tick");
        // Entering rings/labels start at their final position rather than the SVG attribute
        // defaults (r=0, x=0/y=0) - only pre-existing ticks that are moving to a new position
        // should animate, not ones appearing for the first time
        enter
            .append("circle")
            .attr("class", "radial-axis-ring")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", (d) => Math.max(0, scaleOf(d)));
        enter
            .append("text")
            .attr("class", "radial-axis-label")
            .attr("x", cx)
            .attr("y", (d) => cy - Math.max(0, scaleOf(d)));

        const update = enter.merge(join as any);

        update
            .select<SVGCircleElement>("circle.radial-axis-ring")
            .style("fill", "none")
            .style("stroke", theme.gridlines.stroke?.toString())
            .style("stroke-opacity", theme.gridlines.strokeOpacity)
            .style("stroke-width", theme.gridlines.strokeWidth)
            .attr("cx", cx)
            .attr("cy", cy)
            .transition()
            .duration(animationDuration)
            .attr("r", (d) => Math.max(0, scaleOf(d)));

        update
            .select<SVGTextElement>("text.radial-axis-label")
            .text((d) => format(d))
            .style("fill", theme.tooltip.text?.toString())
            .style("font-size", theme.font.size * 0.85)
            .style("font-family", theme.font.family)
            .style("user-select", "none")
            .attr("text-anchor", "middle")
            .attr("x", cx)
            .transition()
            .duration(animationDuration)
            .attr("y", (d) => cy - Math.max(0, scaleOf(d)));
    }, [layer, cx, cy, maxRadius, theme, animationDuration, ticks, tickFormat, field, fieldScale]);

    return <g className="chart-io radial-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}
