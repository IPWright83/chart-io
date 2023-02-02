import { IEventPlotProps, IDatum } from "@d3-chart/types";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useStore, useSelector } from "react-redux";

import { useRender } from "../../../../hooks";
import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale, ensureValuesAreUnique } from "../../../../utils";

import { renderCanvas } from "../../renderCanvas";
import { getDropline } from "../getDropline";
import { useTooltip } from "../useTooltip";

export interface IColumnBaseProps extends IEventPlotProps {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function ColumnBase({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    color,
    interactive,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}: IColumnBaseProps) {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const fillColor = d3.color(color || theme.series.colors[0]);
    fillColor.opacity = theme.series.opacity;

    const setTooltip = useTooltip(store.dispatch, x);

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
    }, [store.dispatch, focused, xScale, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(xScale, "Column") === false) return null;
        ensureValuesAreUnique(data, x, "Column");

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll(".column")
            .data(data, (d) => d[x]) as d3.Selection<SVGRectElement, IDatum, Element, unknown>;

        // Exit bars
        join.exit().remove();

        // Enter bars
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "column")
            // @ts-ignore: TODO: Need to work out casting
            .attr("x", (d) => xScale(d[x]))
            .attr("y", () => yScale.range()[0])
            // @ts-ignore: TODO: How do we check for bandwidth?
            .attr("width", () => xScale.bandwidth())
            .attr("height", 0)
            .style("stroke", strokeColor.toString())
            .style("fill", fillColor.toString());

        // Update new and existing points
        const update = enter
            .merge(join)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setFocused({ element: this, event, datum });
                setTooltip({ datum, event, fillColors: [fillColor], ys: [y] });
            })
            .on("mouseout", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this, event);
                setFocused(null);
                setTooltip(null);
            })
            .on("click", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(datum, this, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            // @ts-ignore: TODO: Need to work out casting
            .attr("x", (d) => xScale(d[x]))
            // @ts-ignore: TODO: How do we check for bandwidth?
            .attr("width", () => xScale.bandwidth())
            .style("fill", fillColor.toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            // @ts-ignore: TODO: Need to work out casting
            .attr("y", (d) => yScale(d[y]))
            // @ts-ignore: TODO: Need to work out casting
            .attr("height", (d) => yScale.range()[0] - yScale(d[y]));

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        xScale,
        yScale,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        color,
        height,
        width,
    ]);

    return null;
}
