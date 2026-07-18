import { chartSelectors, d3, ensureBandwidth, getBandwidthAndOffset, IState } from "@chart-io/core";
import type { IColor, IDatum, IEventPlotProps, INumericValue } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IGroupedColumnBaseProps extends Omit<IEventPlotProps, "y"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;

    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Groupled Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedColumnBase({
    x,
    ys,
    colors,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
    canvas,
    renderVirtualCanvas,
}: IGroupedColumnBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0], scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip({ x });
    const onFocus = useFocused({ xScale, theme, grouped: true });

    useLegendItems(ys, "square", showInLegend, colors);

    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

        if (ensureBandwidth(bandwidth, "GroupedColumn") === false) return;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(ys).range(colors);
        const x1Scale = d3.scaleBand().domain(ys).rangeRound([0, bandwidth]).padding(0.05);

        const groupJoin = d3.select(layer.current).selectAll<SVGGElement, IDatum>("g").data(data);

        // Clean up old groups
        groupJoin.exit().remove();

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
            .attr("y", yScale.range()[0] as number)
            .attr("height", 0)
            .attr("width", x1Scale.bandwidth())
            .style("fill", (d) => colorScale(d.key).toString())
            .style("opacity", theme.series.opacity);

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
            .attr("height", (d) => (yScale.range()[0] as number) - yScale(d.value as INumericValue))
            .attr("y", (d) => yScale(d.value as INumericValue));

        // @ts-ignore: TODO: Work out how to fix this
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
