import {
    buildHierarchy as defaultBuildHierarchy,
    chartSelectors,
    colorHierarchyNode,
    d3,
    ensureCombinationsAreUnique,
    IState,
} from "@chart-io/core";
import type { IColor, IData, IHierarchyDatum, IHierarchyNode, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import type { IArcAngles } from "../interpolateArc";
import { interpolateArc } from "../interpolateArc";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";

// The rectangular layout `<StackedDonut>` applies on top of the shared, un-laid-out hierarchy
type IPieHierarchyNode = d3.HierarchyRectangularNode<IHierarchyDatum>;

export interface IStackedDonutBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The ordered list of fields used to build each ring of the hierarchy, from the innermost ring
     * outward. For example `["region", "product"]` produces a 2-ring donut, while
     * `["region", "product", "sku"]` produces a 3-ring sunburst
     */
    categories: string[];
    /**
     * The key of the field used for the value of each slice
     */
    value: string;
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
     * The gap, in pixels, to leave between each ring
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
     * Builds the hierarchy from the flat dataset, grouping/summing/sorting rows by `categories` and
     * `value`. Override this if your data doesn't fit that flat, group-by-fields shape - e.g. it's
     * already nested, or needs some custom aggregation - as long as the replacement returns an
     * equivalent (summed, optionally sorted) `d3.hierarchy`
     * @default buildHierarchy (from `@chart-io/core`)
     */
    buildHierarchy?: (
        data: IData,
        categories: string[],
        value: string,
        sort: boolean,
        componentName: string,
    ) => IHierarchyNode;
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
 * Represents a StackedDonut plot, an N-level radial subdivision (sunburst) of the fields listed in
 * `categories`, one ring per field, innermost ring first
 * @param  props       The set of React properties
 * @return             The StackedDonut plot component
 */
export function StackedDonutBase({
    categories,
    value,
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
    buildHierarchy = defaultBuildHierarchy,
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

    // Only the innermost ring's categories are shown in the Legend, the outer rings can
    // contain many more values than is practical to list
    const innermostCategory = categories[0];
    const palette = colors ?? theme.series.colors;
    const legendKeys = useMemo(
        () => Array.from(new Set(data.map((d) => `${d[innermostCategory]}`))),
        [data, innermostCategory],
    );
    const legendColors = useMemo(
        () => legendKeys.map((_, index) => palette[index % palette.length]),
        [legendKeys, palette],
    );

    useLegendItems(legendKeys, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        ensureCombinationsAreUnique(data, categories, "StackedDonut");

        const hierarchy = buildHierarchy(data, categories, value, sort, "StackedDonut");
        const root = d3.partition<IHierarchyDatum>().size([2 * Math.PI, 1])(hierarchy) as IPieHierarchyNode;
        const allNodes = root.descendants().filter((node) => node.depth > 0) as IPieHierarchyNode[];

        const levels = categories.length;
        const innerRadiusPx = innerRadius * maxRadius;
        const outerRadiusPx = outerRadius * maxRadius;
        const totalRingPadding = ringPadding * (levels - 1);
        const ringWidth = Math.max(0, (outerRadiusPx - innerRadiusPx - totalRingPadding) / levels);

        const rings: Record<number, { innerRadius: number; outerRadius: number }> = {};
        for (let depth = 1; depth <= levels; depth++) {
            const ringInner = innerRadiusPx + (depth - 1) * (ringWidth + ringPadding);
            rings[depth] = { innerRadius: ringInner, outerRadius: ringInner + ringWidth };
        }

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: IPieHierarchyNode) => colorHierarchyNode(node, (key) => colorScale(key));

        const arcGenerator = d3
            .arc<{ startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }>()
            .padAngle(padAngle)
            .cornerRadius(cornerRadius);

        // A node's ancestry (root excluded), e.g. ["North", "Widgets"]
        const ancestry = (node: IPieHierarchyNode) =>
            node
                .ancestors()
                .filter((n) => n.depth > 0)
                .reverse()
                .map((n) => n.data.key);

        // A node's ancestry uniquely identifies it, e.g. "North:Widgets"
        const key = (node: IPieHierarchyNode) => ancestry(node).join(":");

        // The breadcrumb of category values leading to this node, e.g. "North / Widgets"
        const breadcrumb = (node: IPieHierarchyNode) => ancestry(node).join(" / ");

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
                const name = breadcrumb(node);

                onMouseOver && onMouseOver(datum, this, event);
                onFocus && onFocus({ element: this, event, datum });
                onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
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
                const { innerRadius: ringInner, outerRadius: ringOuter } = rings[node.depth];
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
        categories,
        value,
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
        buildHierarchy,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
        legendKeys,
    ]);

    return null;
}
