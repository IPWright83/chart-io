import { d3 } from "@chart-io/core";
import type { IColor, IData, IHierarchyNode, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { RadialDendrogramLabelsBase } from "./RadialDendrogramLabelsBase";
import { RadialDendrogramLinksBase } from "./RadialDendrogramLinksBase";
import { RadialDendrogramNodesBase } from "./RadialDendrogramNodesBase";
import { useRadialDendrogramLayout } from "./useRadialDendrogramLayout";

const CanvasRadialDendrogramLinks = withCanvas(RadialDendrogramLinksBase, "plot radial-dendrogram-links");
const SVGRadialDendrogramLinks = withSVG(RadialDendrogramLinksBase, "plot radial-dendrogram-links");
const CanvasRadialDendrogramNodes = withCanvas(RadialDendrogramNodesBase, "plot radial-dendrogram-nodes");
const SVGRadialDendrogramNodes = withSVG(RadialDendrogramNodesBase, "plot radial-dendrogram-nodes");
const CanvasRadialDendrogramLabels = withCanvas(RadialDendrogramLabelsBase, "plot radial-dendrogram-labels");
const SVGRadialDendrogramLabels = withSVG(RadialDendrogramLabelsBase, "plot radial-dendrogram-labels");

export interface IRadialDendrogramBaseProps {
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
 * Represents a RadialDendrogram plot, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from `categories`, radiating outward from the center with every leaf aligned at the same radius. Used
 * internally by `<Dendrogram radial>` - use that unless you need to compose the plot into a chart of
 * your own
 *
 * Computes the tree layout once (see `useRadialDendrogramLayout`) and renders the links, node circles
 * and labels as three separate plots, each with its own Canvas/SVG layer - the same way a multi-series
 * `<Scatter>` gets one layer per series - rather than combining them into a single layer/join
 * @param  props       The set of React properties
 * @return             The RadialDendrogramBase component
 */
export function RadialDendrogramBase({
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
}: IRadialDendrogramBaseProps) {
    const {
        allNodes,
        allLinks,
        px,
        py,
        radiusFor,
        colorFor,
        keyFor,
        ancestry,
        breadcrumb,
        linkGenerator,
        labelX,
        labelY,
        labelAnchor,
        focusedNode,
        cx,
        cy,
        zoomPath,
        zoomTo,
        legendKeys,
        legendColors,
    } = useRadialDendrogramLayout({ categories, value, nodeRadius, sort, labels, colors, buildHierarchy, zoomable });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const RadialDendrogramLinks = useCanvas ? CanvasRadialDendrogramLinks : SVGRadialDendrogramLinks;
    const RadialDendrogramNodes = useCanvas ? CanvasRadialDendrogramNodes : SVGRadialDendrogramNodes;
    const RadialDendrogramLabels = useCanvas ? CanvasRadialDendrogramLabels : SVGRadialDendrogramLabels;

    return (
        <React.Fragment>
            <RadialDendrogramLinks renderVirtualCanvas={renderVirtualCanvas} allLinks={allLinks} linkGenerator={linkGenerator} keyFor={keyFor} cx={cx} cy={cy} />
            <RadialDendrogramNodes
                renderVirtualCanvas={renderVirtualCanvas}
                value={value}
                allNodes={allNodes}
                px={px}
                py={py}
                radiusFor={radiusFor}
                colorFor={colorFor}
                keyFor={keyFor}
                breadcrumb={breadcrumb}
                ancestry={ancestry}
                focusedNode={focusedNode}
                zoomPath={zoomPath}
                zoomTo={zoomTo}
                zoomable={zoomable}
                interactive={interactive}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
            />
            <RadialDendrogramLabels
                renderVirtualCanvas={renderVirtualCanvas}
                labels={labels}
                allNodes={allNodes}
                labelX={labelX}
                labelY={labelY}
                labelAnchor={labelAnchor}
                keyFor={keyFor}
            />
        </React.Fragment>
    );
}
