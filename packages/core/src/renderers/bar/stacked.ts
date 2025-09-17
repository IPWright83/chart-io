import { d3 } from "../../d3";
import type { IColor, IDatum, IRenderProps } from "../../types";
import {
    ensureBandwidth,
    ensureNoScaleOverflow,
    ensureValuesAreUnique,
    getBandwidthAndOffset,
    getParentKey,
} from "../../utils";

export interface IRenderStackedBarPlotProps extends Omit<IRenderProps, "x"> {
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
 * Helper function to render a stacked BarPlot
 * @return An object with the update and exit selection { update, exit }
 */
export function stacked({
    y,
    xs,
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
}: IRenderStackedBarPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

    if (ensureBandwidth(bandwidth, "StackedBar") === false) return null;
    ensureValuesAreUnique(data, y, "StackedBar");
    ensureNoScaleOverflow(xScale, data, xs, "StackedBar");

    // Create the stacked variant of the data
    const keys = xs;
    // @ts-ignore: TODO: Work out how to fix this
    const stackedData = d3.stack().keys(keys)(data);
    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

    const groupJoin = d3.select(layer).selectAll<SVGGElement, IDatum>("g").data(stackedData);

    // Clean up old stacks
    groupJoin.exit().remove();

    const join = groupJoin
        .enter()
        .append("g")
        // @ts-ignore: TODO: Work out how to fix this
        .merge(groupJoin)
        .selectAll(".bar")
        .data((d) => d);

    const exit = join.exit().remove();
    const enter = join
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", () => xScale.range()[0] as number)
        .attr("y", (d) => yScale(d.data[y]) - offset)
        .attr("height", bandwidth)
        .attr("width", 0)
        .style("fill", (d, i, elements) => {
            const key = getParentKey(elements[i]);
            return colorScale(key)?.toString();
        })
        .style("opacity", theme.series.opacity);

    // prettier-ignore
    const update = join
        .merge(enter)
        .style("opacity", theme.series.opacity)
        .on("mouseover", function (event: MouseEvent, d) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOver && onMouseOver(d.data, this as Element, event);
            onFocus && onFocus({ element: this as Element, event, datum: d.data });
            onTooltip && onTooltip({ datum: d.data, event, fillColors: xs.map((x) => colorScale(x) as IColor), xs });
        })
        .on("mouseout", function (event: MouseEvent, d) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOut && onMouseOut(d.data, this as Element, event);
            onFocus && onFocus(null);
            onTooltip && onTooltip(null);
        })
        .on("click", function (event: MouseEvent, d: { data: IDatum }) {
            // istanbul ignore next
            if (!interactive) return;

            onClick && onClick(d.data, this as Element, event);
        })
        .transition("position")
        .duration(animationDuration / 2)
        .style("fill", (d, i, elements) => {
            const key = getParentKey(elements[i] as Element);
            return colorScale(key)?.toString();
        })
        .attr("y", (d) => yScale(d.data[y]) - offset)
        .attr("height", bandwidth)
        // @ts-expect-error: Looks like the type defs are wrong missing named transitions
        .transition("width")
        .duration(animationDuration / 2)
        .delay(animationDuration / 2)
        .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
        .attr("x", (d) => xScale(d[0]));

    return { update, exit };
}
