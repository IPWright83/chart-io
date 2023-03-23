import * as d3 from "@d3-chart/d3";
import type { IColor, IDatum, IEventPlotProps } from "@d3-chart/types";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import type { Transition } from "@d3-chart/d3";

import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale, ensureNoScaleOverflow, ensureValuesAreUnique } from "../../../../utils";
import { useRender } from "../../../../hooks";

import { getDropline } from "../getDropline";
import { getParentKey } from "./getParentKey";
import { renderCanvas } from "../../renderCanvas";
import { useTooltip } from "../useTooltip";

export interface IStackedColumnBaseProps extends Omit<IEventPlotProps, "y"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;

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
export function StackedColumnBase({
    x,
    ys,
    colors,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}: IStackedColumnBaseProps) {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0]));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const setTooltip = useTooltip(store.dispatch, x);

    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", theme.series.selectedOpacity);
        const dropline = getDropline(selection, xScale);
        store.dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", theme.series.opacity);
            store.dispatch(eventActions.removeDropline(dropline));
        };
    }, [store.dispatch, focused, xScale, theme.series.opacity, theme.series.selectedOpacity]);

    // prettier-ignore
    useRender(() => {
        if (ensureBandScale(xScale, "StackedColumnBase") === false) return null;
        ensureValuesAreUnique(data, x, "StackedColumnBase");
        ensureNoScaleOverflow(yScale, data, ys, "StackedColumnBase");

        // Create the stacked variant of the data
        const keys = ys;
        // @ts-ignore: TODO: Fix this
        const stackedData = d3.stack().keys(keys)(data);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        const groupJoin = d3.select(layer.current)
            .selectAll<SVGGElement, IDatum>("g")
            .data(stackedData);

        // Clean up old stacks
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".column")
            .data((d) => d);

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            .attr("x", (d) => xScale(d.data[x]))
            .attr("y", () => yScale.range()[0])
            .attr("height", 0)
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
            .attr("width", xScale.bandwidth())
            .style("fill", (d, i, elements) => {
                const key = getParentKey(elements[i]);
                return colorScale(key)?.toString();
            })
            .style("stroke", strokeColor?.toString())
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
                    fillColors: ys.map((y) => colorScale(y) as IColor),
                    ys,
                });
            })
            .on("mouseout", function (event: MouseEvent, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(d.data, this as Element, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event: MouseEvent, d) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(d.data, this as Element, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .attr("x", (d) => xScale(d.data[x]))
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
            .attr("width", xScale.bandwidth())
            .style("fill", (d, i, elements) => {
                const key = getParentKey(elements[i]);
                return colorScale(key)?.toString();
            })
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
            .attr("y", (d) => yScale(d[1]));

        // @ts-ignore: TODO: Work out how to fix this
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
