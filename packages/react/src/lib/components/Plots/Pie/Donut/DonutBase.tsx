import { chartSelectors, d3, ensureValuesAreUnique, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import type { IArcAngles } from "../interpolateArc";
import { interpolateArc } from "../interpolateArc";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IDonutBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the category/label of each slice
     */
    x: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The inner radius of the Donut, as a fraction (0-1) of the maximum available radius. Set this to `0`
     * for a fully filled Pie segment
     * @default 0.6
     */
    innerRadius?: number;
    /**
     * The outer radius of the Donut, as a fraction (0-1) of the maximum available radius
     * @default 1
     */
    outerRadius?: number;
    /**
     * The angular gap, in radians, to leave between each slice
     * @default 0.01
     */
    padAngle?: number;
    /**
     * The corner radius, in pixels, to apply to each slice
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the slices be sorted by value (descending) rather than using the order of the data?
     * @default false
     */
    sort?: boolean;
    /**
     * The set of colors to use for each category. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend?
     * @default true
     */
    showInLegend?: boolean;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The x-coordinate of the center of the Donut. Provided by `withRadialPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the Donut. Provided by `withRadialPlot`
     */
    cy?: number;
    /**
     * The maximum radius, in pixels, available to the Donut. Provided by `withRadialPlot`
     */
    maxRadius?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Donut plot. A Pie is just a Donut with `innerRadius` set to `0`, see `<Pie>`
 * @param  props       The set of React properties
 * @return             The Donut plot component
 */
export function DonutBase({
    x,
    y,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    maxRadius,
    innerRadius = 0.6,
    outerRadius = 1,
    padAngle = 0.01,
    cornerRadius = 0,
    sort = false,
    colors,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IDonutBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => data.map((d) => `${d[x]}`), [data, x]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        ensureValuesAreUnique(data, x, "Donut");

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(categories).range(palette);

        const innerRadiusPx = innerRadius * maxRadius;
        const outerRadiusPx = outerRadius * maxRadius;

        const pieLayout = d3
            .pie<IDatum>()
            .value((d) => Number(d[y]) || 0)
            // @ts-ignore: TODO: Not sure how to fix this
            .sort(sort ? (a, b) => d3.descending(Number(a[y]), Number(b[y])) : null);

        const arcGenerator = d3
            .arc<{ startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }>()
            .padAngle(padAngle)
            .cornerRadius(cornerRadius);

        const arcs = pieLayout(data);

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGPathElement, d3.PieArcDatum<IDatum>>(".pie-slice")
            .data(arcs, (d) => `${d.data[x]}`);

        // Exit slices
        join.exit().remove();

        // Enter slices
        const enter = join
            .enter()
            .append("path")
            .attr("class", "pie-slice")
            .attr("data-path-type", "arc")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-pad-angle", padAngle)
            .attr("data-corner-radius", cornerRadius)
            .style("fill", (d) => colorScale(`${d.data[x]}`).toString());

        // Update new and existing points
        const update = enter
            .merge(join)
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-pad-angle", padAngle)
            .attr("data-corner-radius", cornerRadius)
            .style("opacity", theme.series.opacity)
            .style("fill", (d) => colorScale(`${d.data[x]}`).toString())
            .on("mouseover", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                const color = colorScale(`${d.data[x]}`) as IColor;
                onMouseOver && onMouseOver(d.data, this, event);
                onFocus && onFocus({ element: this, event, datum: d.data });
                onTooltip && onTooltip({ datum: d.data, event, name: `${d.data[x]}`, value: d.data[y], color });
            })
            .on("mouseout", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(d.data, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(d.data, this, event);
            })
            .transition("arc")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const node = this as unknown as { _current?: IArcAngles };
                const previous = node._current || {
                    startAngle: d.startAngle,
                    endAngle: d.startAngle,
                    innerRadius: innerRadiusPx,
                    outerRadius: outerRadiusPx,
                };
                const target = {
                    startAngle: d.startAngle,
                    endAngle: d.endAngle,
                    innerRadius: innerRadiusPx,
                    outerRadius: outerRadiusPx,
                };
                node._current = target;

                return (t: number) => {
                    const interpolated = interpolateArc(previous, target, t);
                    d3.select(this)
                        .attr("data-start-angle", interpolated.startAngle)
                        .attr("data-end-angle", interpolated.endAngle)
                        .attr("data-inner-radius", interpolated.innerRadius)
                        .attr("data-outer-radius", interpolated.outerRadius);

                    return arcGenerator(interpolated);
                };
            });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        maxRadius,
        innerRadius,
        outerRadius,
        padAngle,
        cornerRadius,
        sort,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
        categories,
    ]);

    return null;
}
