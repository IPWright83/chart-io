import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IOnClick, IOnMouseOut, IOnMouseOver, ISankeyGraphData } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { ILabelsPlotProps, LabelsPlot } from "../LabelsPlot";
import { ILinksPlotProps, LinksPlot } from "../LinksPlot";
import { IRectsPlotProps, RectsPlot } from "../RectsPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { ISankeyLink, ISankeyNode, useSankeyLayout } from "./useSankeyLayout";

const CanvasLinksPlot = withCanvas<ILinksPlotProps<ISankeyLink>>(LinksPlot, "plot sankey-links");
const SVGLinksPlot = withSVG<ILinksPlotProps<ISankeyLink>>(LinksPlot, "plot sankey-links");
const CanvasNodesPlot = withCanvas<IRectsPlotProps<ISankeyNode>>(RectsPlot, "plot sankey-nodes");
const SVGNodesPlot = withSVG<IRectsPlotProps<ISankeyNode>>(RectsPlot, "plot sankey-nodes");
const CanvasLabelsPlot = withCanvas<ILabelsPlotProps<ISankeyNode>>(LabelsPlot, "plot sankey-labels");
const SVGLabelsPlot = withSVG<ILabelsPlotProps<ISankeyNode>>(LabelsPlot, "plot sankey-labels");

// A link's flow is drawn semi-transparent, matching a Dendrogram's connectors, so overlapping flows
// stay distinguishable from one another rather than blending into a single solid band
const LINK_OPACITY = 0.4;

export interface ISankeyPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The ordered list of fields used to build each column of nodes, first column first. Each row
     * flows through its fields left-to-right, contributing `value` to the link between every
     * consecutive pair of columns
     */
    categories: string[];
    /**
     * The key of the field used for the size of each flow, shown in its tooltip
     */
    value: string;
    /**
     * The width, in pixels, of each node's rectangle
     * @default 16
     */
    nodeWidth?: number;
    /**
     * The minimum vertical gap, in pixels, between nodes in the same column
     * @default 12
     */
    nodePadding?: number;
    /**
     * The corner radius, in pixels, to apply to each node's rectangle
     * @default 0
     */
    cornerRadius?: number;
    /**
     * The set of colors to use for each first-column node. Every other node takes the color of
     * whichever incoming flow contributes the most value to it. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
    /**
     * Builds the node/link graph from the flat dataset, aggregating rows by `categories` and `value`.
     * Override this if your data doesn't fit that flat, group-by-fields shape - e.g. it's already a
     * graph of nodes/links - as long as the replacement returns an equivalent graph
     * @default buildSankeyGraph (from `@chart-io/core`)
     */
    buildSankeyGraph?: (
        data: IData,
        categories: string[],
        value: string,
        componentName: string,
    ) => ISankeyGraphData;
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
     * Should this series feature in the Legend? Off by default - with every node labelled, the legend
     * is often redundant
     * @default false
     */
    showInLegend?: boolean;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Sankey plot, a set of nodes (built from `categories`) arranged in columns and connected
 * by flows sized proportionally to `value`. Used internally by `<Sankey>` - use that unless you need to
 * compose the plot into a chart of your own
 *
 * Computes the Sankey layout once (see `useSankeyLayout`) and renders the flows, node rectangles and
 * labels via the generic `<LinksPlot>`/`<RectsPlot>`/`<LabelsPlot>` components, each with its own
 * Canvas/SVG layer - the same way `<DendrogramPlot>` composes `<LinksPlot>`/`<NodesPlot>`/`<LabelsPlot>`
 * @param  props       The set of React properties
 * @return             The SankeyPlot component
 */
export function SankeyPlot({
    useCanvas = false,
    categories,
    value,
    renderVirtualCanvas,
    nodeWidth = 16,
    nodePadding = 12,
    cornerRadius = 0,
    colors,
    buildSankeyGraph,
    labels = true,
    showInLegend = false,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ISankeyPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const { allNodes, allLinks, keyFor, linkKeyFor, colorFor, linkGenerator, labelX, labelY, labelAnchor, legendKeys, legendColors } =
        useSankeyLayout({ categories, value, nodeWidth, nodePadding, colors, buildSankeyGraph });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleNodeMouseOver = (node: ISankeyNode, element: Element, event: MouseEvent) => {
        const datum = node.datum;
        const color = colorFor(node) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name: node.key, value: node.value ?? 0, color });
    };

    const handleNodeMouseOut = (node: ISankeyNode, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(node.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    // A synthetic datum for a link, in the same spirit as a Sankey node's - there's no single row that
    // represents a (possibly summed) flow between two columns
    const linkDatum = (link: ISankeyLink) => {
        const source = link.source as ISankeyNode;
        const target = link.target as ISankeyNode;

        return { [categories[source.level]]: source.key, [categories[target.level]]: target.key, [value]: link.value };
    };

    const handleLinkMouseOver = (link: ISankeyLink, element: Element, event: MouseEvent) => {
        const source = link.source as ISankeyNode;
        const target = link.target as ISankeyNode;
        const datum = linkDatum(link);
        const color = colorFor(source) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name: `${source.key} → ${target.key}`, value: link.value, color });
    };

    const handleLinkMouseOut = (link: ISankeyLink, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(linkDatum(link), element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const Links = useCanvas ? CanvasLinksPlot : SVGLinksPlot;
    const Nodes = useCanvas ? CanvasNodesPlot : SVGNodesPlot;
    const Labels = useCanvas ? CanvasLabelsPlot : SVGLabelsPlot;

    return (
        <React.Fragment>
            <Links
                renderVirtualCanvas={renderVirtualCanvas}
                className="sankey-link"
                pathType="link"
                items={allLinks}
                keyFor={linkKeyFor}
                path={linkGenerator}
                dataAttrs={[
                    { name: "data-x0", value: (link) => (link.source as ISankeyNode).x1 ?? 0 },
                    { name: "data-y0", value: (link) => link.y0 ?? 0 },
                    { name: "data-x1", value: (link) => (link.target as ISankeyNode).x0 ?? 0 },
                    { name: "data-y1", value: (link) => link.y1 ?? 0 },
                ]}
                stroke={(link) => colorFor(link.source as ISankeyNode)}
                strokeWidth={(link) => Math.max(1, link.width ?? 0)}
                strokeOpacity={LINK_OPACITY}
                cursor={() => (interactive ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleLinkMouseOver}
                onMouseOut={handleLinkMouseOut}
                onClick={(link, element, event) => onClick && onClick(linkDatum(link), element, event)}
            />
            <Nodes
                renderVirtualCanvas={renderVirtualCanvas}
                className="sankey-node"
                items={allNodes}
                keyFor={keyFor}
                x={(node) => node.x0 ?? 0}
                y={(node) => node.y0 ?? 0}
                width={(node) => (node.x1 ?? 0) - (node.x0 ?? 0)}
                height={(node) => (node.y1 ?? 0) - (node.y0 ?? 0)}
                color={colorFor}
                cornerRadius={cornerRadius}
                opacity={theme.series.opacity}
                cursor={() => (interactive ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleNodeMouseOver}
                onMouseOut={handleNodeMouseOut}
                onClick={(node, element, event) => onClick && onClick(node.datum, element, event)}
            />
            <Labels
                className="sankey-label"
                items={labels ? allNodes : []}
                keyFor={keyFor}
                x={labelX}
                y={labelY}
                text={(node) => node.key}
                textAnchor={labelAnchor}
                color={theme.label.color.toString()}
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
            />
        </React.Fragment>
    );
}

SankeyPlot.requiresVirtualCanvas = true;
SankeyPlot.isPlot = true;
