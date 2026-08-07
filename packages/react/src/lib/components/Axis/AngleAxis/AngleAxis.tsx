import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IScaleType, IValue } from "@chart-io/core";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useArray } from "../../../hooks";
import { AngleScale } from "../../Scale";

export interface IAngleAxisProps {
    /**
     * The key of the field used to build the angular (category) scale
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
     * The gap, in pixels, to leave between the outer edge of the plot and a category's label.
     * Should be large enough to clear a sibling `<RadialAxis>`'s outermost ring label too, since
     * both sit at the same radius at the top of the chart
     * @default 20
     */
    tickPadding?: number;
    /**
     * A function to format each category's label
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue) => string;
    /**
     * For a continuous `scaleType` (e.g. `"time"`/`"linear"`), the number of spokes to aim for
     * around the circle. Has no effect for a categorical (`"point"`/`"band"`) scale, which always
     * draws one spoke per category
     * @default 8
     */
    ticks?: number;
}

/**
 * Represents an AngleAxis, drawing a spoke and label for each category (or, for a continuous
 * scale, each tick) around a radial plot such as `<Radar>` or `<RadialArea>`
 * @return The AngleAxis component
 */
export function AngleAxis({
    fields,
    domain,
    scaleType,
    tickPadding = 20,
    tickFormat = (value) => `${value}`,
    ticks = 8,
}: IAngleAxisProps) {
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    return (
        <React.Fragment>
            <AxisSpoke field={field} tickPadding={tickPadding} tickFormat={tickFormat} ticks={ticks} />
            <AngleScale fields={fieldsArray} scaleType={scaleType} domain={domain} />
        </React.Fragment>
    );
}

/**
 * Renders the spokes and category labels for an AngleAxis. Kept separate from `<AngleAxis>` itself
 * since this subscribes to the resolved scale (and so re-renders whenever it's set), whereas the
 * sibling `<AngleScale>` that sets it must not, to avoid the two re-triggering one another
 * @return The visual part of the AngleAxis
 */
function AxisSpoke({
    field,
    tickPadding,
    tickFormat,
    ticks,
}: {
    field: string;
    tickPadding: number;
    tickFormat: (value: IValue) => string;
    ticks: number;
}) {
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const maxRadius = useSelector((s: IState) => chartSelectors.dimensions.plot.maxRadius(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current || !scale) {
            return;
        }

        // A continuous scale (e.g. time/linear) has no discrete categories to draw a spoke per -
        // instead draw an evenly-spaced set of ticks, the same way a linear/time XAxis/YAxis would
        const hasTicks = typeof (scale as unknown as { ticks?: unknown }).ticks === "function";
        const categories = (
            hasTicks ? (scale as unknown as { ticks: (count: number) => IValue[] }).ticks(ticks) : scale.domain()
        ) as IValue[];
        // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
        const angleOf = scale as unknown as (value: IValue) => number;

        const join = d3
            .select(layer.current)
            .selectAll(".angle-axis-tick")
            .data(categories, (d) => `${d}`);

        join.exit().remove();

        const enter = join.enter().append("g").attr("class", "angle-axis-tick");
        enter.append("line").attr("class", "angle-axis-spoke");
        enter.append("text").attr("class", "angle-axis-label");

        const update = enter.merge(join as any);

        update
            .select<SVGLineElement>("line.angle-axis-spoke")
            .style("stroke", theme.gridlines.stroke?.toString())
            .style("stroke-opacity", theme.gridlines.strokeOpacity)
            .style("stroke-width", theme.gridlines.strokeWidth)
            .attr("x1", cx)
            .attr("y1", cy)
            .transition()
            .duration(animationDuration)
            .attr("x2", (d) => cx + maxRadius * Math.sin(angleOf(d)))
            .attr("y2", (d) => cy - maxRadius * Math.cos(angleOf(d)));

        update
            .select<SVGTextElement>("text.angle-axis-label")
            .text((d) => tickFormat(d))
            .style("fill", theme.tooltip.text?.toString())
            .style("font-size", theme.font.size)
            .style("font-family", theme.font.family)
            .style("user-select", "none")
            .attr("text-anchor", (d) => {
                const sin = Math.sin(angleOf(d));
                if (Math.abs(sin) < 0.1) return "middle";
                return sin > 0 ? "start" : "end";
            })
            .attr("dominant-baseline", (d) => {
                const cos = Math.cos(angleOf(d));
                if (Math.abs(cos) < 0.1) return "middle";
                return cos > 0 ? "auto" : "hanging";
            })
            .transition()
            .duration(animationDuration)
            .attr("x", (d) => cx + (maxRadius + tickPadding) * Math.sin(angleOf(d)))
            .attr("y", (d) => cy - (maxRadius + tickPadding) * Math.cos(angleOf(d)));
    }, [field, scale, cx, cy, maxRadius, theme, animationDuration, tickPadding, tickFormat, ticks]);

    return <g className="chart-io angle-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}
