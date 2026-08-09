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

import { useLegendItems, useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";
import { useZoom } from "../useZoom";

// The rectangular layout `<Treemap>` applies on top of the shared, un-laid-out hierarchy
type ITreemapNode = d3.HierarchyRectangularNode<IHierarchyDatum>;

export interface ITreemapBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The ordered list of fields used to build each level of the hierarchy, outermost group first.
     * For example `["region", "product"]` groups cells by region, then by product within each region
     */
    categories: string[];
    /**
     * The key of the field used for the size of each cell
     */
    value: string;
    /**
     * The gap, in pixels, to leave between cells, at every level of the hierarchy
     * @default 2
     */
    padding?: number;
    /**
     * The corner radius, in pixels, to apply to each cell
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the cells be sorted by value (descending) rather than using the order of the data?
     * @default false
     */
    sort?: boolean;
    /**
     * The set of colors to use for each top-level category. Defaults to the theme's series colors
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
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Treemap plot, subdividing the plot area into nested rectangles - one per leaf of the
 * hierarchy built from `categories` - sized proportionally to `value`
 * @param  props       The set of React properties
 * @return             The Treemap plot component
 */
export function TreemapBase({
    categories,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    padding = 2,
    cornerRadius = 0,
    sort = false,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ITreemapBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const { zoomable, path: zoomPath, zoomTo } = useZoom();

    // Only the top-level category is shown in the Legend, deeper levels can contain many more
    // values than is practical to list
    const topCategory = categories[0];
    const palette = colors ?? theme.series.colors;
    const legendKeys = useMemo(() => Array.from(new Set(data.map((d) => `${d[topCategory]}`))), [data, topCategory]);
    const legendColors = useMemo(
        () => legendKeys.map((_, index) => palette[index % palette.length]),
        [legendKeys, palette],
    );

    useLegendItems(legendKeys, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        ensureCombinationsAreUnique(data, categories, "Treemap");

        const hierarchy = buildHierarchy(data, categories, value, sort, "Treemap");

        // A node's ancestry (root excluded), e.g. ["North", "Widgets"]
        const ancestry = (node: IHierarchyNode) =>
            node
                .ancestors()
                .filter((n) => n.depth > 0)
                .reverse()
                .map((n) => n.data.key);

        // A node's ancestry uniquely identifies it, e.g. "North:Widgets"
        const key = (node: IHierarchyNode) => ancestry(node).join(":");

        // The breadcrumb of category values leading to this node, e.g. "North / Widgets"
        const breadcrumb = (node: IHierarchyNode) => ancestry(node).join(" / ");

        // If zoomed in, lay out just the focused node's subtree - it stays a full member of the
        // original hierarchy (its ancestors are still reachable via .parent), only the layout treats
        // it as the root. Falls back to the full hierarchy if the path no longer matches (e.g. the
        // underlying data changed)
        const zoomTarget = zoomable && zoomPath.length > 0 ? zoomPath.join(":") : null;
        const focusedNode = zoomTarget
            ? (hierarchy.descendants().find((node) => key(node) === zoomTarget) ?? hierarchy)
            : hierarchy;

        // d3.treemap() indexes an internal padding stack by each node's absolute `.depth` (fixed when
        // the hierarchy was built), assuming the node it's invoked on is depth 0 - so laying out a
        // zoomed-in node directly (whose depth reflects its real ancestry) produces NaN as soon as
        // padding is non-zero. Temporarily rebase every node in its subtree to be relative to itself.
        // `depth` is typed readonly (it's fixed for the life of a normal hierarchy) but is a plain
        // mutable property at runtime
        const subtree = focusedNode.descendants() as unknown as { depth: number }[];
        const depthOffset = focusedNode.depth;
        subtree.forEach((node) => (node.depth -= depthOffset));
        const layout = d3
            .treemap<IHierarchyDatum>()
            .size([plotWidth, plotHeight])
            .paddingInner(padding)(focusedNode) as ITreemapNode;
        subtree.forEach((node) => (node.depth += depthOffset));

        const leaves = layout.leaves() as ITreemapNode[];

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: ITreemapNode) =>
            colorHierarchyNode(node, (key) => colorScale(key), theme.background.toString());

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGRectElement, ITreemapNode>(".treemap-cell")
            .data(leaves, key as (node: ITreemapNode) => string);

        // Exit cells
        join.exit().remove();

        // Enter cells, collapsed to zero size at their final top-left corner so they grow into place
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "treemap-cell")
            .attr("x", (node) => plotLeft + node.x0)
            .attr("y", (node) => plotTop + node.y0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .style("fill", colorFor);

        // Update new and existing points
        const update = enter
            .merge(join)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
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

                if (!zoomable) return;

                // Only leaves are rendered, so a group's own cell is never directly clickable - the
                // natural equivalent is clicking any of its leaves. Clicking a leaf whose immediate
                // parent is already the focused node zooms back out one level; otherwise it zooms in
                // to that leaf's immediate parent
                const parent = node.parent as ITreemapNode;
                if (parent === focusedNode) {
                    zoomTo(zoomPath.slice(0, -1));
                } else if (parent && parent.depth > 0) {
                    zoomTo(ancestry(parent));
                }
            })
            .transition("treemap-cell")
            .duration(animationDuration)
            .attr("x", (node) => plotLeft + node.x0)
            .attr("y", (node) => plotTop + node.y0)
            .attr("width", (node) => Math.max(0, node.x1 - node.x0))
            .attr("height", (node) => Math.max(0, node.y1 - node.y0));

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
    }, [
        categories,
        value,
        data,
        canvas,
        renderVirtualCanvas,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        padding,
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
        zoomable,
        zoomPath,
        zoomTo,
    ]);

    return null;
}
