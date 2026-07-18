import { chartSelectors, d3, ensureBandwidth, ensureValuesAreUnique, getBandwidthAndOffset, IState } from "@chart-io/core";
import type { IDatum, IEventPlotProps, INumericValue } from "@chart-io/core";

import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IBarBaseProps extends IEventPlotProps {
    /**
     * This is an internally used function to allow the scatter plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
}

/**
 * Represents a Bar Plot
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function BarBase({
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
}: IBarBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;

    useLegendItem(x, "square", showInLegend, fillColor);
    const onTooltip = useTooltip({ y });
    const onFocus = useFocused({ yScale, theme, grouped: false });

    useRender(() => {
        const { bandwidth, offset } = getBandwidthAndOffset(yScale, y, data);

        if (ensureBandwidth(bandwidth, "Bar") === false) return;
        ensureValuesAreUnique(data, y, "Bar");

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll(".bar")
            .data(data, (d) => d[y]) as d3.Selection<SVGRectElement, IDatum, Element, unknown>;

        // Exit bars
        join.exit().remove();

        // Enter bars
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", xScale.range()[0] as number)
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
            .attr("x", () => xScale.range()[0] as number)
            .attr("width", (d) => xScale(d[x] as INumericValue) - (xScale.range()[0] as number));

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
    ]);

    return null;
}
