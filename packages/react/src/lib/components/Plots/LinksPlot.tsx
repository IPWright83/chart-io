import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../hooks";

import { renderCanvas } from "./renderCanvas";

export interface ILinksPlotProps<L extends { source: unknown; target: unknown }> {
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
     * The CSS class applied to every link - also doubles as the D3 join/transition selector, so it
     * should be unique to this plot instance
     */
    className: string;
    /**
     * The value stamped onto each link's `data-path-type` attribute, read by `renderElements` (the
     * Canvas dispatcher) to pick the primitive that can replay this link's geometry - e.g. "link" for
     * `renderLink`/`d3.linkHorizontal()`, "link-radial" for `renderLinkRadial`/`d3.linkRadial()`
     */
    pathType: string;
    items: L[];
    keyFor: (link: L) => string;
    path: (link: L) => string;
    /**
     * Extra `data-*` attributes stamped onto each link and animated across its transition, so a Canvas
     * redraw can read back the interpolated (not just final) geometry on every tick - e.g. the
     * endpoints a link generator needs to reconstruct a curve it can't recover from a bounding box alone
     */
    dataAttrs?: Array<{ name: string; value: (link: L) => string | number }>;
    /**
     * Extra attributes applied to every link the same way, outside the transition - e.g. a radial
     * layout's `transform`, which can change across renders (the chart resizing) but isn't animated
     */
    staticAttrs?: Array<{ name: string; value: string | number }>;
    /**
     * The stroke color, either fixed for every link or derived per-link - e.g. a Sankey's flows, each
     * colored like their source node
     */
    stroke: string | ((link: L) => string);
    strokeOpacity?: number;
    /**
     * The stroke width, either fixed for every link or derived per-link - e.g. a Sankey's flows, each
     * as wide as the value they carry
     * @default 1
     */
    strokeWidth?: number | ((link: L) => number);
    cursor?: (link: L) => string;
    /**
     * Should the plot be interactive and dispatch mouseover/mouseout/click callbacks?
     * @default true
     */
    interactive?: boolean;
    onMouseOver?: (link: L, element: Element, event: MouseEvent) => void;
    onMouseOut?: (link: L, element: Element, event: MouseEvent) => void;
    onClick?: (link: L, element: Element, event: MouseEvent) => void;
}

/**
 * Renders a set of connecting links (edges) between `source`/`target` points, with Canvas support.
 * Shared by any plot that connects positioned items with links - not specific to any one chart type
 * @param  props       The set of React properties
 * @return             The LinksPlot component
 */
export function LinksPlot<L extends { source: unknown; target: unknown }>({
    layer,
    canvas,
    renderVirtualCanvas,
    className,
    pathType,
    items,
    keyFor,
    path,
    dataAttrs,
    staticAttrs,
    stroke,
    strokeOpacity = 1,
    strokeWidth,
    cursor,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ILinksPlotProps<L>) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const strokeFor = typeof stroke === "function" ? stroke : () => stroke;
        const strokeWidthFor = typeof strokeWidth === "function" ? strokeWidth : () => strokeWidth ?? 1;

        const join = d3.select(layer.current).selectAll<Element, L>(`.${className}`).data(items, (link) => keyFor(link));

        join.exit().remove();

        const enter = join
            .enter()
            .append("path")
            .attr("class", className)
            .attr("data-path-type", pathType)
            .attr("d", (link) => path({ ...link, source: link.target } as L))
            .style("fill", "none")
            .style("stroke", strokeFor)
            .style("stroke-width", strokeWidth === undefined ? null : strokeWidthFor)
            .style("stroke-opacity", strokeOpacity)
            .style("cursor", cursor ? (link) => cursor(link) : null)
            .on("mouseover", function (event, link) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(link, this, event);
            })
            .on("mouseout", function (event, link) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(link, this, event);
            })
            .on("click", function (event, link) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(link, this, event);
            });

        const update = enter.merge(join as any);

        (staticAttrs ?? []).forEach(({ name, value }) => update.attr(name, value));
        update.style("stroke", strokeFor);
        if (cursor) {
            update.style("cursor", (link) => cursor(link));
        }

        let transition = update.transition(className).duration(animationDuration);
        (dataAttrs ?? []).forEach(({ name, value }) => {
            transition = transition.attr(name, value);
        });
        transition = transition.attr("d", (link) => path(link));
        if (strokeWidth !== undefined) {
            transition = transition.style("stroke-width", strokeWidthFor);
        }

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [
        items,
        keyFor,
        path,
        dataAttrs,
        staticAttrs,
        stroke,
        strokeOpacity,
        strokeWidth,
        cursor,
        interactive,
        onMouseOver,
        onMouseOut,
        onClick,
        className,
        pathType,
        canvas,
        renderVirtualCanvas,
        layer,
        animationDuration,
    ]);

    return null;
}
