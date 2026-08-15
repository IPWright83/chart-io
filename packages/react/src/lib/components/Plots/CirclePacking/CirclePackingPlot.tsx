import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IHierarchyNode, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../hooks";
import { withCanvas, withSVG } from "../../../hoc";

import { ILabelsPlotProps, LabelsPlot } from "../LabelsPlot";
import { INodesPlotProps, NodesPlot } from "../NodesPlot";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

import { ICirclePackingNode, useCirclePackingLayout } from "./useCirclePackingLayout";

const CanvasNodesPlot = withCanvas<INodesPlotProps<ICirclePackingNode>>(NodesPlot, "plot circle-packing-nodes");
const SVGNodesPlot = withSVG<INodesPlotProps<ICirclePackingNode>>(NodesPlot, "plot circle-packing-nodes");
const CanvasLabelsPlot = withCanvas<ILabelsPlotProps<ICirclePackingNode>>(LabelsPlot, "plot circle-packing-labels");
const SVGLabelsPlot = withSVG<ILabelsPlotProps<ICirclePackingNode>>(LabelsPlot, "plot circle-packing-labels");

export interface ICirclePackingPlotProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
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
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * Should a click on a non-leaf node zoom in and refocus on its subtree?
     * @default false
     */
    zoomable?: boolean;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a CirclePacking plot, nesting a circle per node of the hierarchy built from
 * `categories` inside its parent's circle, each sized proportionally to `value`. Used internally by
 * `<CirclePacking>` - use that unless you need to compose the plot into a chart of your own
 *
 * Computes the pack layout once (see `useCirclePackingLayout`) and renders the node circles and
 * labels via the generic `<NodesPlot>`/`<LabelsPlot>` components, each with its own Canvas/SVG layer -
 * the same way `<DendrogramPlot>` renders its links/nodes/labels
 * @param  props       The set of React properties
 * @return             The CirclePackingPlot component
 */
export function CirclePackingPlot({
    useCanvas = false,
    categories,
    value,
    renderVirtualCanvas,
    padding = 3,
    sort = false,
    colors,
    buildHierarchy,
    labels = true,
    showInLegend = true,
    interactive = true,
    zoomable = false,
    onMouseOver,
    onMouseOut,
    onClick,
}: ICirclePackingPlotProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));

    const { allNodes, labelledNodes, px, py, colorFor, keyFor, ancestry, breadcrumb, focusedNode, zoomPath, zoomTo, legendKeys, legendColors } =
        useCirclePackingLayout({ categories, value, padding, sort, colors, buildHierarchy, zoomable });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const handleMouseOver = (node: ICirclePackingNode, element: Element, event: MouseEvent) => {
        const datum = node.data.datum;
        const color = colorFor(node) as IColor;
        const name = breadcrumb(node);

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
    };

    const handleMouseOut = (node: ICirclePackingNode, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(node.data.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (node: ICirclePackingNode, element: Element, event: MouseEvent) => {
        onClick && onClick(node.data.datum, element, event);

        if (!zoomable) return;

        if (node === focusedNode) {
            zoomTo(zoomPath.slice(0, -1));
        } else if (node.children) {
            zoomTo(ancestry(node));
        }
    };

    const Nodes = useCanvas ? CanvasNodesPlot : SVGNodesPlot;
    const Labels = useCanvas ? CanvasLabelsPlot : SVGLabelsPlot;

    return (
        <React.Fragment>
            <Nodes
                renderVirtualCanvas={renderVirtualCanvas}
                className="circle-packing-node"
                items={allNodes}
                keyFor={keyFor}
                cx={px}
                cy={py}
                radius={(node) => node.r}
                color={colorFor}
                opacity={theme.series.opacity}
                stroke={theme.background.toString()}
                cursor={(node) => (interactive && (zoomable || node.children) ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            />
            <Labels
                renderVirtualCanvas={renderVirtualCanvas}
                className="circle-packing-label"
                items={labels ? labelledNodes : []}
                keyFor={keyFor}
                x={px}
                y={py}
                text={(node) => node.data.key}
                textAnchor={() => "middle"}
                color={theme.axis.stroke.toString()}
                fontSize={theme.font.size}
                fontFamily={theme.font.family}
            />
        </React.Fragment>
    );
}

CirclePackingPlot.requiresVirtualCanvas = true;
CirclePackingPlot.isPlot = true;
