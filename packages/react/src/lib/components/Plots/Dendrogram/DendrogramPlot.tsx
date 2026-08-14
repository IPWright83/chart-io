import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IHierarchyNode, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { ILabelsPlotProps, LabelsPlot } from "../LabelsPlot";
import { ILinksPlotProps, LinksPlot } from "../LinksPlot";
import { INodesPlotProps, NodesPlot } from "../NodesPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { IDendrogramLink, IDendrogramNode, useDendrogramLayout } from "./useDendrogramLayout";

const CanvasLinksPlot = withCanvas<ILinksPlotProps<IDendrogramLink>>(LinksPlot, "plot dendrogram-links");
const SVGLinksPlot = withSVG<ILinksPlotProps<IDendrogramLink>>(LinksPlot, "plot dendrogram-links");
const CanvasNodesPlot = withCanvas<INodesPlotProps<IDendrogramNode>>(NodesPlot, "plot dendrogram-nodes");
const SVGNodesPlot = withSVG<INodesPlotProps<IDendrogramNode>>(NodesPlot, "plot dendrogram-nodes");
const CanvasLabelsPlot = withCanvas<ILabelsPlotProps<IDendrogramNode>>(LabelsPlot, "plot dendrogram-labels");
const SVGLabelsPlot = withSVG<ILabelsPlotProps<IDendrogramNode>>(LabelsPlot, "plot dendrogram-labels");

export interface IDendrogramPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
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
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
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
 * Represents a Dendrogram plot, a tree of nodes (built from `categories`) connected by links, laid out
 * left-to-right with every leaf aligned at the same depth. Used internally by `<Dendrogram>` - use that
 * unless you need to compose the plot into a chart of your own
 *
 * Computes the tree layout once (see `useDendrogramLayout`) and renders the links, node circles and
 * labels via the generic `<LinksPlot>`/`<NodesPlot>`/`<LabelsPlot>` components, each with its own
 * Canvas/SVG layer - the same way a multi-series `<Scatter>` gets one layer per series
 * @param  props       The set of React properties
 * @return             The DendrogramPlot component
 */
export function DendrogramPlot({
    useCanvas = false,
    categories,
    value,
    renderVirtualCanvas,
    nodeRadius = 4,
    sort = false,
    colors,
    buildHierarchy,
    labels = true,
    showInLegend = false,
    interactive = true,
    zoomable = false,
    onMouseOver,
    onMouseOut,
    onClick,
}: IDendrogramPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const {
        allNodes,
        allLinks,
        px,
        py,
        labelY,
        radiusFor,
        colorFor,
        keyFor,
        ancestry,
        breadcrumb,
        linkGenerator,
        focusedNode,
        zoomPath,
        zoomTo,
        legendKeys,
        legendColors,
    } = useDendrogramLayout({ categories, value, nodeRadius, sort, labels, colors, buildHierarchy, zoomable });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleMouseOver = (node: IDendrogramNode, element: Element, event: MouseEvent) => {
        const datum = node.data.datum;
        const color = colorFor(node) as IColor;
        const name = breadcrumb(node);

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
    };

    const handleMouseOut = (node: IDendrogramNode, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(node.data.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (node: IDendrogramNode, element: Element, event: MouseEvent) => {
        onClick && onClick(node.data.datum, element, event);

        if (!zoomable) return;

        if (node === focusedNode) {
            zoomTo(zoomPath.slice(0, -1));
        } else if (node.children) {
            zoomTo(ancestry(node));
        }
    };

    const Links = useCanvas ? CanvasLinksPlot : SVGLinksPlot;
    const Nodes = useCanvas ? CanvasNodesPlot : SVGNodesPlot;
    const Labels = useCanvas ? CanvasLabelsPlot : SVGLabelsPlot;

    return (
        <React.Fragment>
            <Links
                renderVirtualCanvas={renderVirtualCanvas}
                className="dendrogram-link"
                pathType="link"
                items={allLinks}
                keyFor={(link) => `${keyFor(link.source)}>${keyFor(link.target)}`}
                path={linkGenerator}
                dataAttrs={[
                    { name: "data-x0", value: (link) => px(link.source) },
                    { name: "data-y0", value: (link) => py(link.source) },
                    { name: "data-x1", value: (link) => px(link.target) },
                    { name: "data-y1", value: (link) => py(link.target) },
                ]}
                stroke={theme.axis.stroke.toString()}
                strokeOpacity={0.4}
            />
            <Nodes
                renderVirtualCanvas={renderVirtualCanvas}
                className="dendrogram-node"
                items={allNodes}
                keyFor={keyFor}
                cx={px}
                cy={py}
                radius={radiusFor}
                color={colorFor}
                cursor={(node) => (interactive && (zoomable || node.children) ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            />
            <Labels
                className="dendrogram-label"
                items={labels ? allNodes : []}
                keyFor={keyFor}
                x={(node) => px(node) + radiusFor(node) + 4}
                y={labelY}
                text={(node) => node.data.key}
                color={theme.label.color.toString()}
                fontSize={theme.label.fontSize}
                fontFamily={theme.label.fontFamily}
            />
        </React.Fragment>
    );
}

DendrogramPlot.requiresVirtualCanvas = true;
DendrogramPlot.isPlot = true;
