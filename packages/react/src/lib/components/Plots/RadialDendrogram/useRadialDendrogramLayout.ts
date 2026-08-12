import {
    buildHierarchy as defaultBuildHierarchy,
    chartSelectors,
    colorHierarchyNode,
    d3,
    ensureCombinationsAreUnique,
    IState,
} from "@chart-io/core";
import type { IColor, IData, IHierarchyDatum, IHierarchyNode } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useZoom } from "../useZoom";

// The point layout `<Dendrogram radial>` applies on top of the shared, un-laid-out hierarchy. Unlike
// the linear layout, x/y are used directly as angle/radius, not swapped into pixel coordinates
export type IRadialDendrogramNode = d3.HierarchyPointNode<IHierarchyDatum>;
export type IRadialDendrogramLink = d3.HierarchyPointLink<IHierarchyDatum>;
export type IRadialDendrogramLinkGenerator = (link: {
    source: IRadialDendrogramNode;
    target: IRadialDendrogramNode;
}) => string | null;

export interface IUseRadialDendrogramLayoutProps {
    categories: string[];
    value: string;
    nodeRadius: number | [number, number];
    sort: boolean;
    labels: boolean;
    colors?: IColor[];
    buildHierarchy?: (
        data: IData,
        categories: string[],
        value: string,
        sort: boolean,
        componentName: string,
    ) => IHierarchyNode;
    zoomable: boolean;
}

/**
 * Computes the tree layout shared by a RadialDendrogram's links, nodes and labels - the hierarchy,
 * node/link positions, colors and zoom state - so it only runs once per render rather than being
 * repeated by each of the three, which instead just render from the values this returns. Reads
 * cx/cy/maxRadius directly from the chart's plot dimensions, rather than via `withRadialPlot`, since
 * that HOC also ties itself to a single Canvas/SVG layer - which no longer applies once links, nodes
 * and labels each have their own
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus zoom state and legend data
 */
export function useRadialDendrogramLayout({
    categories,
    value,
    nodeRadius,
    sort,
    labels,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    zoomable,
}: IUseRadialDendrogramLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const cx = useSelector((s: IState) => chartSelectors.dimensions.plot.cx(s));
    const cy = useSelector((s: IState) => chartSelectors.dimensions.plot.cy(s));
    const maxRadius = useSelector((s: IState) => chartSelectors.dimensions.plot.maxRadius(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
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

    const layout = useMemo(() => {
        ensureCombinationsAreUnique(data, categories, "RadialDendrogram");

        const hierarchy = buildHierarchy(data, categories, value, sort, "RadialDendrogram");

        // A node's ancestry (root excluded), e.g. ["North", "Widgets"]
        const ancestry = (node: IHierarchyNode) =>
            node
                .ancestors()
                .filter((n) => n.depth > 0)
                .reverse()
                .map((n) => n.data.key);

        // A node's ancestry uniquely identifies it, e.g. "North:Widgets" - named keyFor rather than
        // key since "key" is a reserved React prop name that gets stripped when passed down as one
        const keyFor = (node: IHierarchyNode) => ancestry(node).join(":");

        // The breadcrumb of category values leading to this node, e.g. "North / Widgets"
        const breadcrumb = (node: IHierarchyNode) => ancestry(node).join(" / ");

        // If zoomed in, lay out just the focused node's subtree - it stays a full member of the
        // original hierarchy (its ancestors are still reachable via .parent), only the layout treats
        // it as the root. Falls back to the full hierarchy if the path no longer matches (e.g. the
        // underlying data changed)
        const zoomTarget = zoomable && zoomPath.length > 0 ? zoomPath.join(":") : null;
        const focusedNode = zoomTarget ? (hierarchy.descendants().find((node) => keyFor(node) === zoomTarget) ?? hierarchy) : hierarchy;

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
        const clustered = d3.cluster<IHierarchyDatum>().size([2 * Math.PI, layoutRadius])(focusedNode) as IRadialDendrogramNode;
        const allNodes = clustered.descendants().filter((node) => node.depth > 0) as IRadialDendrogramNode[];
        const allLinks = clustered.links() as IRadialDendrogramLink[];

        // d3.cluster lays out with x as angle (0 to 2*PI) and y as radius - map that directly to a
        // pixel position, following the same angle convention (0 = up, clockwise) as Radar/RadialArea
        const px = (node: IRadialDendrogramNode) => cx + node.y * Math.sin(node.x);
        const py = (node: IRadialDendrogramNode) => cy - node.y * Math.cos(node.x);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: IRadialDendrogramNode) =>
            colorHierarchyNode(node, (k) => colorScale(k), theme.background.toString());

        const linkGenerator: IRadialDendrogramLinkGenerator = d3
            .linkRadial<unknown, IRadialDendrogramNode>()
            .angle((node) => node.x)
            .radius((node) => node.y);

        // Positioned further out along the same angle as their node, anchored away from the center
        // on either half of the circle
        const labelRadius = (node: IRadialDendrogramNode) => node.y + radiusFor(node) + 6;
        const labelX = (node: IRadialDendrogramNode) => cx + labelRadius(node) * Math.sin(node.x);
        const labelY = (node: IRadialDendrogramNode) => cy - labelRadius(node) * Math.cos(node.x);
        const labelAnchor = (node: IRadialDendrogramNode) => (Math.sin(node.x) >= 0 ? "start" : "end");

        return { allNodes, allLinks, px, py, radiusFor, colorFor, keyFor, ancestry, breadcrumb, linkGenerator, labelX, labelY, labelAnchor, focusedNode };
    }, [data, categories, value, sort, buildHierarchy, nodeRadius, labels, cx, cy, maxRadius, theme, legendKeys, palette, zoomable, zoomPath]);

    return { ...layout, cx, cy, zoomPath, zoomTo, legendKeys, legendColors };
}
