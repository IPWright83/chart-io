import * as d3 from "@chart-it/d3";
import { IDatum, IEventPlotProps, INumericValue } from "@chart-it/types";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import type { Transition } from "@chart-it/d3";

import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandwidth, ensureValuesAreUnique, getBandwidthAndOffset } from "../../../../utils";
import { useLegendItem, useRender } from "../../../../hooks";

import { getDropline } from "../getDropline";
import { renderCanvas } from "../../renderCanvas";
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
    scaleMode = "plot",
    showInLegend = true,
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
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const strokeColor = theme.background;
    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;

    useLegendItem(y, "square", showInLegend, fillColor);
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
        const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

        if (ensureBandwidth(bandwidth, "Column") === false) return null;
        ensureValuesAreUnique(data, x, "Column");

        // D3 data join
        const join = d3
            .select(layer.current)
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
            .attr("x", (d) => xScale(d[x]) - offset)
            .attr("y", yScale.range()[0])
            .attr("width", bandwidth)
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
            .attr("x", (d) => xScale(d[x]) - offset)
            .style("fill", fillColor.toString())
            .attr("width", bandwidth)
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
