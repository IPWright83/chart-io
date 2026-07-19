import { chartSelectors, d3, ensureCombinationsAreUnique, IState } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import type { IArcAngles } from "../interpolateArc";
import { interpolateArc } from "../interpolateArc";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";
import type { IPieHierarchyNode } from "./buildHierarchy";
import { buildHierarchy } from "./buildHierarchy";

export interface IStackedDonutBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the inner ring category
     */
    x: string;
    /**
     * The key of the field used for the outer ring subdivision, within each `x` category
     */
    x2: string;
    /**
     * The key of the field used for the value of each slice
     */
    y: string;
    /**
     * The inner radius of the StackedDonut, as a fraction (0-1) of the maximum available radius
     * @default 0.35
     */
    innerRadius?: number;
    /**
     * The outer radius of the StackedDonut, as a fraction (0-1) of the maximum available radius
     * @default 1
     */
    outerRadius?: number;
    /**
     * The gap, in pixels, to leave between the inner and outer ring
     * @default 2
     */
    ringPadding?: number;
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
     * The set of colors to use for each inner ring category. Defaults to the theme's series colors
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
     * The x-coordinate of the center of the StackedDonut. Provided by `withRadialPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the StackedDonut. Provided by `withRadialPlot`
     */
    cy?: number;
    /**
     * The maximum radius, in pixels, available to the StackedDonut. Provided by `withRadialPlot`
     */
    maxRadius?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a StackedDonut plot, a 2-level radial subdivision of `x` (inner ring) and `x2` (outer ring)
 * @param  props       The set of React properties
 * @return             The StackedDonut plot component
 */
export function StackedDonutBase({
    x,
    x2,
    y,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    maxRadius,
    innerRadius = 0.35,
    outerRadius = 1,
    ringPadding = 2,
    padAngle = 0.01,
    cornerRadius = 0,
    sort = false,
    colors,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IStackedDonutBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    // Only the inner ring categories are shown in the Legend, the outer ring can
    // contain many more values than is practical to list
    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => Array.from(new Set(data.map((d) => `${d[x]}`))), [data, x]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        ensureCombinationsAreUnique(data, [x, x2], "StackedDonut");

        const root = buildHierarchy(data, x, x2, y, sort);
        const parentNodes = (root.children ?? []) as IPieHierarchyNode[];
        const leafNodes = parentNodes.flatMap((node) => (node.children ?? []) as IPieHierarchyNode[]);
        const allNodes = [...parentNodes, ...leafNodes];

        const innerRadiusPx = innerRadius * maxRadius;
        const outerRadiusPx = outerRadius * maxRadius;
        const ringWidth = Math.max(0, (outerRadiusPx - innerRadiusPx - ringPadding) / 2);

        const rings = {
            1: { innerRadius: innerRadiusPx, outerRadius: innerRadiusPx + ringWidth },
            2: { innerRadius: innerRadiusPx + ringWidth + ringPadding, outerRadius: outerRadiusPx },
        };

        const parentKeys = parentNodes.map((node) => node.data.key);
        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(parentKeys).range(palette);

        const colorFor = (node: IPieHierarchyNode): string => {
            if (node.depth === 1) {
                return colorScale(node.data.key).toString();
            }

            const siblings = (node.parent?.children ?? []) as IPieHierarchyNode[];
            const index = siblings.indexOf(node);
            const t = siblings.length <= 1 ? 0 : index / siblings.length;

            return d3
                .hsl(colorScale(node.parent?.data.key).toString())
                .brighter(t * 1.4)
                .toString();
        };

        const arcGenerator = d3
            .arc<{ startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }>()
            .padAngle(padAngle)
            .cornerRadius(cornerRadius);

        const key = (node: IPieHierarchyNode) => `${node.depth}:${node.parent?.data.key}:${node.data.key}`;

        // D3 data join
        const join = d3.select(layer.current).selectAll<SVGPathElement, IPieHierarchyNode>(".pie-slice").data(allNodes, key);

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
            .style("fill", colorFor);

        // Update new and existing points
        const update = enter
            .merge(join)
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy)
            .attr("data-pad-angle", padAngle)
            .attr("data-corner-radius", cornerRadius)
            .style("opacity", theme.series.opacity)
            .style("fill", colorFor)
            .on("mouseover", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                const datum = node.data.datum;
                const color = colorFor(node) as IColor;
                const name = node.depth === 1 ? node.data.key : `${node.parent?.data.key} / ${node.data.key}`;

                onMouseOver && onMouseOver(datum, this, event);
                onFocus && onFocus({ element: this, event, datum });
                onTooltip && onTooltip({ datum, event, name, value: datum[y], color });
            })
            .on("mouseout", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(node.data.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(node.data.datum, this, event);
            })
            .transition("arc")
            .duration(animationDuration)
            .attrTween("d", function (node) {
                const { innerRadius: ringInner, outerRadius: ringOuter } = rings[node.depth as 1 | 2];
                const element = this as unknown as { _current?: IArcAngles };
                const previous = element._current || {
                    startAngle: node.x0,
                    endAngle: node.x0,
                    innerRadius: ringInner,
                    outerRadius: ringOuter,
                };
                const target = {
                    startAngle: node.x0,
                    endAngle: node.x1,
                    innerRadius: ringInner,
                    outerRadius: ringOuter,
                };
                element._current = target;

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
        x2,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        maxRadius,
        innerRadius,
        outerRadius,
        ringPadding,
        padAngle,
        cornerRadius,
        sort,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
    ]);

    return null;
}
