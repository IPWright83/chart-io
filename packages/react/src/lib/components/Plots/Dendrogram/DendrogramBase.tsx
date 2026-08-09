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

// The point layout `<Dendrogram>` applies on top of the shared, un-laid-out hierarchy
type IDendrogramNode = d3.HierarchyPointNode<IHierarchyDatum>;
type IDendrogramLink = d3.HierarchyPointLink<IHierarchyDatum>;

// Both the link and node-circle transitions below share this name so they can be re-selected as a
// single combined transition for Canvas rendering - see the `renderCanvas` call
const CANVAS_TRANSITION_NAME = "dendrogram";

export interface IDendrogramBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The ordered list of fields used to build each level of the hierarchy, outermost group first
     */
    categories: string[];
    /**
     * The key of the field used for the size of each leaf, shown in its tooltip
     */
    value: string;
    /**
     * The radius, in pixels, of each node's circle
     * @default 4
     */
    nodeRadius?: number;
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
     * Should node labels be shown?
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
     * The width, in pixels, available to the Dendrogram. Provided by `withRectangularPlot`
     */
    plotWidth?: number;
    /**
     * The height, in pixels, available to the Dendrogram. Provided by `withRectangularPlot`
     */
    plotHeight?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Dendrogram plot, a tree of nodes (built from `categories`) connected by links, laid out
 * left-to-right with every leaf aligned at the same depth. Use `<RectangularChart zoomable>` to let a
 * click on a node zoom in and refocus on its subtree
 * @param  props       The set of React properties
 * @return             The Dendrogram plot component
 */
