import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IScaleType, IValue } from "@chart-io/core";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useArray } from "../../../hooks";
import { RadiusScale } from "../../Scale";

export interface IRadiusAxisProps {
    /**
     * The key(s) of the field(s) used to build the radial (value) scale
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
     * Whether the underlying scale should aggregate the fields
     */
    aggregate?: boolean;
    /**
     * The number of concentric rings to aim for
     * @default 5
     */
    ticks?: number;
    /**
     * A function to format each ring's label
     */
    tickFormat?: (value: IValue) => string;
}

/**
 * Renders the concentric rings and value labels for a RadiusAxis. Kept separate from
 * `<RadiusAxis>` itself since this subscribes to the resolved scale (and so re-renders whenever
 * it's set), whereas the sibling `<RadiusScale>` that sets it must not, to avoid the two
 * re-triggering one another
 * @return The visual part of the RadiusAxis
 */
function RadiusAxisRenderer({
    field,
    ticks,
    tickFormat,
}: {
    field: string;
    ticks: number;
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

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current || !scale || typeof (scale as d3.ScaleLinear<number, number>).ticks !== "function") {
            return;
        }

        const tickValues = (scale as unknown as d3.ScaleLinear<number, number>).ticks(ticks);

        const join = d3
            .select(layer.current)
            .selectAll(".radius-axis-tick")
            .data(tickValues, (d) => `${d}`);

        join.exit().remove();

        const enter = join.enter().append("g").attr("class", "radius-axis-tick");
        enter.append("circle").attr("class", "radius-axis-ring");
        enter.append("text").attr("class", "radius-axis-label");

        const update = enter.merge(join as any);

        update
            .select<SVGCircleElement>("circle.radius-axis-ring")
            .style("fill", "none")
            .style("stroke", theme.gridlines.stroke?.toString())
            .style("stroke-opacity", theme.gridlines.strokeOpacity)
            .style("stroke-width", theme.gridlines.strokeWidth)
            .attr("cx", cx)
            .attr("cy", cy)
            .transition()
            .duration(animationDuration)
            .attr("r", (d) => Math.max(0, scale(d)));

        update
            .select<SVGTextElement>("text.radius-axis-label")
            .text((d) => tickFormat(d))
            .style("fill", theme.tooltip.text?.toString())
            .style("font-size", theme.font.size * 0.85)
            .style("font-family", theme.font.family)
            .style("user-select", "none")
            .attr("text-anchor", "middle")
            .attr("x", cx)
            .transition()
            .duration(animationDuration)
            .attr("y", (d) => cy - Math.max(0, scale(d)));
    }, [field, scale, cx, cy, theme, animationDuration, ticks, tickFormat]);

    return <g className="chart-io radius-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}

/**
 * Represents a RadiusAxis, drawing a concentric ring and label for each value tick around a
 * radial plot such as `<Radar>`
 * @return The RadiusAxis component
 */
export function RadiusAxis({
    fields,
    domain,
    scaleType,
    aggregate = false,
    ticks = 5,
    tickFormat = (value) => `${value}`,
}: IRadiusAxisProps) {
    const fieldsArray = useArray(fields);
    const field = fieldsArray[0];

    return (
        <React.Fragment>
            <RadiusAxisRenderer field={field} ticks={ticks} tickFormat={tickFormat} />
            <RadiusScale fields={fieldsArray} scaleType={scaleType} domain={domain} aggregate={aggregate} />
        </React.Fragment>
    );
}
