import type { IEventPlotProps, IColor, IDatum } from "@d3-chart/types";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale, ensureNoScaleOverflow, ensureValuesAreUnique } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";
import { getParentKey } from "./getParentKey";

export interface IStackedBarBaseProps extends Omit<IEventPlotProps, "ys" | "x"> {
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
export function StackedBarBase({
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
}: IStackedBarBaseProps) {
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
        const dropline = getDropline(selection, yScale, false);
        store.dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", theme.series.opacity);
            store.dispatch(eventActions.removeDropline(dropline));
        };
    }, [store.dispatch, focused, yScale, theme.series.opacity, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(yScale, "StackedBar") === false) return null;
        ensureValuesAreUnique(data, y, "StackedBar");
        ensureNoScaleOverflow(xScale, data, xs, "StackedBar");

        // Create the stacked variant of the data
        const keys = xs;
        const stackedData = d3.stack().keys(keys)(data);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        const groupJoin = d3.select(layer.current).selectAll("g").data(stackedData);

        // Clean up old stacks
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".bar")
            .data((d) => d);

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", () => xScale.range()[0])
            .attr("y", (d) => yScale(d.data[y]))
            // @ts-ignore: TODO: How do we check for bandwidth?
            .attr("height", yScale.bandwidth())
            .attr("width", 0)
            .style("stroke", strokeColor.toString())
            .style("fill", (_d, i, elements) => {
                const key = getParentKey(elements[i]);
                return colorScale(key);
            })
            .style("opacity", theme.series.opacity);

        const update = join
            .merge(enter)
            .on("mouseover", function (event: MouseEvent, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(d.data, this as Element, event);
                setFocused({ element: this, event, datum: d.data });
                setTooltip({
                    datum: d.data,
                    event,
                    fillColors: xs.map((x) => colorScale(x)),
                    xs,
                });
            })
            .on("mouseout", function (event: MouseEvent, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(d.data, this as Element, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event: MouseEvent, d: { data: IDatum }) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(d.data, this as Element, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .style("fill", (_d, i, elements) => {
                const key = getParentKey(elements[i]);
                return colorScale(key);
            })
            .attr("y", (d) => yScale(d.data[y]))
            // @ts-ignore: TODO: How do we check for bandwidth?
            .attr("height", () => yScale.bandwidth())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
            .attr("x", (d) => xScale(d[0]));

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