export function DendrogramBase({
    categories,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    plotLeft,
    plotTop,
    plotWidth,
    plotHeight,
    nodeRadius = 4,
    sort = false,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    labels = true,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IDendrogramBaseProps) {
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
        ensureCombinationsAreUnique(data, categories, "Dendrogram");

        const hierarchy = buildHierarchy(data, categories, value, sort, "Dendrogram");

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

        // Reserve some space on the right for leaf labels (and the circle itself when labels are
        // off), so the deepest level doesn't land exactly on the plot's right edge
        const layoutWidth = Math.max(0, plotWidth - (labels ? 80 : nodeRadius + 4));
        const layout = d3.cluster<IHierarchyDatum>().size([plotHeight, layoutWidth])(focusedNode) as IDendrogramNode;
        const allNodes = layout.descendants().filter((node) => node.depth > 0) as IDendrogramNode[];
        const allLinks = layout.links() as IDendrogramLink[];

        // d3.cluster lays out with x as the spread axis and y as the depth axis - swap them so the
        // tree grows left-to-right rather than top-to-bottom
        const px = (node: IDendrogramNode) => plotLeft + node.y;
        const py = (node: IDendrogramNode) => plotTop + node.x;

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: IDendrogramNode) => colorHierarchyNode(node, (k) => colorScale(k));

        const linkGenerator = d3
            .linkHorizontal<unknown, IDendrogramNode>()
            .x((node) => px(node))
            .y((node) => py(node));

        // Links and node circles are combined into a single heterogeneous join (rather than two
        // separate joins) so a Canvas render has one Transition covering both, which it can paint
        // in one pass without the two element types clearing each other's drawing
        type IDendrogramElement =
            | { type: "link"; elementKey: string; link: IDendrogramLink }
            | { type: "node"; elementKey: string; node: IDendrogramNode };

        const elements: IDendrogramElement[] = [
            ...allLinks.map((link) => ({
                type: "link" as const,
                elementKey: `link:${key(link.source)}>${key(link.target)}`,
                link,
            })),
            ...allNodes.map((node) => ({ type: "node" as const, elementKey: `node:${key(node)}`, node })),
        ];

        const join = d3
            .select(layer.current)
            .selectAll<Element, IDendrogramElement>(".dendrogram-element")
            .data(elements, (d) => d.elementKey);

        join.exit().remove();

        // The element is created in the parent's own namespace (rather than always assuming SVG),
        // since in Canvas mode the "layer" is a detached, non-namespaced HTML element instead
        const enter = join
            .enter()
            .append(function (this: Element, d) {
                return document.createElementNS(this.namespaceURI, d.type === "link" ? "path" : "circle");
            })
            .attr("class", (d) => `dendrogram-element dendrogram-${d.type}`);

        enter
            .filter((d) => d.type === "link")
            .attr("data-path-type", "link")
            .attr("d", (d: IDendrogramElement & { type: "link" }) => linkGenerator({ source: d.link.target, target: d.link.target }))
            .style("fill", "none")
            .style("stroke", theme.axis.stroke.toString())
            .style("stroke-opacity", 0.4);

        enter
            .filter((d) => d.type === "node")
            .attr("cx", (d: IDendrogramElement & { type: "node" }) => px(d.node))
            .attr("cy", (d: IDendrogramElement & { type: "node" }) => py(d.node))
            .attr("r", 0);

        const update = enter
            .merge(join as any)
            .style("fill", (d) => (d.type === "node" ? colorFor(d.node) : "none"))
            .style("cursor", (d) =>
                d.type === "node" && interactive && (zoomable || d.node.children) ? "pointer" : "default",
            )
            .on("mouseover", function (event, d: IDendrogramElement) {
                // istanbul ignore next
                if (!interactive || d.type !== "node") return;

                const node = d.node;
                const datum = node.data.datum;
                const color = colorFor(node) as IColor;
                const name = breadcrumb(node);

                onMouseOver && onMouseOver(datum, this, event);
                onFocus && onFocus({ element: this, event, datum });
                onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
            })
            .on("mouseout", function (event, d: IDendrogramElement) {
                // istanbul ignore next
                if (!interactive || d.type !== "node") return;

                onMouseOut && onMouseOut(d.node.data.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d: IDendrogramElement) {
                // istanbul ignore next
                if (!interactive || d.type !== "node") return;

                const node = d.node;
                onClick && onClick(node.data.datum, this, event);

                if (!zoomable) return;

                if (node === focusedNode) {
                    zoomTo(zoomPath.slice(0, -1));
                } else if (node.children) {
                    zoomTo(ancestry(node));
                }
            });

        const transition = update.transition(CANVAS_TRANSITION_NAME).duration(animationDuration);

        transition
            .filter((d) => d.type === "link")
            .attr("data-x0", (d: IDendrogramElement & { type: "link" }) => px(d.link.source))
            .attr("data-y0", (d: IDendrogramElement & { type: "link" }) => py(d.link.source))
            .attr("data-x1", (d: IDendrogramElement & { type: "link" }) => px(d.link.target))
            .attr("data-y1", (d: IDendrogramElement & { type: "link" }) => py(d.link.target))
            .attr("d", (d: IDendrogramElement & { type: "link" }) => linkGenerator(d.link));

        transition
            .filter((d) => d.type === "node")
            .attr("cx", (d: IDendrogramElement & { type: "node" }) => px(d.node))
            .attr("cy", (d: IDendrogramElement & { type: "node" }) => py(d.node))
            .attr("r", nodeRadius);

        // Text labels - kept as a separate, canvas-excluded selection since text isn't a shape
        // `renderElements` (the Canvas dispatcher) knows how to draw
        if (labels) {
            const labelJoin = d3
                .select(layer.current)
                .selectAll<SVGTextElement, IDendrogramNode>(".dendrogram-label")
                .data(allNodes, key as (node: IDendrogramNode) => string);

            labelJoin.exit().remove();

            const labelEnter = labelJoin
                .enter()
                .append("text")
                .attr("class", "dendrogram-label")
                .attr("x", (node) => px(node) + nodeRadius + 4)
                .attr("y", (node) => py(node))
                .attr("dy", 3)
                .style("font-size", theme.font.size)
                .style("font-family", theme.font.family)
                .style("fill", theme.axis.stroke.toString())
                .style("opacity", 0);

            labelEnter
                .merge(labelJoin)
                .text((node) => node.data.key)
                .transition()
                .duration(animationDuration)
                .attr("x", (node) => px(node) + nodeRadius + 4)
                .attr("y", (node) => py(node))
                .style("opacity", 1);
        } else {
            d3.select(layer.current).selectAll(".dendrogram-label").remove();
        }

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition as unknown as d3.Transition<Element, unknown, any, unknown>);
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
        nodeRadius,
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
