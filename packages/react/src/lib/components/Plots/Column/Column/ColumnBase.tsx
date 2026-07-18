import { chartSelectors, d3, ensureBandwidth, ensureValuesAreUnique, getBandwidthAndOffset, IState } from "@chart-io/core";
import type { IEventPlotProps, INumericValue } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IColumnBaseProps extends IEventPlotProps {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a Column Plot
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function ColumnBase({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}: IColumnBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;

    useLegendItem(y, "square", showInLegend, fillColor);
    const onTooltip = useTooltip({ x });
    const onFocus = useFocused({ xScale, theme, grouped: false });

    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(xScale, x, data);

        if (ensureBandwidth(bandwidth, "Column") === false) return;
        ensureValuesAreUnique(data, x, "Column");

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGRectElement, any>(".column")
            .data(data, (d) => d[x]?.toString());

        // Exit bars
        join.exit().remove();

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

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        xScale,
        yScale,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        color,
        height,
        width,
    ]);

    return null;
}
