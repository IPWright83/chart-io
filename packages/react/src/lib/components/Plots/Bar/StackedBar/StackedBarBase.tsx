import * as d3 from "@chart-it/d3";
import type { IColor, IDatum, IEventPlotProps } from "@chart-it/types";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import type { Transition } from "@chart-it/d3";

import { chartSelectors, eventActions, IState } from "../../../../store";
import {
    ensureBandwidth,
    ensureNoScaleOverflow,
    ensureValuesAreUnique,
    getBandwidthAndOffset,
} from "../../../../utils";
import { useLegendItems, useRender } from "../../../../hooks";

import { getDropline } from "../getDropline";
import { getParentKey } from "./getParentKey";
import { renderCanvas } from "../../renderCanvas";
import { useTooltip } from "../useTooltip";

export interface IStackedBarBaseProps extends Omit<IEventPlotProps, "ys" | "x"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
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
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
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
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, xs[0], scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const setTooltip = useTooltip(store.dispatch, y);

    useLegendItems(xs, "square", showInLegend, colors);

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

    // prettier-ignore
    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

        if (ensureBandwidth(bandwidth, "StackedBar") === false) return null;
        ensureValuesAreUnique(data, y, "StackedBar");
        ensureNoScaleOverflow(xScale, data, xs, "StackedBar");

        // Create the stacked variant of the data
        const keys = xs;
        // @ts-ignore: TODO: Work out how to fix this
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
            // @ts-ignore: TODO: Work out how to fix this
            .merge(groupJoin)
            .selectAll(".bar")
            .data((d) => d);

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", () => xScale.range()[0])
            .attr("y", (d) => yScale(d.data[y]) - offset)
            .attr("height", bandwidth)
            .attr("width", 0)
            .style("stroke", strokeColor.toString())
            .style("fill", (d, i, elements) => {
                const key = getParentKey(elements[i]);
                return colorScale(key)?.toString();
            })
            .style("opacity", theme.series.opacity);

        // prettier-ignore
        const update = join
            .merge(enter)
            .on("mouseover", function (event: MouseEvent, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(d.data, this as Element, event);
                setFocused({ element: this, event, datum: d.data });
                setTooltip({ datum: d.data, event, fillColors: xs.map((x) => colorScale(x) as IColor), xs });
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
            .style("fill", (d, i, elements) => {
                const key = getParentKey(elements[i] as Element);
                return colorScale(key)?.toString();
            })
            .attr("y", (d) => yScale(d.data[y]) - offset)
            .attr("height", bandwidth)
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
            .attr("x", (d) => xScale(d[0]));

        // @ts-ignore: TODO: Fix this TS
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
