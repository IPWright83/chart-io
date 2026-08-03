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
     * The gap, in pixels, to leave between the outer edge of the plot and a category's label
     * @default 8
     */
    tickPadding?: number;
    /**
     * A function to format each category's label
     * @default (value) => `${value}`
     */
    tickFormat?: (value: IValue) => string;
}

/**
 * Represents an AngleAxis, drawing a spoke and label for each category around a radial plot
 * such as `<Radar>`
 * @return The AngleAxis component
 */
export function AngleAxis({
    fields,
    domain,
    scaleType,
    tickPadding = 8,
    tickFormat = (value) => `${value}`,
}: IAngleAxisProps) {
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    return (
        <React.Fragment>
            <AxisSpoke field={field} tickPadding={tickPadding} tickFormat={tickFormat} />
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
}: {
    field: string;
    tickPadding: number;
    tickFormat: (value: IValue) => string;
}) {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const scale = useSelector((s: IState) => chartSelectors.scales.getScale(s, field, "plot"));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const cx = plotLeft + plotWidth / 2;
    const cy = plotTop + plotHeight / 2;
    const maxRadius = Math.max(0, Math.min(plotWidth, plotHeight) / 2);

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current || !scale) {
            return;
        }

        const categories = scale.domain() as IValue[];
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
    }, [field, scale, cx, cy, maxRadius, theme, animationDuration, tickPadding, tickFormat]);

    return <g className="chart-io angle-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}
