import { d3 } from "../../d3";
import type { IColor, IDatum, INumericValue, IRenderProps, IValue } from "../../types";
import { ensureBandwidth, getBandwidthAndOffset } from "../../utils";

export interface IRenderGroupedBarPlotProps extends Omit<IRenderProps, "x"> {
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
        xs,
    }: {
        datum: IDatum;
        event: any;
        fillColors: IColor[];
        xs: Array<string>;
    }) => void;
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
}

/**
 * Helper function to render a grouped BarPlot
 * @return An object with the update and exit selection { update, exit }
 */
export function grouped({
    xs,
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
    colors,
    theme,
}: IRenderGroupedBarPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

    if (ensureBandwidth(bandwidth, "GroupedBar") === false) return null;

    // Create a scale for each series to fit along the x-axis and the series colors
    const colorScale = d3.scaleOrdinal().domain(xs).range(colors);
    const y1Scale = d3.scaleBand().domain(xs).rangeRound([0, bandwidth]).padding(0.05);

    const groupJoin = d3.select(layer).selectAll<SVGGElement, IDatum>("g").data(data);

    // Clean up old groups
    const exit = groupJoin.exit().remove();

    const join = groupJoin
        .enter()
        .append("g")
        .merge(groupJoin)
        .selectAll(".bar")
        .data((d) => xs.map((x) => ({ ...d, key: x, value: d[x] })));

    join.exit().remove();
    const enter = join
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => yScale(d[y]) + y1Scale(d.key) - offset)
        .attr("x", xScale.range()[0] as number)
        .attr("width", 0)
        .attr("height", y1Scale.bandwidth())
        .style("fill", (d) => colorScale(d.key).toString())
        .style("opacity", theme.series.opacity);

    // prettier-ignore
    const update = join
        .merge(enter)
        .on("mouseover", function (event, datum) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOver && onMouseOver(datum, this as Element, event);
            onFocus && onFocus({ element: this as Element, event, datum });
            onTooltip && onTooltip({ datum, event, fillColors: [colorScale(datum.key) as IColor], xs: [datum.key] });
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
        .attr("y", (d) => yScale(d[y]) + y1Scale(d.key) - offset)
        .attr("height", y1Scale.bandwidth())
        .style("fill", (d) => colorScale(d.key).toString())
        // @ts-expect-error: Looks like the type defs are wrong missing named transitions
        .transition("width")
        .duration(animationDuration / 2)
        .delay(animationDuration / 2)
        .attr("width", (d) => xScale(d.value as INumericValue) - (xScale.range()[0] as number))
        .attr("x", () => xScale.range()[0] as number) as d3.Transition<SVGRectElement, { key: string; value: IValue; }, SVGGElement, IDatum>;

    return { update, exit };
}
