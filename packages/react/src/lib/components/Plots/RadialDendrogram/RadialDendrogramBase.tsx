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

// The point layout `<Dendrogram radial>` applies on top of the shared, un-laid-out hierarchy. Unlike
// the linear layout, x/y are used directly as angle/radius, not swapped into pixel coordinates
type IRadialDendrogramNode = d3.HierarchyPointNode<IHierarchyDatum>;
type IRadialDendrogramLink = d3.HierarchyPointLink<IHierarchyDatum>;

const CANVAS_TRANSITION_NAME = "radial-dendrogram";

export interface IRadialDendrogramBaseProps {
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
     * The radius, in pixels, of each node's circle. Pass a `[min, max]` tuple instead of a fixed
     * number to scale each node's circle by its own value (summed from its descendants) - the
     * smallest node in the hierarchy gets `min`, the largest gets `max`, and everything else is
     * scaled proportionally by area (`d3.scaleSqrt`) in between
     * @default 4
     */
    nodeRadius?: number | [number, number];
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
     * Should this series feature in the Legend? Off by default - with every node drawn (unlike
     * `<Treemap>`), node labels already identify each value, so the legend is often redundant
     * @default false
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
     * The x-coordinate of the center of the RadialDendrogram. Provided by `withRadialPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the RadialDendrogram. Provided by `withRadialPlot`
     */
    cy?: number;
    /**
     * The maximum radius, in pixels, available to the RadialDendrogram. Provided by `withRadialPlot`
     */
    maxRadius?: number;
    /**
     * Should a click on a node zoom in and refocus on its subtree?
     * @default false
     */
    zoomable?: boolean;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a RadialDendrogram plot, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from `categories`, radiating outward from the center with every leaf aligned at the same radius. Used
 * internally by `<Dendrogram radial>` - use that unless you need to compose the plot into a chart of
 * your own
 * @param  props       The set of React properties
 * @return             The RadialDendrogramPlot component
 */
export function RadialDendrogramBase({
    categories,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    maxRadius,
    nodeRadius = 4,
    sort = false,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    labels = true,
    showInLegend = false,
    interactive = true,
    zoomable = false,
    onMouseOver,
    onMouseOut,
    onClick,
}: IRadialDendrogramBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const { path: zoomPath, zoomTo } = useZoom(zoomable);

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

        ensureCombinationsAreUnique(data, categories, "RadialDendrogram");

        const hierarchy = buildHierarchy(data, categories, value, sort, "RadialDendrogram");

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

        // A fixed nodeRadius applies to every node the same; a [min, max] tuple instead scales each
        // node's circle by its own (descendant-summed) value, proportional by area
        const maxNodeRadius = Array.isArray(nodeRadius) ? nodeRadius[1] : nodeRadius;
        const radiusScale = Array.isArray(nodeRadius)
            ? d3.scaleSqrt().domain([0, hierarchy.value ?? 0]).range(nodeRadius)
            : null;
        const radiusFor = (node: IRadialDendrogramNode) => (radiusScale ? radiusScale(node.value ?? 0) : (nodeRadius as number));

        // Reserve some space at the outer edge for leaf labels (and the circle itself when labels
        // are off), so the deepest level doesn't land exactly on the plot's outer boundary
        const layoutRadius = Math.max(0, maxRadius - (labels ? 60 : maxNodeRadius + 4));
        const layout = d3.cluster<IHierarchyDatum>().size([2 * Math.PI, layoutRadius])(focusedNode) as IRadialDendrogramNode;
        const allNodes = layout.descendants().filter((node) => node.depth > 0) as IRadialDendrogramNode[];
        const allLinks = layout.links() as IRadialDendrogramLink[];

        // d3.cluster lays out with x as angle (0 to 2*PI) and y as radius - map that directly to a
        // pixel position, following the same angle convention (0 = up, clockwise) as Radar/RadialArea
        const px = (node: IRadialDendrogramNode) => cx + node.y * Math.sin(node.x);
        const py = (node: IRadialDendrogramNode) => cy - node.y * Math.cos(node.x);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: IRadialDendrogramNode) =>
            colorHierarchyNode(node, (k) => colorScale(k), theme.background.toString());

        const linkGenerator = d3
            .linkRadial<unknown, IRadialDendrogramNode>()
            .angle((node) => node.x)
            .radius((node) => node.y);

        // Positioned further out along the same angle as their node, anchored away from the center
        // on either half of the circle
        const labelRadius = (node: IRadialDendrogramNode) => node.y + radiusFor(node) + 6;
        const labelX = (node: IRadialDendrogramNode) => cx + labelRadius(node) * Math.sin(node.x);
        const labelY = (node: IRadialDendrogramNode) => cy - labelRadius(node) * Math.cos(node.x);
        const labelAnchor = (node: IRadialDendrogramNode) => (Math.sin(node.x) >= 0 ? "start" : "end");

        // Links, node circles and labels are combined into a single heterogeneous join (rather than
        // separate joins) so a Canvas render has one Transition covering all three, which it can
        // paint in one pass without the element types clearing each other's drawing - this is also
        // what lets labels show up on Canvas at all, since `renderElements` (the Canvas dispatcher)
        // only draws elements it finds in this join
        type IRadialDendrogramElement =
            | { type: "link"; elementKey: string; link: IRadialDendrogramLink }
            | { type: "node"; elementKey: string; node: IRadialDendrogramNode }
            | { type: "label"; elementKey: string; node: IRadialDendrogramNode };

        const elements: IRadialDendrogramElement[] = [
            ...allLinks.map((link) => ({
                type: "link" as const,
                elementKey: `link:${key(link.source)}>${key(link.target)}`,
                link,
            })),
            ...allNodes.map((node) => ({ type: "node" as const, elementKey: `node:${key(node)}`, node })),
            ...(labels
                ? allNodes.map((node) => ({ type: "label" as const, elementKey: `label:${key(node)}`, node }))
                : []),
        ];

        const join = d3
            .select(layer.current)
            .selectAll<Element, IRadialDendrogramElement>(".radial-dendrogram-element")
            .data(elements, (d) => d.elementKey);

        join.exit().remove();

        // The element is created in the parent's own namespace (rather than always assuming SVG),
        // since in Canvas mode the "layer" is a detached, non-namespaced HTML element instead
        const enter = join
            .enter()
            .append(function (this: Element, d) {
                const tagName = d.type === "link" ? "path" : d.type === "label" ? "text" : "circle";
                return document.createElementNS(this.namespaceURI, tagName);
            })
            .attr("class", (d) => `radial-dendrogram-element radial-dendrogram-${d.type}`);

        enter
            .filter((d) => d.type === "link")
            .attr("data-path-type", "link-radial")
            .attr(
                "d",
                (d: IRadialDendrogramElement & { type: "link" }) =>
                    linkGenerator({ source: d.link.target, target: d.link.target }) ?? "",
            )
            .style("fill", "none")
            .style("stroke", theme.axis.stroke.toString())
            .style("stroke-opacity", 0.4);

        enter
            .filter((d) => d.type === "node")
            .attr("cx", (d: IRadialDendrogramElement & { type: "node" }) => px(d.node))
            .attr("cy", (d: IRadialDendrogramElement & { type: "node" }) => py(d.node))
            .attr("r", 0);

        enter
            .filter((d) => d.type === "label")
            .attr("x", (d: IRadialDendrogramElement & { type: "label" }) => labelX(d.node))
            .attr("y", (d: IRadialDendrogramElement & { type: "label" }) => labelY(d.node))
            .attr("dy", 3)
            .style("font-size", theme.label.fontSize)
            .style("font-family", theme.label.fontFamily)
            .style("fill", theme.label.color.toString())
            .style("opacity", 0);

        const update = enter
            .merge(join as any)
            .style("fill", (d) => (d.type === "node" ? colorFor(d.node) : d.type === "label" ? theme.label.color.toString() : "none"))
            .style("cursor", (d) =>
                d.type === "node" && interactive && (zoomable || d.node.children) ? "pointer" : "default",
            )
            .on("mouseover", function (event, d: IRadialDendrogramElement) {
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
            .on("mouseout", function (event, d: IRadialDendrogramElement) {
                // istanbul ignore next
                if (!interactive || d.type !== "node") return;

                onMouseOut && onMouseOut(d.node.data.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d: IRadialDendrogramElement) {
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

        // The center point can change across renders (e.g. the chart resizing), so it's refreshed
        // here rather than only set once at enter
        update
            .filter((d) => d.type === "link")
            .attr("transform", `translate(${cx}, ${cy})`)
            .attr("data-cx", cx)
            .attr("data-cy", cy);

        // .text()/.attr("text-anchor") have to be applied outside the transition - they're not
        // interpolatable/animatable, and calling them on a transition throws
        update
            .filter((d) => d.type === "label")
            .text((d: IRadialDendrogramElement & { type: "label" }) => d.node.data.key)
            .attr("text-anchor", (d: IRadialDendrogramElement & { type: "label" }) => labelAnchor(d.node));

        const transition = update.transition(CANVAS_TRANSITION_NAME).duration(animationDuration);

        transition
            .filter((d) => d.type === "link")
            .attr("data-angle0", (d: IRadialDendrogramElement & { type: "link" }) => d.link.source.x)
            .attr("data-radius0", (d: IRadialDendrogramElement & { type: "link" }) => d.link.source.y)
            .attr("data-angle1", (d: IRadialDendrogramElement & { type: "link" }) => d.link.target.x)
            .attr("data-radius1", (d: IRadialDendrogramElement & { type: "link" }) => d.link.target.y)
            .attr("d", (d: IRadialDendrogramElement & { type: "link" }) => linkGenerator(d.link) ?? "");

        transition
            .filter((d) => d.type === "node")
            .attr("cx", (d: IRadialDendrogramElement & { type: "node" }) => px(d.node))
            .attr("cy", (d: IRadialDendrogramElement & { type: "node" }) => py(d.node))
            .attr("r", (d: IRadialDendrogramElement & { type: "node" }) => radiusFor(d.node));

        transition
            .filter((d) => d.type === "label")
            .attr("x", (d: IRadialDendrogramElement & { type: "label" }) => labelX(d.node))
            .attr("y", (d: IRadialDendrogramElement & { type: "label" }) => labelY(d.node))
            .style("opacity", 1);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition as unknown as d3.Transition<Element, unknown, any, unknown>);
    }, [
        categories,
        value,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        maxRadius,
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
