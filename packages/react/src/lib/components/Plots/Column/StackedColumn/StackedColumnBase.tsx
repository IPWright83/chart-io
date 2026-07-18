import {
    chartSelectors,
    d3,
    ensureBandwidth,
    ensureNoScaleOverflow,
    ensureValuesAreUnique,
    getBandwidthAndOffset,
    IState,
} from "@chart-io/core";
import type { IColor, IDatum, IEventPlotProps } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";
import { getParentKey } from "./getParentKey";

export interface IStackedColumnBaseProps extends Omit<IEventPlotProps, "y"> {
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
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function StackedColumnBase({
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
}: IStackedColumnBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, ys[0], scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip({ x });
    const onFocus = useFocused({ xScale, theme, grouped: false });

    useLegendItems(ys, "square", showInLegend, colors);

    // prettier-ignore
    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

        if (ensureBandwidth(bandwidth, "StackedColumnBase") === false) return;
        ensureValuesAreUnique(data, x, "StackedColumnBase");
        ensureNoScaleOverflow(yScale, data, ys, "StackedColumnBase");

        // Create the stacked variant of the data
        const keys = ys;
        // @ts-ignore: TODO: Fix this
        const stackedData = d3.stack().keys(keys)(data);
        const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

        const groupJoin = d3.select(layer.current).selectAll<SVGGElement, IDatum>("g").data(stackedData);

        // Clean up old stacks
        groupJoin.exit().remove();

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

        // @ts-ignore: TODO: Work out how to fix this
        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [x, ys, data, xScale, yScale, layer, animationDuration, onMouseOver, onMouseOut, onClick]);

    return null;
}
