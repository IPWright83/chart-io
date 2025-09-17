import { IColor, IDatum } from "@chart-io/types";
import { d3 } from "../../d3";

import type { IRenderProps } from "../../types";
import {
    ensureBandwidth,
    ensureNoScaleOverflow,
    ensureValuesAreUnique,
    getBandwidthAndOffset,
    getParentKey,
} from "../../utils";

export interface IRenderStackedColumnPlotProps extends Omit<IRenderProps, "y"> {
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
 * Helper function to render a stacked ColumnPlot
 * @return An object with the update and exit selection { update, exit }
 */
export function stacked({
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
}: IRenderStackedColumnPlotProps) {
    const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

    if (ensureBandwidth(bandwidth, "StackedColumnBase") === false) return null;
    ensureValuesAreUnique(data, x, "StackedColumnBase");
    ensureNoScaleOverflow(yScale, data, ys, "StackedColumnBase");

    // Create the stacked variant of the data
    const keys = ys;
    // @ts-ignore: TODO: Fix this
    const stackedData = d3.stack().keys(keys)(data);
    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

    const groupJoin = d3.select(layer).selectAll<SVGGElement, IDatum>("g").data(stackedData);

    // Clean up old stacks
    const exit = groupJoin.exit().remove();

    const join = groupJoin
        .enter()
        .append("g")
        .merge(groupJoin)
        .selectAll(".column")
        .data((d) => d);

    join.exit().remove();
    const enter = join
        .enter()
        .append("rect")
        .attr("class", "column")
        .attr("x", (d) => xScale(d.data[x]) - offset)
        .attr("y", () => yScale.range()[0] as number)
        .attr("height", 0)
        .attr("width", bandwidth)
        .style("fill", (d, i, elements) => {
            const key = getParentKey(elements[i]);
            return colorScale(key)?.toString();
        })
        .style("opacity", theme.series.opacity);

    const update = join
        .merge(enter)
        .style("opacity", theme.series.opacity)
        .on("mouseover", function (event: MouseEvent, d) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOver && onMouseOver(d.data, this as Element, event);
            onFocus && onFocus({ element: this as Element, event, datum: d.data });
            onTooltip &&
                onTooltip({
                    datum: d.data,
                    event,
                    ys,
                    fillColors: ys.map((y) => colorScale(y) as IColor),
                });
        })
        .on("mouseout", function (event: MouseEvent, d) {
            // istanbul ignore next
            if (!interactive) return;

            onMouseOut && onMouseOut(d.data, this as Element, event);
            onFocus && onFocus(null);
            onTooltip && onTooltip(null);
        })
        .on("click", function (event: MouseEvent, d) {
            // istanbul ignore next
            if (!interactive) return;

            onClick && onClick(d.data, this as Element, event);
        })
        .transition("position")
        .duration(animationDuration / 2)
        .attr("x", (d) => xScale(d.data[x]) - offset)
        .attr("width", bandwidth)
        .style("fill", (d, i, elements) => {
            const key = getParentKey(elements[i] as Element);
            return colorScale(key)?.toString();
        })
        // @ts-expect-error: Looks like the type defs are wrong missing named transitions
        .transition("height")
        .duration(animationDuration / 2)
        .delay(animationDuration / 2)
        .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
        .attr("y", (d) => yScale(d[1]));

    return { update, exit };
}
