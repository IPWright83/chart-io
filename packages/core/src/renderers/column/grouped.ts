import * as d3 from "@chart-io/d3";
import { IColor, IDatum, INumericValue } from "@chart-io/types";

import { ensureBandwidth, getBandwidthAndOffset } from "../../utils";
import type { IRenderProps } from "../../types";

export interface IRenderGroupedColumnPlotProps extends Omit<IRenderProps, "y"> {
    /**
     * The color of each data point
     */
    colors?: Array<IColor>;
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
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;
}

/**
 * Helper function to render a grouped ColumnPlot
 * @return An object with the update and exit selection { update, exit }
 */
export function grouped({
    x,
    ys,
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
    colors,
    theme,
}: IRenderGroupedColumnPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

    if (ensureBandwidth(bandwidth, "GroupedColumn") === false) return null;

    // Create a scale for each series to fit along the x-axis and the series colors
    const colorScale = d3.scaleOrdinal().domain(ys).range(colors);
    const x1Scale = d3.scaleBand().domain(ys).rangeRound([0, bandwidth]).padding(0.05);

    // prettier-ignore
    const groupJoin = d3.select(layer)
            .selectAll<SVGGElement, IDatum>("g")
            .data(data);

    // Clean up old groups
    const exit = groupJoin.exit().remove();

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
        .attr("x", (d) => xScale(d[x]) + x1Scale(d.key) - offset)
        .attr("y", yScale.range()[0])
        .attr("height", 0)
        .attr("width", x1Scale.bandwidth())
        .style("fill", (d) => colorScale(d.key).toString())
        .style("opacity", theme.series.opacity);

    // prettier-ignore
    const update = join
            .merge(enter)
            .style("opacity", theme.series.opacity)
            .on("mouseover", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(datum, this as Element, event);
                onFocus && onFocus({ element: this as Element, event, datum });
                onTooltip && onTooltip({ datum, event, fillColors: [colorScale(datum.key) as IColor], ys: [datum.key] });
            })
            .on("mouseout", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(datum, this as Element, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, datum) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(datum, this as Element, event);
            })
            .transition("position")
            .duration(animationDuration / 2)
            .attr("x", (d) => xScale(d[x]) + x1Scale(d.key) - offset)
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key).toString())
            // @ts-expect-error: Looks like the type defs are wrong missing named transitions
            .transition("height")
            .duration(animationDuration / 2)
            .delay(animationDuration / 2)
            .attr("height", (d) => yScale.range()[0] - yScale(d.value as INumericValue))
            .attr("y", (d) => yScale(d.value as INumericValue));

    return { update, exit };
}
