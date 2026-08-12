import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import type { IRadialDendrogramLink, IRadialDendrogramLinkGenerator, IRadialDendrogramNode } from "./useRadialDendrogramLayout";

export interface IRadialDendrogramLinksBaseProps {
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
     * The links to render, and the position/generator helpers computed by `useRadialDendrogramLayout`
     */
    allLinks: IRadialDendrogramLink[];
    linkGenerator: IRadialDendrogramLinkGenerator;
    keyFor: (node: IRadialDendrogramNode) => string;
    cx: number;
    cy: number;
}

/**
 * Renders a RadialDendrogram's connecting links. Used internally by `<RadialDendrogramBase>`, which
 * computes the shared layout this renders from - see `useRadialDendrogramLayout`
 * @param  props       The set of React properties
 * @return             The RadialDendrogramLinksBase component
 */
export function RadialDendrogramLinksBase({ layer, canvas, renderVirtualCanvas, allLinks, linkGenerator, keyFor, cx, cy }: IRadialDendrogramLinksBaseProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3
            .select(layer.current)
            .selectAll<Element, IRadialDendrogramLink>(".radial-dendrogram-link")
            .data(allLinks, (link) => `${keyFor(link.source)}>${keyFor(link.target)}`);

        join.exit().remove();

        const enter = join
            .enter()
            .append("path")
            .attr("class", "radial-dendrogram-link")
            .attr("data-path-type", "link-radial")
            .attr("d", (link) => linkGenerator({ source: link.target, target: link.target }) ?? "")
            .style("fill", "none")
            .style("stroke", theme.axis.stroke.toString())
            .style("stroke-opacity", 0.4);

        const update = enter.merge(join as any);

        // The center point can change across renders (e.g. the chart resizing), so it's refreshed
        // here rather than only set once at enter
        update.attr("transform", `translate(${cx}, ${cy})`).attr("data-cx", cx).attr("data-cy", cy);

        const transition = update
            .transition("radial-dendrogram-link")
            .duration(animationDuration)
            .attr("data-angle0", (link) => link.source.x)
            .attr("data-radius0", (link) => link.source.y)
            .attr("data-angle1", (link) => link.target.x)
            .attr("data-radius1", (link) => link.target.y)
            .attr("d", (link) => linkGenerator(link) ?? "");

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [allLinks, linkGenerator, keyFor, cx, cy, canvas, renderVirtualCanvas, layer, theme, animationDuration]);

    return null;
}
