import * as d3 from "@chart-it/d3";
import type { IDatum, IEventPlotProps, INumericValue } from "@chart-it/types";
import type { Selection, Transition } from "@chart-it/d3";

import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import { chartSelectors, eventActions, IState } from "../../../../store";
import { ensureBandScale, ensureValuesAreUnique } from "../../../../utils";
import { useLegendItem, useRender } from "../../../../hooks";

import { getDropline } from "../getDropline";
import { renderCanvas } from "../../renderCanvas";
import { useTooltip } from "../useTooltip";

export interface IBarBaseProps extends IEventPlotProps {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a Bar Plot
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function BarBase({
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
}: IBarBaseProps) {
    const [focused, setFocused] = useState(null);
    const store = useStore();

    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;
    const strokeColor = theme.background;

    useLegendItem(x, "square", showInLegend, fillColor);
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
    }, [store.dispatch, focused, yScale, theme.series.selectedOpacity]);

    useRender(() => {
        if (ensureBandScale(yScale, "Bar") === false) return null;
        ensureValuesAreUnique(data, y, "Bar");

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll(".bar")
            .data(data, (d) => d[y]) as Selection<SVGRectElement, IDatum, Element, unknown>;

        // Exit bars
        join.exit().remove();

        // Enter bars
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", () => xScale.range()[0])
            // @ts-ignore: TODO: Need to work out casting
            .attr("y", (d) => yScale(d[y]))
            .attr("width", () => 0)
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
            .attr("height", () => yScale.bandwidth())
            .style("stroke", strokeColor.toString())
            .style("fill", () => fillColor.toString());

        // Update new and existing points
        const update = enter
            .merge(join)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this, event);
                setFocused({ element: this, event, datum });
                setTooltip({ datum, event, fillColors: [fillColor], xs: [x] });
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

                onClick(datum, this, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            // @ts-ignore: How do we deal with the scale here? y is likely a string
            .attr("y", (d) => yScale(d[y]))
            // @ts-expect-error: scale.bandwidth() has already been protected against using ensureBandScale()
            .attr("height", () => yScale.bandwidth())
            .style("fill", () => fillColor.toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("width")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("x", () => xScale.range()[0])
            .attr("width", (d) => xScale(d[x] as INumericValue) - xScale.range()[0]);

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
    ]);

    return null;
}
