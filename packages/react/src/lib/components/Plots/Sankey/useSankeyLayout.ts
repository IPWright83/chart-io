import {
    buildSankeyGraph as defaultBuildSankeyGraph,
    chartSelectors,
    d3,
    IState,
} from "@chart-io/core";
import type { IColor, IData, ISankeyGraphData, ISankeyLinkDatum, ISankeyNodeDatum } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

// The Sankey layout `<Sankey>` applies on top of the shared, un-laid-out graph
export type ISankeyNode = d3.SankeyNode<ISankeyNodeDatum, ISankeyLinkDatum>;
export type ISankeyLink = d3.SankeyLink<ISankeyNodeDatum, ISankeyLinkDatum>;

/**
 * Runs the Sankey layout, positioning every node/link within `extent`. d3.sankey() throws (rather
 * than laying out an empty diagram) when there are no nodes - e.g. on the first render, before
 * `<Chart>`'s data effect has populated the store - so that case is short-circuited here instead
 * @param  graph          The un-laid-out node/link graph
 * @param  nodeWidth      The width, in pixels, of each node's rectangle
 * @param  nodePadding    The minimum vertical gap, in pixels, between nodes in the same column
 * @param  extent         The `[[x0, y0], [x1, y1]]` pixel bounds to lay the diagram out within
 * @return                The laid-out nodes and links
 */
function layoutSankeyGraph(
    graph: ISankeyGraphData,
    nodeWidth: number,
    nodePadding: number,
    extent: [[number, number], [number, number]],
): { allNodes: ISankeyNode[]; allLinks: ISankeyLink[] } {
    if (graph.nodes.length === 0) {
        return { allNodes: [], allLinks: [] };
    }

    const sankeyGenerator = d3
        .sankey<ISankeyNodeDatum, ISankeyLinkDatum>()
        .nodeId((node) => node.id)
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .extent(extent);

    const { nodes, links } = sankeyGenerator({
        nodes: graph.nodes.map((node) => ({ ...node })),
        links: graph.links.map((link) => ({ ...link })),
    });

    return { allNodes: nodes as ISankeyNode[], allLinks: links as ISankeyLink[] };
}

export interface IUseSankeyLayoutProps {
    categories: string[];
    value: string;
    nodeWidth: number;
    nodePadding: number;
    colors?: IColor[];
    buildSankeyGraph?: (data: IData, categories: string[], value: string, componentName: string) => ISankeyGraphData;
}

/**
 * Computes the Sankey layout shared by a Sankey's links, node rects and labels - the graph, node/link
 * positions and colors - so it only runs once per render rather than being repeated by each of the
 * three, which instead just render from the values this returns
 * @param  props       The set of properties needed to build the layout
 * @return             The computed layout, plus legend data
 */
export function useSankeyLayout({
    categories,
    value,
    nodeWidth,
    nodePadding,
    colors,
    buildSankeyGraph = defaultBuildSankeyGraph,
}: IUseSankeyLayoutProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    // Only the first category is shown in the Legend, deeper levels can contain many more values
    // than is practical to list
    const topCategory = categories[0];
    const palette = colors ?? theme.series.colors;
    const legendKeys = useMemo(() => Array.from(new Set(data.map((d) => `${d[topCategory]}`))), [data, topCategory]);
    const legendColors = useMemo(
        () => legendKeys.map((_, index) => palette[index % palette.length]),
        [legendKeys, palette],
    );

    const layout = useMemo(() => {
        const graph = buildSankeyGraph(data, categories, value, "Sankey");
        const { allNodes, allLinks } = layoutSankeyGraph(graph, nodeWidth, nodePadding, [
            [plotLeft, plotTop],
            [plotLeft + plotWidth, plotTop + plotHeight],
        ]);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);

        // Unlike a hierarchy, a Sankey node can have several incoming links (parents), so there's no
        // single parent color to inherit - instead each node takes the color of whichever incoming
        // link contributes the most value to it, recursively back to a first-column node (which has
        // no incoming links, and takes its own color from the palette instead)
        const colorCache = new Map<string, string>();
        const colorFor = (node: ISankeyNode): string => {
            const cached = colorCache.get(node.id);
            if (cached) return cached;

            const dominantLink = (node.targetLinks ?? []).reduce<ISankeyLink | null>(
                (dominant, link) => (!dominant || link.value > dominant.value ? link : dominant),
                null,
            );

            const color = dominantLink ? colorFor(dominantLink.source as ISankeyNode) : colorScale(node.key).toString();
            colorCache.set(node.id, color);

            return color;
        };

        const keyFor = (node: ISankeyNode) => node.id;
        const linkKeyFor = (link: ISankeyLink) => `${(link.source as ISankeyNode).id}>${(link.target as ISankeyNode).id}`;

        const linkGenerator = d3.sankeyLinkHorizontal<ISankeyNodeDatum, ISankeyLinkDatum>();

        // A node with no outgoing links is the last one in its flow, so its label sits to the left
        // of it (reading into the node) rather than to the right (reading out of it), like every
        // other node's label does
        const isTerminal = (node: ISankeyNode) => (node.sourceLinks?.length ?? 0) === 0;
        const labelX = (node: ISankeyNode) => (isTerminal(node) ? (node.x0 ?? 0) - 6 : (node.x1 ?? 0) + 6);
        const labelY = (node: ISankeyNode) => ((node.y0 ?? 0) + (node.y1 ?? 0)) / 2;
        const labelAnchor = (node: ISankeyNode) => (isTerminal(node) ? "end" : "start");

        return {
            allNodes,
            allLinks,
            keyFor,
            linkKeyFor,
            colorFor,
            linkGenerator,
            labelX,
            labelY,
            labelAnchor,
        };
    }, [
        data,
        categories,
        value,
        buildSankeyGraph,
        nodeWidth,
        nodePadding,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        legendKeys,
        palette,
    ]);

    return { ...layout, legendKeys, legendColors };
}
