import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import type { IRadialDendrogramNode } from "./useRadialDendrogramLayout";

export interface IRadialDendrogramLabelsBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * Should node labels be shown?
     */
    labels?: boolean;
    /**
     * The nodes to label, and the position helpers computed by `useRadialDendrogramLayout`
     */
    allNodes: IRadialDendrogramNode[];
    labelX: (node: IRadialDendrogramNode) => number;
    labelY: (node: IRadialDendrogramNode) => number;
    labelAnchor: (node: IRadialDendrogramNode) => "start" | "end";
    keyFor: (node: IRadialDendrogramNode) => string;
}

/**
 * Renders a RadialDendrogram's node labels. Used internally by `<RadialDendrogramBase>`, which computes
 * the shared layout this renders from - see `useRadialDendrogramLayout`
 * @param  props       The set of React properties
 * @return             The RadialDendrogramLabelsBase component
 */
export function RadialDendrogramLabelsBase({
    layer,
    canvas,
    renderVirtualCanvas,
    labels = true,
    allNodes,
    labelX,
    labelY,
    labelAnchor,
    keyFor,
}: IRadialDendrogramLabelsBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IRadialDendrogramNode>(".radial-dendrogram-label")
            .data(labels ? allNodes : [], (node) => keyFor(node));

        join.exit().remove();

        const enter = join
            .enter()
            .append("text")
            .attr("class", "radial-dendrogram-label")
            .attr("x", (node) => labelX(node))
            .attr("y", (node) => labelY(node))
            .attr("dy", 3)
            .style("font-size", theme.label.fontSize)
            .style("font-family", theme.label.fontFamily)
            .style("fill", theme.label.color.toString())
            .style("opacity", 0);

        const update = enter.merge(join as any);

        // .text()/.attr("text-anchor") have to be applied outside the transition - they're not
        // interpolatable/animatable, and calling them on a transition throws
        update.text((node) => node.data.key).attr("text-anchor", (node) => labelAnchor(node));

        const transition = update
            .transition("radial-dendrogram-label")
            .duration(animationDuration)
            .attr("x", (node) => labelX(node))
            .attr("y", (node) => labelY(node))
            .style("opacity", 1);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [allNodes, labelX, labelY, labelAnchor, keyFor, labels, canvas, renderVirtualCanvas, layer, theme, animationDuration]);

    return null;
}
