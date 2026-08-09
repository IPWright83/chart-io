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

// The circular layout `<CirclePacking>` applies on top of the shared, un-laid-out hierarchy
type ICirclePackingNode = d3.HierarchyCircularNode<IHierarchyDatum>;

// The minimum circle radius, in pixels, a node needs before its label is shown - avoids clutter from
// labels that can't possibly fit inside their own circle
const MIN_LABEL_RADIUS = 20;

export interface ICirclePackingBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The ordered list of fields used to build each level of the hierarchy, outermost group first
     */
    categories: string[];
    /**
     * The key of the field used for the size of each leaf
     */
    value: string;
    /**
     * The gap, in pixels, to leave between sibling circles
     * @default 3
     */
    padding?: number;
    /**
     * Should the nodes be sorted by value (descending) rather than using the order of the data?
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
     * Should labels be shown on circles large enough to fit them?
     * @default true
     */
    labels?: boolean;
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
     * The x-coordinate of the left edge of the plot area. Provided by `withRectangularPlot`
     */
    plotLeft?: number;
    /**
     * The y-coordinate of the top edge of the plot area. Provided by `withRectangularPlot`
     */
    plotTop?: number;
    /**
     * The width, in pixels, available to the CirclePacking. Provided by `withRectangularPlot`
     */
    plotWidth?: number;
    /**
     * The height, in pixels, available to the CirclePacking. Provided by `withRectangularPlot`
     */
    plotHeight?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a CirclePacking plot, nesting a circle per node of the hierarchy built from
 * `categories` inside its parent's circle, each sized proportionally to `value`. Use
 * `<RectangularChart zoomable>` to let a click on a node zoom in and refocus on its subtree
 * @param  props       The set of React properties
 * @return             The CirclePacking plot component
 */
export function CirclePackingBase({
    categories,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    plotLeft,
    plotTop,
    plotWidth,
    plotHeight,
    padding = 3,
    sort = false,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    labels = true,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ICirclePackingBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
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
        ensureCombinationsAreUnique(data, categories, "CirclePacking");

        const hierarchy = buildHierarchy(data, categories, value, sort, "CirclePacking");

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
        const focusedNode = zoomTarget ? (hierarchy.descendants().find((node) => key(node) === zoomTarget) ?? hierarchy) : hierarchy;

        // Unlike d3.cluster()/d3.tree(), d3.pack() positions each node relative to its *actual*
        // parent's already-computed position (not just relative to whichever node the layout was
        // invoked on) - so if focusedNode still has a real .parent (which was never laid out, when
        // zoomed in), every position downstream comes out NaN. Detach it beforehand, laying out
        // focusedNode as a genuine root, then restore it so ancestry() still works for other nodes
        const originalParent = focusedNode.parent;
        focusedNode.parent = null;
        const layout = d3.pack<IHierarchyDatum>().size([plotWidth, plotHeight]).padding(padding)(focusedNode) as ICirclePackingNode;
        focusedNode.parent = originalParent;

        // Every node is drawn (unlike <Treemap>, which only draws leaves), in .descendants()'s
        // pre-order traversal - parents before their own children - so children paint on top of
        // (visually nest inside) their parent's own circle, both in SVG z-order and on Canvas
        const allNodes = layout.descendants().filter((node) => node.depth > 0) as ICirclePackingNode[];

        const px = (node: ICirclePackingNode) => plotLeft + node.x;
        const py = (node: ICirclePackingNode) => plotTop + node.y;

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: ICirclePackingNode) => colorHierarchyNode(node, (k) => colorScale(k));

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGCircleElement, ICirclePackingNode>(".circle-packing-node")
            .data(allNodes, key as (node: ICirclePackingNode) => string);

        // Exit nodes
        join.exit().remove();

        // Enter nodes, collapsed to zero radius at their final center so they grow into place
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "circle-packing-node")
            .attr("cx", (node) => px(node))
            .attr("cy", (node) => py(node))
            .attr("r", 0)
            .style("fill", colorFor);

        // Update new and existing nodes
        const update = enter
            .merge(join)
            .style("fill", colorFor)
            .style("opacity", theme.series.opacity)
            .style("cursor", (node) => (interactive && (zoomable || node.children) ? "pointer" : "default"))
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

                if (node === focusedNode) {
                    zoomTo(zoomPath.slice(0, -1));
                } else if (node.children) {
                    zoomTo(ancestry(node));
                }
            })
            .transition("circle-packing-node")
            .duration(animationDuration)
            .attr("cx", (node) => px(node))
            .attr("cy", (node) => py(node))
            .attr("r", (node) => node.r);

        // Text labels - kept as a separate, canvas-excluded selection since text isn't a shape
        // `renderElements` (the Canvas dispatcher) knows how to draw. Only leaves are labelled:
        // siblings never overlap in a d3.pack() layout, but a dominant child is packed concentrically
        // with its parent, so labelling both would stack the two labels on the same point
        if (labels) {
            const labelledNodes = allNodes.filter((node) => !node.children && node.r >= MIN_LABEL_RADIUS);
            const labelJoin = d3
                .select(layer.current)
                .selectAll<SVGTextElement, ICirclePackingNode>(".circle-packing-label")
                .data(labelledNodes, key as (node: ICirclePackingNode) => string);

            labelJoin.exit().remove();

            const labelEnter = labelJoin
                .enter()
                .append("text")
                .attr("class", "circle-packing-label")
                .attr("text-anchor", "middle")
                .attr("x", (node) => px(node))
                .attr("y", (node) => py(node))
                .attr("dy", 3)
                .style("font-size", theme.font.size)
                .style("font-family", theme.font.family)
                .style("fill", theme.axis.stroke.toString())
                .style("pointer-events", "none")
                .style("opacity", 0);

            labelEnter
                .merge(labelJoin)
                .text((node) => node.data.key)
                .transition()
                .duration(animationDuration)
                .attr("x", (node) => px(node))
                .attr("y", (node) => py(node))
                .style("opacity", 1);
        } else {
            d3.select(layer.current).selectAll(".circle-packing-label").remove();
        }

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
        sort,
        buildHierarchy,
        labels,
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
