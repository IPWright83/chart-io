import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../hooks";

import { renderCanvas } from "./renderCanvas";

export interface INodesPlotProps<T> {
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
     * The CSS class applied to every circle - also doubles as the D3 join/transition selector, so it
     * should be unique to this plot instance
     */
    className: string;
    items: T[];
    keyFor: (item: T) => string;
    cx: (item: T) => number;
    cy: (item: T) => number;
    radius: (item: T) => number;
    color: (item: T) => string;
    cursor?: (item: T) => string;
    /**
     * Should the plot be interactive and dispatch mouseover/mouseout/click callbacks?
     * @default true
     */
    interactive?: boolean;
    onMouseOver?: (item: T, element: Element, event: MouseEvent) => void;
    onMouseOut?: (item: T, element: Element, event: MouseEvent) => void;
    onClick?: (item: T, element: Element, event: MouseEvent) => void;
}

/**
 * Renders a set of circles positioned by arbitrary x/y/radius/color accessors, with Canvas support and
 * generic hover/click callbacks. Deliberately has no notion of tooltips, hierarchies or zooming - a
 * caller (e.g. `<DendrogramPlot>`) composes those on top via its own `onMouseOver`/`onClick` handlers.
 * Shared by any plot made of positioned, interactive circles - not specific to any one chart type
 * @param  props       The set of React properties
 * @return             The NodesPlot component
 */
export function NodesPlot<T>({
    layer,
    canvas,
    renderVirtualCanvas,
    className,
    items,
    keyFor,
    cx,
    cy,
    radius,
    color,
    cursor,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: INodesPlotProps<T>) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3.select(layer.current).selectAll<Element, T>(`.${className}`).data(items, (item) => keyFor(item));

        join.exit().remove();

        const enter = join
            .enter()
            .append("circle")
            .attr("class", className)
            .attr("cx", (item) => cx(item))
            .attr("cy", (item) => cy(item))
            .attr("r", 0);

        const update = enter
            .merge(join as any)
            .style("fill", (item) => color(item))
            .style("cursor", (item) => (cursor ? cursor(item) : "default"))
            .on("mouseover", function (event, item) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOver && onMouseOver(item, this, event);
            })
            .on("mouseout", function (event, item) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(item, this, event);
            })
            .on("click", function (event, item) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(item, this, event);
            });

        const transition = update
            .transition(className)
            .duration(animationDuration)
            .attr("cx", (item) => cx(item))
            .attr("cy", (item) => cy(item))
            .attr("r", (item) => radius(item));

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [
        items,
        keyFor,
        cx,
        cy,
        radius,
        color,
        cursor,
        className,
        interactive,
        onMouseOver,
        onMouseOut,
        onClick,
        canvas,
        renderVirtualCanvas,
        layer,
        animationDuration,
    ]);

    return null;
}
