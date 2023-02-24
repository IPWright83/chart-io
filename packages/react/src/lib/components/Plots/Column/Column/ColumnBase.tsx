import { select } from "d3-selection";
import { color as d3Color } from "d3-color";
import type { Transition } from "d3-transition";
import { IEventPlotProps, IDatum, INumericValue } from "@d3-chart/types";
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
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
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
    interactive = true,
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
    const fillColor = d3Color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;

    const setTooltip = useTooltip(store.dispatch, x);

    useEffect(() => {
        if (!focused) return;

        const selection = select(focused.element).style("opacity", theme.series.selectedOpacity);
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
        const join = select(layer.current)
            .selectAll<SVGRectElement, IDatum>(".column")
            .data(data, (d) => d[x]?.toString());

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
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
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
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
            .attr("width", () => xScale.bandwidth())
            .style("fill", fillColor.toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("y", (d) => yScale(d[y] as INumericValue))
            .attr("height", (d) => yScale.range()[0] - yScale(d[y] as INumericValue));

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
