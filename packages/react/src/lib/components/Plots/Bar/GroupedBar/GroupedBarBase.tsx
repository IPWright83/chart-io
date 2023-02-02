import type { IEventPlotProps, IColor, IDatum } from "@d3-chart/types";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";

export interface IGroupedBarBaseProps extends Omit<IEventPlotProps, "ys" | "x"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
    /**
     * The y field to use to access the data for each plot
     */
    y: string;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedBarBase({
    xs,
    y,
    colors,
    interactive,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}: IGroupedBarBaseProps) {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, xs[0]));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const setTooltip = useTooltip(store.dispatch, y);

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", theme.series.selectedOpacity);
        const dropline = getDropline(selection, yScale, true);
        store.dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", theme.series.opacity);
            store.dispatch(eventActions.removeDropline(dropline));
        };
    }, [store.dispatch, focused, yScale, theme.series.opacity, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(yScale, "GroupedBar") === false) return null;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(xs).range(colors);
        // @ts-ignore: TODO: How do we check for bandwidth?
        const y1Scale = d3.scaleBand().domain(xs).rangeRound([0, yScale.bandwidth()]).padding(0.05);

        // prettier-ignore
        const groupJoin = d3
            .select(layer.current)
            .selectAll("g")
            .data(data) as d3.Selection<SVGRectElement, IDatum, Element, unknown>;

        // Clean up old groups
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".bar")
            .data((d) => xs.map((x) => ({ ...d, key: x, value: d[x] })));

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => yScale(d[y]) + y1Scale(d.key))
            .attr("x", () => xScale.range()[0])
            .attr("width", 0)
            .attr("height", y1Scale.bandwidth())
            .style("stroke", strokeColor)
            .style("fill", (d) => colorScale(d.key).toString())
            .style("opacity", theme.series.opacity);

        const update = join
            .merge(enter)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this as Element, event);
                setFocused({ element: this, event, datum });
                setTooltip({
                    datum,
                    event,
                    fillColors: [colorScale(datum.key)],
                    xs: [datum.key],
                });
            })
            .on("mouseout", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this as Element, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(datum, this as Element, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .attr("y", (d) => yScale(d[y]) + y1Scale(d.key))
            .attr("height", y1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key).toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            // @ts-ignore: TODO: Need to work out casting
            .attr("width", (d) => xScale(d.value) - xScale.range()[0])
            .attr("x", () => xScale.range()[0]);

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
