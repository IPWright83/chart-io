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

// The point layout `<Dendrogram>` applies on top of the shared, un-laid-out hierarchy
export type IDendrogramNode = d3.HierarchyPointNode<IHierarchyDatum>;
export type IDendrogramLink = d3.HierarchyPointLink<IHierarchyDatum>;
export type IDendrogramLinkGenerator = (link: { source: IDendrogramNode; target: IDendrogramNode }) => string;

export interface IUseDendrogramLayoutProps {
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
 * Computes the tree layout shared by a Dendrogram's links, nodes and labels - the hierarchy, node/link
 * positions, colors and zoom state - so it only runs once per render rather than being repeated by each
 * of the three, which instead just render from the values this returns
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus zoom state and legend data
 */
export function useDendrogramLayout({
    categories,
    value,
    nodeRadius,
    sort,
    labels,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    zoomable,
}: IUseDendrogramLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
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
        ensureCombinationsAreUnique(data, categories, "Dendrogram");

        const hierarchy = buildHierarchy(data, categories, value, sort, "Dendrogram");

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
        const radiusFor = (node: IDendrogramNode) => (radiusScale ? radiusScale(node.value ?? 0) : (nodeRadius as number));

        // Reserve some space on the right for leaf labels (and the circle itself when labels are
        // off), so the deepest level doesn't land exactly on the plot's right edge
        const layoutWidth = Math.max(0, plotWidth - (labels ? 80 : maxNodeRadius + 4));
        const clustered = d3.cluster<IHierarchyDatum>().size([plotHeight, layoutWidth])(focusedNode) as IDendrogramNode;
        const allNodes = clustered.descendants().filter((node) => node.depth > 0) as IDendrogramNode[];
        const allLinks = clustered.links() as IDendrogramLink[];

        // d3.cluster lays out with x as the spread axis and y as the depth axis - swap them so the
        // tree grows left-to-right rather than top-to-bottom
        const px = (node: IDendrogramNode) => plotLeft + node.y;
        const py = (node: IDendrogramNode) => plotTop + node.x;

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: IDendrogramNode) =>
            colorHierarchyNode(node, (k) => colorScale(k), theme.background.toString());

        const linkGenerator: IDendrogramLinkGenerator = d3
            .linkHorizontal<unknown, IDendrogramNode>()
            .x((node) => px(node))
            .y((node) => py(node));

        // A non-leaf node's label sits right where its own link to its children begins, so nudge it
        // up slightly to keep the link from running straight through the text. Leaf labels don't need
        // this - nothing continues on past them
        const labelY = (node: IDendrogramNode) => py(node) - (node.children ? 8 : 0);

        return { allNodes, allLinks, px, py, labelY, radiusFor, colorFor, keyFor, ancestry, breadcrumb, linkGenerator, focusedNode };
    }, [data, categories, value, sort, buildHierarchy, nodeRadius, labels, plotLeft, plotTop, plotWidth, plotHeight, theme, legendKeys, palette, zoomable, zoomPath]);

    return { ...layout, zoomPath, zoomTo, legendKeys, legendColors };
}
