import * as d3 from "@chart-io/d3";
import type { Selection, Transition } from "@chart-io/d3";
import {
    IColor,
    IDatum,
    IScale,
    IEventPlotProps,
    INumericValue,
    IData,
    ITheme,
    IOnClick,
    IOnMouseOut,
    IOnMouseOver,
    IBandwidthScale,
} from "@chart-io/types";

import type { IRenderProps } from "../../types";

export interface IRenderScatterPlotProps extends IRenderProps {
    /**
     * The fixed radius to use for points. This is ignored if z is provided
     */
    radius: number;
    /**
     * The color of each data point
     */
    fillColor: IColor;
    /**
     * The color of the stroke for each data point
     */
    strokeColor: IColor;
    /**
     * A function that will be triggered when the mouse focuses on an element, designed to trigger markers & droplines
     */
    onFocus?: ({ datum, element, event }: { datum: IDatum; element: Element; event: any }) => void;
    /**
     * A function that will be triggered when the mouse focuses on an element, designed to trigger tooltips
     */
    onTooltip?: ({ datum, event, fillColor }: { datum: IDatum; event: any; fillColor: IColor }) => void;
    /**
     * The optional key of the field used for the relative z size. This overrides the radius
     */
    z?: string;
    /**
     * The scale to use for the ZAxis
     */
    zScale?: IScale;
}

/**
 * Helper function to render a ScatterPlot
 */
export function render({
    x,
    y,
    z,
    interactive,
    layer,
    onMouseOver,
    onMouseOut,
    onClick,
    onFocus,
    onTooltip,
    xScale,
    yScale,
    zScale,
    radius,
    data,
    animationDuration,
    strokeColor,
    fillColor,
    theme,
}: IRenderScatterPlotProps) {
    if (!layer) {
        return;
    }

    const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;

    // D3 data join
    // prettier-ignore
    const join = d3.select(layer)
            .selectAll("circle")
            .data(data.filter((d) => d[y] !== null && d[y] !== undefined)) as Selection<SVGCircleElement, IDatum, Element, unknown>;

    // Exit points
    // prettier-ignore
    const exit = join
            .exit()
            .transition("scatter")
            .duration(animationDuration)
            .attr("r", 0)
            .remove();

    // Enter in new points
    const enter = join
        .enter()
        .append("circle")
        .attr("class", "scatter-point")
        .attr("cx", (d) => xScale(d[x] as INumericValue) + bandwidth)
        .attr("cy", (d) => yScale(d[y] as INumericValue))
        .attr("r", 0)
        .style("stroke", () => strokeColor.toString())
        .style("fill", () => fillColor.toString())
        .style("opacity", theme.series.opacity);

    // Update new and existing points
    const update = enter // @ts-ignore
        .merge(join)
        .on("mouseover", function (event, datum) {
            if (!interactive) return;

            onMouseOver && onMouseOver(datum, this, event);
            onTooltip && onTooltip({ datum, event, fillColor: fillColor as unknown as IColor });
            onFocus && onFocus({ element: this, event, datum });
        })
        .on("mouseout", function (event, datum) {
            if (!interactive) return;

            onMouseOut && onMouseOut(datum, this, event);
            onTooltip && onTooltip(null);
            onFocus && onFocus(null);
        })
        .on("click", function (event, datum) {
            if (!interactive) return;

            onClick && onClick(datum, this, event);
        })
        .transition("scatter")
        .duration(animationDuration)
        .attr("cx", (d) => xScale(d[x] as INumericValue) + bandwidth)
        .attr("cy", (d) => yScale(d[y] as INumericValue))
        .attr("r", (d) => (z ? zScale(d[z] as INumericValue) : radius))
        .style("fill", () => fillColor.toString());

    return { update, exit };
}
