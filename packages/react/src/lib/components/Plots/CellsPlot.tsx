import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../hooks";

import { renderCanvas } from "./renderCanvas";

export interface ICellsPlotProps<T> {
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
     * The CSS class applied to every rect - also doubles as the D3 join/transition selector, so it
     * should be unique to this plot instance
     */
    className: string;
    items: T[];
    keyFor: (item: T) => string;
    x: (item: T) => number;
    y: (item: T) => number;
    width: (item: T) => number;
    height: (item: T) => number;
    color: (item: T) => string;
    /**
     * The corner radius, in pixels, to apply to each rect
     * @default 0
     */
    cornerRadius?: number;
    cursor?: (item: T) => string;
    /**
     * The baseline opacity applied to every cell - independent of `useFocused`'s per-cell
     * hover/selected opacity, which is applied (and reset back to this) on top
     */
    opacity?: number;
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
 * Renders a set of rects positioned by arbitrary x/y/width/height/color accessors, with Canvas support
 * and generic hover/click callbacks. Deliberately has no notion of tooltips or scales - a caller (e.g.
 * `<HeatmapPlot>`) composes those on top via its own `onMouseOver`/`onClick` handlers. Shared by any plot
 * made of positioned, interactive rects - not specific to any one chart type
 * @param  props       The set of React properties
 * @return             The CellsPlot component
 */
export function CellsPlot<T>({
    layer,
    canvas,
    renderVirtualCanvas,
    className,
    items,
    keyFor,
    x,
    y,
    width,
    height,
    color,
    cornerRadius = 0,
    cursor,
    opacity,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: ICellsPlotProps<T>) {
    const canvasWidth = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const canvasHeight = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const join = d3.select(layer.current).selectAll<Element, T>(`.${className}`).data(items, (item) => keyFor(item));

        join.exit().remove();

        // Enter cells, collapsed to zero size at their final top-left corner so they grow into place
        const enter = join
            .enter()
            .append("rect")
            .attr("class", className)
            .attr("x", (item) => x(item))
            .attr("y", (item) => y(item))
            .attr("width", 0)
            .attr("height", 0)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius);

        const update = enter
            .merge(join as any)
            .style("fill", (item) => color(item))
            .style("opacity", opacity ?? null)
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
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .attr("x", (item) => x(item))
            .attr("y", (item) => y(item))
            .attr("width", (item) => Math.max(0, width(item)))
            .attr("height", (item) => Math.max(0, height(item)));

        renderCanvas(canvas, renderVirtualCanvas, canvasWidth, canvasHeight, transition);
    }, [
        items,
        keyFor,
        x,
        y,
        width,
        height,
        color,
        cornerRadius,
        cursor,
        opacity,
        className,
        interactive,
        onMouseOver,
        onMouseOut,
        onClick,
        canvas,
        renderVirtualCanvas,
        layer,
        animationDuration,
        canvasWidth,
        canvasHeight,
    ]);

    return null;
}
