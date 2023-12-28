import * as d3 from "@chart-io/d3";
import { IColor, IDatum, INumericValue } from "@chart-io/types";
import type { Selection } from "@chart-io/d3";

import { ensureBandwidth, ensureValuesAreUnique, getBandwidthAndOffset } from "../../utils";
import type { IRenderProps } from "../../types";

export interface IRenderBarPlotProps extends IRenderProps {
    /**
     * The color of each data point
     */
    fillColor: IColor;
    /**
     * A function that will be triggered when the mouse focuses on an element, designed to trigger markers & droplines
     */
    onFocus?: ({ datum, element, event }: { datum: IDatum; element: Element; event: any }) => void;
    /**
     * A function that will be triggered when the mouse focuses on an element, designed to trigger tooltips
     */
    onTooltip?: ({
        datum,
        event,
        fillColors,
        xs,
    }: {
        datum: IDatum;
        event: any;
        fillColors: IColor[];
        xs: Array<string>;
    }) => void;
}

/**
 * Helper function to render a ColumnPlot
 * @return An object with the update and exit selection { update, exit }
 */
export function render({
    x,
    y,
    interactive,
    layer,
    onMouseOver,
    onMouseOut,
    onClick,
    onFocus,
    onTooltip,
    xScale,
    yScale,
    data,
    animationDuration,
    fillColor,
    theme,
}: IRenderBarPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

    if (ensureBandwidth(bandwidth, "Bar") === false) return null;
    ensureValuesAreUnique(data, y, "Bar");

    // D3 data join
    const join = d3
        .select(layer)
        .selectAll(".bar")
        .data(data, (d) => d[y]) as Selection<SVGRectElement, IDatum, Element, unknown>;

    // Exit bars
    const exit = join.exit().remove();

    // Enter bars
    const enter = join
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", xScale.range()[0])
        // @ts-ignore: TODO: Need to work out casting
        .attr("y", (d) => yScale(d[y]) - offset)
        .attr("width", 0)
        .attr("height", bandwidth)
        .style("fill", fillColor.toString());

    // Update new and existing points
    const update = enter
        .merge(join)
        .style("opacity", theme.series.opacity)
        .on("mouseover", function (event, datum) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOver && onMouseOver(datum, this, event);
            onFocus && onFocus({ element: this, event, datum });
            onTooltip && onTooltip({ datum, event, fillColors: [fillColor], xs: [x] });
        })
        .on("mouseout", function (event, datum) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOut && onMouseOut(datum, this, event);
            onFocus && onFocus(null);
            onTooltip && onTooltip(null);
        })
        .on("click", function (event, datum) {
            // istanbul ignore next
            if (!interactive) return;

            onClick(datum, this, event);
        })
        .transition("position")
        .duration(animationDuration / 2)
        // @ts-ignore: How do we deal with the scale here? y is likely a string
        .attr("y", (d) => yScale(d[y]) - offset)
        .attr("height", bandwidth)
        .style("fill", () => fillColor.toString())
        // @ts-expect-error: Looks like the type defs are wrong missing named transitions
        .transition("width")
        .duration(animationDuration / 2)
        .delay(animationDuration / 2)
        .attr("x", () => xScale.range()[0])
        .attr("width", (d) => xScale(d[x] as INumericValue) - xScale.range()[0]);

    return { update, exit };
}
