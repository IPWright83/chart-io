import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import type { IDendrogramLink, IDendrogramLinkGenerator, IDendrogramNode } from "./useDendrogramLayout";

export interface IDendrogramLinksBaseProps {
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
     * The links to render, and the position/generator helpers computed by `useDendrogramLayout`
     */
    allLinks: IDendrogramLink[];
    px: (node: IDendrogramNode) => number;
    py: (node: IDendrogramNode) => number;
    linkGenerator: IDendrogramLinkGenerator;
    keyFor: (node: IDendrogramNode) => string;
}

/**
 * Renders a Dendrogram's connecting links. Used internally by `<DendrogramBase>`, which computes the
 * shared layout this renders from - see `useDendrogramLayout`
 * @param  props       The set of React properties
 * @return             The DendrogramLinksBase component
 */
export function DendrogramLinksBase({ layer, canvas, renderVirtualCanvas, allLinks, px, py, linkGenerator, keyFor }: IDendrogramLinksBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IDendrogramLink>(".dendrogram-link")
            .data(allLinks, (link) => `${keyFor(link.source)}>${keyFor(link.target)}`);

        join.exit().remove();

        const enter = join
            .enter()
            .append("path")
            .attr("class", "dendrogram-link")
            .attr("data-path-type", "link")
            .attr("d", (link) => linkGenerator({ source: link.target, target: link.target }))
            .style("fill", "none")
            .style("stroke", theme.axis.stroke.toString())
            .style("stroke-opacity", 0.4);

        const transition = enter
            .merge(join as any)
            .transition("dendrogram-link")
            .duration(animationDuration)
            .attr("data-x0", (link) => px(link.source))
            .attr("data-y0", (link) => py(link.source))
            .attr("data-x1", (link) => px(link.target))
            .attr("data-y1", (link) => py(link.target))
            .attr("d", (link) => linkGenerator(link));

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [allLinks, px, py, linkGenerator, keyFor, canvas, renderVirtualCanvas, layer, theme, animationDuration]);

    return null;
}
