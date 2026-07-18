import { chartSelectors, d3, ensureBandwidth, getBandwidthAndOffset, IState } from "@chart-io/core";
import type { IColor, IDatum, IEventPlotProps, INumericValue, IValue } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IGroupedBarBaseProps extends Omit<IEventPlotProps, "ys" | "x"> {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The set of x fields to use to access the data for each plot
     */
    xs: Array<string>;
    /**
     * The y field to use to access the data for each plot
     */
    y: string;
    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;
}

/**
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function GroupedBarBase({
    xs,
    y,
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
}: IGroupedBarBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, xs[0], scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip({ y });
    const onFocus = useFocused({ yScale, theme, grouped: true });

    useLegendItems(xs, "square", showInLegend, colors);

    // prettier-ignore
    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

        if (ensureBandwidth(bandwidth, "GroupedBar") === false) return;

        // Create a scale for each series to fit along the x-axis and the series colors
        const colorScale = d3.scaleOrdinal().domain(xs).range(colors);
        const y1Scale = d3.scaleBand().domain(xs).rangeRound([0, bandwidth]).padding(0.05);

        const groupJoin = d3.select(layer.current).selectAll<SVGGElement, IDatum>("g").data(data);

        // Clean up old groups
        groupJoin.exit().remove();

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

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [y, xs, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
