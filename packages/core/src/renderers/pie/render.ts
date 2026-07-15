import { d3 } from "../../d3";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, ITheme } from "../../types";
import { ensureValuesAreUnique } from "../../utils";

import type { IArcAngles } from "./interpolateArc";
import { interpolateArc } from "./interpolateArc";

export interface IRenderPiePlotProps {
    /**
     * The layer to render the Pie/Donut to
     */
    layer: Element;
    /**
     * The dataset for the Pie/Donut
     */
    data: IData;
    /**
     * The key of the field used for the category/label of each slice
     */
    x: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The x-coordinate of the center of the Pie/Donut
     */
    cx: number;
    /**
     * The y-coordinate of the center of the Pie/Donut
     */
    cy: number;
    /**
     * The maximum radius, in pixels, available to the Pie/Donut
     */
    maxRadius: number;
    /**
     * The inner radius of the Pie/Donut, as a fraction (0-1) of `maxRadius`
     */
    innerRadius: number;
    /**
     * The outer radius of the Pie/Donut, as a fraction (0-1) of `maxRadius`
     */
    outerRadius: number;
    /**
     * The angular gap, in radians, to leave between each slice
     */
    padAngle: number;
    /**
     * The corner radius, in pixels, to apply to each slice
     */
    cornerRadius: number;
    /**
     * Should the slices be sorted by value (descending) rather than using the order of `data`?
     */
    sort: boolean;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     */
    interactive: boolean;
    /**
     * The colors to use for each category, matched up against the unique values of `x` in order of appearance
     */
    colors: IColor[];
    /**
     * The theme for the chart
     */
    theme: ITheme;
    /**
     * The time in milliseconds to spend animating data transitions
     */
    animationDuration: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
    /**
     * A function that will be triggered when the mouse focuses on a slice, designed to highlight it
     */
    onFocus?: ({ datum, element, event }: { datum: IDatum; element: Element; event: any }) => void;
    /**
     * A function that will be triggered when the mouse focuses on a slice, designed to trigger tooltips
     */
    onTooltip?: ({
        datum,
        event,
        name,
        value,
        color,
    }: {
        datum: IDatum;
        event: any;
        name: string;
        value: IDatum[string];
        color: IColor;
    }) => void;
}

/**
 * Helper function to render a Pie/Donut plot
 * @return An object with the update and exit selection { update, exit }
 */
export function render({
    layer,
    data,
    x,
    y,
    cx,
    cy,
    maxRadius,
    innerRadius,
    outerRadius,
    padAngle,
    cornerRadius,
    sort,
    interactive,
    colors,
    theme,
    animationDuration,
    onMouseOver,
    onMouseOut,
    onClick,
    onFocus,
    onTooltip,
}: IRenderPiePlotProps) {
    ensureValuesAreUnique(data, x, "Pie");

    const categories = data.map((d) => `${d[x]}`);
    // @ts-ignore: TODO: Not sure how to fix this
    const colorScale = d3.scaleOrdinal<string>().domain(categories).range(colors);

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
        .select(layer)
        .selectAll<SVGPathElement, d3.PieArcDatum<IDatum>>(".pie-slice")
        .data(arcs, (d) => `${d.data[x]}`);

    // Exit slices
    const exit = join.exit().remove();

    // Enter slices
    const enter = join
        .enter()
        .append("path")
        .attr("class", "pie-slice")
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

    return { update, exit };
}
