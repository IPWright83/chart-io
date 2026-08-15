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

// The circular layout `<CirclePacking>` applies on top of the shared, un-laid-out hierarchy
export type ICirclePackingNode = d3.HierarchyCircularNode<IHierarchyDatum>;

// The minimum circle radius, in pixels, a node needs before its label is shown - avoids clutter from
// labels that can't possibly fit inside their own circle
const MIN_LABEL_RADIUS = 20;

export interface IUseCirclePackingLayoutProps {
    categories: string[];
    value: string;
    padding: number;
    sort: boolean;
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
 * Computes the pack layout shared by a CirclePacking's nodes and labels - the hierarchy, node
 * positions, colors and zoom state - so it only runs once per render rather than being repeated by
 * each of the two, which instead just render from the values this returns
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus zoom state and legend data
 */
export function useCirclePackingLayout({
    categories,
    value,
    padding,
    sort,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    zoomable,
}: IUseCirclePackingLayoutProps) {
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
        ensureCombinationsAreUnique(data, categories, "CirclePacking");

        const hierarchy = buildHierarchy(data, categories, value, sort, "CirclePacking");

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

        // Unlike d3.cluster()/d3.tree(), d3.pack() positions each node relative to its *actual*
        // parent's already-computed position (not just relative to whichever node the layout was
        // invoked on) - so if focusedNode still has a real .parent (which was never laid out, when
        // zoomed in), every position downstream comes out NaN. Detach it beforehand, laying out
        // focusedNode as a genuine root, then restore it so ancestry() still works for other nodes
        const originalParent = focusedNode.parent;
        focusedNode.parent = null;
        const packed = d3.pack<IHierarchyDatum>().size([plotWidth, plotHeight]).padding(padding)(focusedNode) as ICirclePackingNode;
        focusedNode.parent = originalParent;

        // Every node is drawn (unlike <Treemap>, which only draws leaves), in .descendants()'s
        // pre-order traversal - parents before their own children - so children paint on top of
        // (visually nest inside) their parent's own circle, both in SVG z-order and on Canvas
        const allNodes = packed.descendants().filter((node) => node.depth > 0) as ICirclePackingNode[];

        // Siblings never overlap in a packed layout, but a dominant child is packed concentrically
        // with its parent, so labelling every level would stack group and leaf labels on the same
        // point - only leaves, large enough to plausibly fit the text, are labelled
        const labelledNodes = allNodes.filter((node) => !node.children && node.r >= MIN_LABEL_RADIUS);

        const px = (node: ICirclePackingNode) => plotLeft + node.x;
        const py = (node: ICirclePackingNode) => plotTop + node.y;

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: ICirclePackingNode) =>
            colorHierarchyNode(node, (k) => colorScale(k), theme.background.toString());

        return { allNodes, labelledNodes, px, py, colorFor, keyFor, ancestry, breadcrumb, focusedNode };
    }, [data, categories, value, sort, buildHierarchy, padding, plotLeft, plotTop, plotWidth, plotHeight, theme, legendKeys, palette, zoomable, zoomPath]);

    return { ...layout, zoomPath, zoomTo, legendKeys, legendColors };
}
