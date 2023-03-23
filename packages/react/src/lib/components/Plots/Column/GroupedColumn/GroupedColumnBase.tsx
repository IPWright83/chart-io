import * as d3 from "@d3-chart/d3";
import type { IColor, IDatum, IEventPlotProps, INumericValue } from "@d3-chart/types";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import type { Transition } from "@d3-chart/d3";

import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale } from "../../../../utils";
import { useRender } from "../../../../hooks";

import { getDropline } from "../getDropline";
import { renderCanvas } from "../../renderCanvas";
import { useTooltip } from "../useTooltip";

export interface IGroupedColumnBaseProps extends Omit<IEventPlotProps, "y"> {
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
 * Represents a Groupled Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedColumnBase({
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
}: IGroupedColumnBaseProps) {
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

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element).style("opacity", theme.series.selectedOpacity);
        const dropline = getDropline(selection, xScale, true);
        store.dispatch(eventActions.addDropline(dropline));

        // Clean up operations on exit
        return () => {
            selection.style("opacity", theme.series.opacity);
            store.dispatch(eventActions.removeDropline(dropline));
        };
    }, [store.dispatch, focused, xScale, theme.series.opacity, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(xScale, "GroupedColumn") === false) return null;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(ys).range(colors);
        // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
        const x1Scale = d3.scaleBand().domain(ys).rangeRound([0, xScale.bandwidth()]).padding(0.05);

        // prettier-ignore
        const groupJoin = d3.select(layer.current)
            .selectAll<SVGGElement, IDatum>("g")
            .data(data);

        // Clean up old groups
        groupJoin.exit().remove();

        const join = groupJoin
            .enter()
            .append("g")
            .merge(groupJoin)
            .selectAll(".column")
            .data((d) => ys.map((y) => ({ ...d, key: y, value: d[y] })));

        join.exit().remove();
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            .attr("x", (d) => xScale(d[x]) + x1Scale(d.key))
            .attr("y", () => yScale.range()[0])
            .attr("height", 0)
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key).toString())
            .style("stroke", strokeColor.toString())
            .style("opacity", theme.series.opacity);

        // prettier-ignore
        const update = join
            .merge(enter)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this as Element, event);
                setFocused({ element: this, event, datum });
                setTooltip({ datum, event, fillColors: [colorScale(datum.key) as IColor], ys: [datum.key] });
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
            .attr("x", (d) => xScale(d[x]) + x1Scale(d.key))
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key).toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("height", (d) => yScale.range()[0] - yScale(d.value as INumericValue))
            .attr("y", (d) => yScale(d.value as INumericValue));

        // @ts-ignore: TODO: Work out how to fix this
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
