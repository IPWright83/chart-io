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
     * a percentage), all mapped onto the same set of rings. Pass `aggregate` for a single shared
     * domain across every field instead
     */
    fields: string | Array<string>;
    /**
     * (Optional) An override of the domain to use for every field's d3 scale. If you need different
     * explicit domains per field, render multiple `<RadialAxis>`/`<RadiusScale>` instead
     */
    domain?: IValue[];
    /**
     * (Optional) An override of the type of d3 scale to use
     */
    scaleType?: IScaleType;
    /**
     * Should every field share a single aggregated domain, rather than each getting its own?
     * @default false
     */
    aggregate?: boolean;
    /**
     * The number of concentric rings to aim for
     * @default 5
     */
    ticks?: number;
    /**
     * A function to format each ring's label. Since each spoke maps its own field's domain onto the
     * same rings, the rings represent a normalized 0-1 position rather than any single field's real
     * values, so this defaults to a percentage
     * @default d3.format(".0%")
     */
    tickFormat?: (value: number) => string;
}

const defaultTickFormat = d3.format(".0%");

/**
 * Represents a RadialAxis, drawing a concentric ring and label for each value tick around a
 * radial plot such as `<Radar>`
 * @return The RadialAxis component
 */
export function RadialAxis({
    fields,
    domain,
    scaleType,
    aggregate = false,
    ticks = 5,
    tickFormat = defaultTickFormat,
}: IRadialAxisProps) {
    const fieldsArray = useArray(fields);

    return (
        <React.Fragment>
            <RadialAxisRing ticks={ticks} tickFormat={tickFormat} />
            <RadiusScale fields={fieldsArray} scaleType={scaleType} domain={domain} aggregate={aggregate} />
        </React.Fragment>
    );
}

/**
 * Renders the concentric rings and labels for a RadialAxis. Kept separate from `<RadialAxis>`
 * itself since this doesn't need to subscribe to any particular field's scale - the rings
 * represent a fixed, normalized 0-1 split of the available radius shared by every spoke - whereas
 * the sibling `<RadiusScale>` that registers each field's scale must not re-render because of it,
 * to avoid the two re-triggering one another
 * @return The visual part of the RadialAxis
 */
function RadialAxisRing({ ticks, tickFormat }: { ticks: number; tickFormat: (value: number) => string }) {
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const cx = plotLeft + plotWidth / 2;
    const cy = plotTop + plotHeight / 2;
    const maxRadius = Math.max(0, Math.min(plotWidth, plotHeight) / 2);

    const layer = useRef(null);

    useEffect(() => {
        if (!layer.current) {
            return;
        }

        // Rings are always an even, normalized [0, 1] split of the available radius - each spoke
        // maps its own field's domain onto this same [0, maxRadius] pixel range independently, so a
        // single ring doesn't correspond to one particular value when spokes have different domains
        const scale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius]);
        const tickValues = scale.ticks(ticks);

        const join = d3
            .select(layer.current)
            .selectAll(".radial-axis-tick")
            .data(tickValues, (d) => `${d}`);

        join.exit().remove();

        const enter = join.enter().append("g").attr("class", "radial-axis-tick");
        enter.append("circle").attr("class", "radial-axis-ring");
        enter.append("text").attr("class", "radial-axis-label");

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
            .attr("r", (d) => Math.max(0, scale(d)));

        update
            .select<SVGTextElement>("text.radial-axis-label")
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
    }, [layer, cx, cy, maxRadius, theme, animationDuration, ticks, tickFormat]);

    return <g className="chart-io radial-axis" ref={layer} style={{ pointerEvents: "none" }} />;
}
