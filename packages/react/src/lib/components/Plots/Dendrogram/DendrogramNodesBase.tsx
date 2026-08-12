import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";
import type { IDendrogramNode } from "./useDendrogramLayout";

export interface IDendrogramNodesBaseProps {
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
     * The key of the field used for the size of each leaf, shown in its tooltip
     */
    value: string;
    /**
     * The nodes to render, and the position/color/ancestry helpers computed by `useDendrogramLayout`
     */
    allNodes: IDendrogramNode[];
    px: (node: IDendrogramNode) => number;
    py: (node: IDendrogramNode) => number;
    radiusFor: (node: IDendrogramNode) => number;
    colorFor: (node: IDendrogramNode) => string;
    keyFor: (node: IDendrogramNode) => string;
    breadcrumb: (node: IDendrogramNode) => string;
    ancestry: (node: IDendrogramNode) => string[];
    focusedNode: IDendrogramNode;
    zoomPath: string[];
    zoomTo: (path: string[]) => void;
    /**
     * Should a click on a node zoom in and refocus on its subtree?
     */
    zoomable?: boolean;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Renders a Dendrogram's node circles, and handles hover/click interaction, tooltips and zoom. Used
 * internally by `<DendrogramBase>`, which computes the shared layout this renders from - see
 * `useDendrogramLayout`
 * @param  props       The set of React properties
 * @return             The DendrogramNodesBase component
 */
export function DendrogramNodesBase({
    layer,
    canvas,
    renderVirtualCanvas,
    value,
    allNodes,
    px,
    py,
    radiusFor,
    colorFor,
    keyFor,
    breadcrumb,
    ancestry,
    focusedNode,
    zoomPath,
    zoomTo,
    zoomable = false,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IDendrogramNodesBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IDendrogramNode>(".dendrogram-node")
            .data(allNodes, (node) => keyFor(node));

        join.exit().remove();

        const enter = join
            .enter()
            .append("circle")
            .attr("class", "dendrogram-node")
            .attr("cx", (node) => px(node))
            .attr("cy", (node) => py(node))
            .attr("r", 0);

        const update = enter
            .merge(join as any)
            .style("fill", (node) => colorFor(node))
            .style("cursor", (node) => (interactive && (zoomable || node.children) ? "pointer" : "default"))
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

                if (!zoomable) return;

                if (node === focusedNode) {
                    zoomTo(zoomPath.slice(0, -1));
                } else if (node.children) {
                    zoomTo(ancestry(node));
                }
            });

        const transition = update
            .transition("dendrogram-node")
            .duration(animationDuration)
            .attr("cx", (node) => px(node))
            .attr("cy", (node) => py(node))
            .attr("r", (node) => radiusFor(node));

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
        // onTooltip/onFocus are deliberately excluded - useTooltip() returns a new closure every
        // render, and including it here would retrigger this effect (and its setState) every render
    }, [
        allNodes,
        px,
        py,
        radiusFor,
        colorFor,
        keyFor,
        breadcrumb,
        ancestry,
        focusedNode,
        zoomPath,
        zoomTo,
        zoomable,
        interactive,
        value,
        onMouseOver,
        onMouseOut,
        onClick,
        canvas,
        renderVirtualCanvas,
        layer,
        theme,
        animationDuration,
    ]);

    return null;
}
