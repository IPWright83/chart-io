import { chartSelectors, d3, ensureValuesAreUnique, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../hooks";

import { interpolatePoints } from "../interpolatePoints";
import { renderCanvas } from "../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IFunnelBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the category/label of each segment
     */
    category: string;
    /**
     * The key of the field used for the value of each segment
     */
    value: string;
    /**
     * The gap, in pixels, to leave between each segment
     * @default 2
     */
    padding?: number;
    /**
     * Should the segments be sorted by value (descending) rather than using the order of the data?
     * @default false
     */
    sort?: boolean;
    /**
     * Flips the funnel upside down, so the widest segment forms the flat base at the bottom and the
     * narrowest sits at the top - i.e. a Pyramid rather than a Funnel. See `<Pyramid>`
     * @default false
     */
    inverted?: boolean;
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
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Funnel plot, stacking one trapezoid segment per row of data - each segment's width
 * proportional to its value, narrowing from the widest at the top down to the narrowest at the
 * bottom. Set `inverted` to flip this into a Pyramid instead - see `<Funnel>`/`<Pyramid>`
 * @param  props       The set of React properties
 * @return             The FunnelBase component
 */
export function FunnelBase({
    category,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    padding = 2,
    sort = false,
    inverted = false,
    colors,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IFunnelBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => data.map((d) => `${d[category]}`), [data, category]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        ensureValuesAreUnique(data, category, "Funnel");

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(categories).range(palette);

        // Sorted (if requested), reversed for a Pyramid so the widest segment ends up at the base
        // rather than the top - see `inverted` above
        const ordered = sort ? [...data].sort((a, b) => d3.descending(Number(a[value]), Number(b[value]))) : data;
        const rows = inverted ? [...ordered].reverse() : ordered;

        const widthOf = (d: IDatum) => Math.max(0, Number(d[value]) || 0);
        const maxValue = Math.max(...rows.map(widthOf), 0);
        const centerX = plotLeft + plotWidth / 2;
        const rowHeight = Math.max(0, (plotHeight - padding * Math.max(0, rows.length - 1)) / Math.max(1, rows.length));

        // Every segment's bottom edge matches the next segment's top edge, except the last row which
        // stays a flat-bottomed rectangle - the same width top and bottom. Computed once per render
        // and looked up by category key below, rather than relying on a selection callback's index
        // lining up with `rows` - that alignment isn't guaranteed for enter/exit selections
        const layoutByKey = new Map(
            rows.map((d, index) => {
                const topWidth = maxValue === 0 ? 0 : (widthOf(d) / maxValue) * plotWidth;
                const bottomWidth = maxValue === 0 ? 0 : (widthOf(rows[index + 1] ?? d) / maxValue) * plotWidth;

                const y0 = plotTop + index * (rowHeight + padding);
                const y1 = y0 + rowHeight;

                return [
                    `${d[category]}`,
                    {
                        y0,
                        y1,
                        topLeft: centerX - topWidth / 2,
                        topRight: centerX + topWidth / 2,
                        bottomLeft: centerX - bottomWidth / 2,
                        bottomRight: centerX + bottomWidth / 2,
                    },
                ];
            }),
        );

        const pointsFor = (d: IDatum) => {
            const { y0, y1, topLeft, topRight, bottomLeft, bottomRight } = layoutByKey.get(`${d[category]}`);
            return `${topLeft},${y0} ${topRight},${y0} ${bottomRight},${y1} ${bottomLeft},${y1}`;
        };

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGPolygonElement, IDatum>(".funnel-segment")
            .data(rows, (d) => `${d[category]}`);

        // Exit segments
        join.exit().remove();

        // Enter segments, collapsed to a zero-width vertical line so they grow outwards into place
        const enter = join
            .enter()
            .append("polygon")
            .attr("class", "funnel-segment")
            .attr("points", (d) => {
                const { y0, y1 } = layoutByKey.get(`${d[category]}`);
                return `${centerX},${y0} ${centerX},${y0} ${centerX},${y1} ${centerX},${y1}`;
            })
            .style("fill", (d) => colorScale(`${d[category]}`).toString());

        // Update new and existing segments
        const update = enter
            .merge(join)
            .style("opacity", theme.series.opacity)
            .style("fill", (d) => colorScale(`${d[category]}`).toString())
            .on("mouseover", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                const color = colorScale(`${d[category]}`) as IColor;
                onMouseOver && onMouseOver(d, this, event);
                onFocus && onFocus({ element: this, event, datum: d });
                onTooltip && onTooltip({ datum: d, event, name: `${d[category]}`, value: d[value], color });
            })
            .on("mouseout", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(d, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(d, this, event);
            })
            .transition("funnel-segment")
            .duration(animationDuration)
            .tween("points", function (d) {
                const node = d3.select(this);
                const previous = node.attr("points");
                const target = pointsFor(d);
                return (t: number) => node.attr("points", interpolatePoints(previous, target, t));
            });

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        category,
        value,
        data,
        canvas,
        renderVirtualCanvas,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        padding,
        sort,
        inverted,
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
