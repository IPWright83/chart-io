import { IColor, IDatum, INumericValue } from "@chart-io/types";
import { d3 } from "../../d3";

import type { IRenderProps } from "../../types";
import { ensureBandwidth, ensureValuesAreUnique, getBandwidthAndOffset } from "../../utils";

export interface IRenderColumnPlotProps extends IRenderProps {
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
        ys,
    }: {
        datum: IDatum;
        event: any;
        fillColors: IColor[];
        ys: Array<string>;
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
}: IRenderColumnPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

    if (ensureBandwidth(bandwidth, "Column") === false) return null;
    ensureValuesAreUnique(data, x, "Column");

    // D3 data join
    const join = d3
        .select(layer)
        .selectAll<SVGRectElement, IDatum>(".column")
        .data(data, (d) => d[x]?.toString());

    // Exit bars
    const exit = join.exit().remove();

    // Enter bars
    const enter = join
        .enter()
        .append("rect")
        .attr("class", "column")
        // @ts-ignore: TODO: Need to work out casting
        .attr("x", (d) => xScale(d[x]) - offset)
        .attr("y", yScale.range()[0] as number)
        .attr("width", bandwidth)
        .attr("height", 0)
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
            onTooltip && onTooltip({ datum, event, fillColors: [fillColor], ys: [y] });
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
        .attr("height", (d) => (yScale.range()[0] as number) - yScale(d[y] as INumericValue));

    return { update, exit };
}
