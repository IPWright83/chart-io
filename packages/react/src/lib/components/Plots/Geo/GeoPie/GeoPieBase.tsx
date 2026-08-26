import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useDatumContextMenu, useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import type { IArcAngles } from "../../interpolateArc";
import { interpolateArc } from "../../interpolateArc";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { useGeoContext } from "../GeoContext";

interface ISlice {
    key: string;
    group: string;
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    datum: IDatum;
}

export interface IGeoPieBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field holding each row's latitude
     */
    lat: string;
    /**
     * The key of the field holding each row's longitude
     */
    lon: string;
    /**
     * The key of the field identifying which pie each row belongs to. Rows sharing a `lat`/`lon`
     * are grouped into a single pie if omitted
     */
    group?: string;
    /**
     * The key of the field used for the category/label of each slice
     */
    category: string;
    /**
     * The key of the field used for the value of each slice
     */
    value: string;
    /**
     * The outer radius, in pixels, of every pie - or a function of that pie's total `value` for
     * area-proportional sizing (e.g. `(total) => scale(total)`)
     * @default 20
     */
    radius?: number | ((total: number) => number);
    /**
     * The inner radius, as a fraction (0-1) of `radius`. Set this above `0` for a Donut instead of a
     * Pie
     * @default 0
     */
    innerRadius?: number;
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
     * Should the slices within each pie be sorted by value (descending) rather than using the order
     * of the data?
     * @default false
     */
    sort?: boolean;
    /**
     * The set of colors to use for each category. Defaults to the theme's series colors
     */
    colors?: IColor[];
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
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a GeoPie layer, drawing a small pie (or Donut, via `innerRadius`) glyph for every
 * `lat`/`lon`/`group` on the map, summarizing that location's rows by `category`/`value` - e.g. the
 * energy mix for every country on a world map. Used inside a `<Geo>` chart alongside any other
 * layer - not a standalone chart itself. Built the same way as `<Donut>`, repeated once per pie
 * @param  props       The set of React properties
 * @return             The GeoPieBase component
 */
export function GeoPieBase({
    layer,
    lat,
    lon,
    group,
    category,
    value,
    radius = 20,
    innerRadius = 0,
    padAngle = 0.01,
    cornerRadius = 0,
    sort = false,
    colors,
    interactive = true,
    showInLegend = true,
    canvas,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IGeoPieBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const { project } = useGeoContext("GeoPie");

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => (data as IData).map((d) => `${d[category]}`), [data, category]);
    const legendKeys = useMemo(() => Array.from(new Set(categories)), [categories]);
    const legendColors = useMemo(() => legendKeys.map((_, index) => palette[index % palette.length]), [legendKeys, palette]);

    useLegendItems(legendKeys, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme, { canvas, width, height, layer });
    const onDatumContextMenu = useDatumContextMenu();

    const { slices, colorScale } = useMemo(() => {
        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(categories).range(palette);

        const byGroup = new Map<string, Array<{ datum: IDatum; key: string }>>();
        (data as IData).forEach((datum) => {
            const key = group ? `${datum[group]}` : `${datum[lat]}:${datum[lon]}`;
            const rows = byGroup.get(key) ?? [];
            rows.push({ datum, key });
            byGroup.set(key, rows);
        });

        const pieLayout = d3
            .pie<{ datum: IDatum; key: string }>()
            .value(({ datum }) => Number(datum[value]) || 0)
            // @ts-ignore: TODO: Not sure how to fix this
            .sort(sort ? (a, b) => d3.descending(Number(a.datum[value]), Number(b.datum[value])) : null);

        const slices: ISlice[] = Array.from(byGroup.entries()).flatMap(([key, rows]) => {
            const longitude = Number(rows[0].datum[lon]);
            const latitude = Number(rows[0].datum[lat]);
            if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return [];

            const projected = project([longitude, latitude]);
            if (!projected) return [];

            const total = rows.reduce((sum, { datum }) => sum + (Number(datum[value]) || 0), 0);
            const outerRadiusPx = typeof radius === "function" ? radius(total) : radius;
            const innerRadiusPx = innerRadius * outerRadiusPx;

            return pieLayout(rows).map((arc, index) => ({
                key: `${key}:${index}`,
                group: key,
                cx: projected[0],
                cy: projected[1],
                innerRadius: innerRadiusPx,
                outerRadius: outerRadiusPx,
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
                datum: arc.data.datum,
            }));
        });

        return { slices, colorScale };
    }, [data, lat, lon, group, category, value, radius, innerRadius, sort, categories, palette, project]);

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const arcGenerator = d3
            .arc<{ startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }>()
            .padAngle(padAngle)
            .cornerRadius(cornerRadius);

        const join = d3.select(layer.current).selectAll<SVGPathElement, ISlice>(".geo-pie-slice").data<ISlice>(slices, (d) => d.key);

        join.exit().remove();

        const enter = join
            .enter()
            .append("path")
            .attr("class", "geo-pie-slice")
            .attr("data-path-type", "arc")
            .style("fill", (d) => colorScale(`${d.datum[category]}`).toString());

        const update = enter
            .merge(join)
            .attr("transform", (d) => `translate(${d.cx}, ${d.cy})`)
            .attr("data-cx", (d) => d.cx)
            .attr("data-cy", (d) => d.cy)
            .attr("data-pad-angle", padAngle)
            .attr("data-corner-radius", cornerRadius)
            .style("opacity", theme.series.opacity)
            .style("fill", (d) => colorScale(`${d.datum[category]}`).toString())
            .on("mouseover", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                const color = colorScale(`${d.datum[category]}`) as IColor;
                onMouseOver && onMouseOver(d.datum, this, event);
                onFocus && onFocus({ element: this, event, datum: d.datum });
                onTooltip && onTooltip({ datum: d.datum, event, name: `${d.datum[category]}`, value: d.datum[value], color });
            })
            .on("mouseout", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(d.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(d.datum, this, event);
                onDatumContextMenu(d.datum, event);
            })
            .transition("arc")
            .duration(animationDuration)
            .attrTween("d", function (d) {
                const node = this as unknown as { _current?: IArcAngles };
                const previous = node._current || {
                    startAngle: d.startAngle,
                    endAngle: d.startAngle,
                    innerRadius: d.innerRadius,
                    outerRadius: d.outerRadius,
                };
                const target = {
                    startAngle: d.startAngle,
                    endAngle: d.endAngle,
                    innerRadius: d.innerRadius,
                    outerRadius: d.outerRadius,
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
        slices,
        colorScale,
        category,
        value,
        padAngle,
        cornerRadius,
        canvas,
        renderVirtualCanvas,
        layer,
        animationDuration,
        theme,
        interactive,
        onMouseOver,
        onMouseOut,
        onClick,
        onDatumContextMenu,
        width,
        height,
    ]);

    return null;
}
