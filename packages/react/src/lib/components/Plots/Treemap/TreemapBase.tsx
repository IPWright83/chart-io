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

// The rectangular layout `<Treemap>` applies on top of the shared, un-laid-out hierarchy
type ITreemapNode = d3.HierarchyRectangularNode<IHierarchyDatum>;

export interface ITreemapBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The ordered list of fields used to build each level of the hierarchy, outermost group first.
     * For example `["region", "product"]` groups cells by region, then by product within each region
     */
    categories: string[];
    /**
     * The key of the field used for the size of each cell
     */
    value: string;
    /**
     * The gap, in pixels, to leave between cells, at every level of the hierarchy
     * @default 2
     */
    padding?: number;
    /**
     * The corner radius, in pixels, to apply to each cell
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Should the cells be sorted by value (descending) rather than using the order of the data?
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
     * The width, in pixels, available to the Treemap. Provided by `withRectangularPlot`
     */
    plotWidth?: number;
    /**
     * The height, in pixels, available to the Treemap. Provided by `withRectangularPlot`
     */
    plotHeight?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a Treemap plot, subdividing the plot area into nested rectangles - one per leaf of the
 * hierarchy built from `categories` - sized proportionally to `value`
 * @param  props       The set of React properties
 * @return             The Treemap plot component
 */
export function TreemapBase({
    categories,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    plotLeft,
    plotTop,
    plotWidth,
    plotHeight,
    padding = 2,
    cornerRadius = 0,
    sort = false,
    colors,
    buildHierarchy = defaultBuildHierarchy,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ITreemapBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

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
        ensureCombinationsAreUnique(data, categories, "Treemap");

        const hierarchy = buildHierarchy(data, categories, value, sort, "Treemap");
        const layout = d3
            .treemap<IHierarchyDatum>()
            .size([plotWidth, plotHeight])
            .paddingInner(padding)(hierarchy) as ITreemapNode;
        const leaves = layout.leaves() as ITreemapNode[];

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (node: ITreemapNode) => colorHierarchyNode(node, (key) => colorScale(key));

        // A node's ancestry (root excluded), e.g. ["North", "Widgets"]
        const ancestry = (node: ITreemapNode) =>
            node
                .ancestors()
                .filter((n) => n.depth > 0)
                .reverse()
                .map((n) => n.data.key);

        // A node's ancestry uniquely identifies it, e.g. "North:Widgets"
        const key = (node: ITreemapNode) => ancestry(node).join(":");

        // The breadcrumb of category values leading to this node, e.g. "North / Widgets"
        const breadcrumb = (node: ITreemapNode) => ancestry(node).join(" / ");

        // D3 data join
        const join = d3.select(layer.current).selectAll<SVGRectElement, ITreemapNode>(".treemap-cell").data(leaves, key);

        // Exit cells
        join.exit().remove();

        // Enter cells, collapsed to zero size at their final top-left corner so they grow into place
        const enter = join
            .enter()
            .append("rect")
            .attr("class", "treemap-cell")
            .attr("x", (node) => plotLeft + node.x0)
            .attr("y", (node) => plotTop + node.y0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .style("fill", colorFor);

        // Update new and existing points
        const update = enter
            .merge(join)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .style("opacity", theme.series.opacity)
            .style("fill", colorFor)
            .on("mouseover", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                const datum = node.data.datum;
                const color = colorFor(node) as IColor;
                const name = breadcrumb(node);

                onMouseOver && onMouseOver(datum, this, event);
                onFocus && onFocus({ element: this, event, datum });
                onTooltip && onTooltip({ datum, event, name, value: datum[value], color });
            })
            .on("mouseout", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(node.data.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, node) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(node.data.datum, this, event);
            })
            .transition("treemap-cell")
            .duration(animationDuration)
            .attr("x", (node) => plotLeft + node.x0)
            .attr("y", (node) => plotTop + node.y0)
            .attr("width", (node) => Math.max(0, node.x1 - node.x0))
            .attr("height", (node) => Math.max(0, node.y1 - node.y0));

        renderCanvas(canvas, renderVirtualCanvas, width, height, update);
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
        padding,
        cornerRadius,
        sort,
        buildHierarchy,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
        legendKeys,
    ]);

    return null;
}
