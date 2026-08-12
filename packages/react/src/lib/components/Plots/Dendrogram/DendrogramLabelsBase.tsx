import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import type { IDendrogramNode } from "./useDendrogramLayout";

export interface IDendrogramLabelsBaseProps {
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
     * The nodes to label, and the position helpers computed by `useDendrogramLayout`
     */
    allNodes: IDendrogramNode[];
    px: (node: IDendrogramNode) => number;
    py: (node: IDendrogramNode) => number;
    radiusFor: (node: IDendrogramNode) => number;
    keyFor: (node: IDendrogramNode) => string;
}

/**
 * Renders a Dendrogram's node labels. Used internally by `<DendrogramBase>`, which computes the shared
 * layout this renders from - see `useDendrogramLayout`
 * @param  props       The set of React properties
 * @return             The DendrogramLabelsBase component
 */
export function DendrogramLabelsBase({ layer, canvas, renderVirtualCanvas, labels = true, allNodes, px, py, radiusFor, keyFor }: IDendrogramLabelsBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IDendrogramNode>(".dendrogram-label")
            .data(labels ? allNodes : [], (node) => keyFor(node));

        join.exit().remove();

        const enter = join
            .enter()
            .append("text")
            .attr("class", "dendrogram-label")
            .attr("x", (node) => px(node) + radiusFor(node) + 4)
            .attr("y", (node) => py(node))
            .attr("dy", 3)
            .style("font-size", theme.label.fontSize)
            .style("font-family", theme.label.fontFamily)
            .style("fill", theme.label.color.toString())
            .style("opacity", 0);

        const update = enter.merge(join as any);

        // .text() has to be applied outside the transition - it's not an interpolatable/animatable
        // attribute, and calling it on a transition throws
        update.text((node) => node.data.key);

        const transition = update
            .transition("dendrogram-label")
            .duration(animationDuration)
            .attr("x", (node) => px(node) + radiusFor(node) + 4)
            .attr("y", (node) => py(node))
            .style("opacity", 1);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [allNodes, px, py, radiusFor, keyFor, labels, canvas, renderVirtualCanvas, layer, theme, animationDuration]);

    return null;
}
