import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../hooks";

import { renderCanvas } from "./renderCanvas";

export interface ILabelsPlotProps<T> {
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
     * The CSS class applied to every label - also doubles as the D3 join/transition selector, so it
     * should be unique to this plot instance
     */
    className: string;
    items: T[];
    keyFor: (item: T) => string;
    x: (item: T) => number;
    y: (item: T) => number;
    text: (item: T) => string;
    textAnchor?: (item: T) => "start" | "middle" | "end";
    color: string;
    fontSize: number;
    fontFamily: string;
}

/**
 * Renders a set of text labels positioned by arbitrary x/y accessors, with Canvas support. Shared by any
 * plot that labels positioned items - not specific to any one chart type
 * @param  props       The set of React properties
 * @return             The LabelsPlot component
 */
export function LabelsPlot<T>({
    layer,
    canvas,
    renderVirtualCanvas,
    className,
    items,
    keyFor,
    x,
    y,
    text,
    textAnchor,
    color,
    fontSize,
    fontFamily,
}: ILabelsPlotProps<T>) {
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
            .append("text")
            .attr("class", className)
            .attr("x", (item) => x(item))
            .attr("y", (item) => y(item))
            .attr("dy", 3)
            .style("font-size", fontSize)
            .style("font-family", fontFamily)
            .style("fill", color)
            .style("opacity", 0);

        const update = enter.merge(join as any);

        // .text()/.attr("text-anchor") have to be applied outside the transition - they're not
        // interpolatable/animatable, and calling them on a transition throws
        update.text((item) => text(item));
        if (textAnchor) {
            update.attr("text-anchor", (item) => textAnchor(item));
        }

        const transition = update
            .transition(className)
            .duration(animationDuration)
            .attr("x", (item) => x(item))
            .attr("y", (item) => y(item))
            .style("opacity", 1);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [items, keyFor, x, y, text, textAnchor, color, fontSize, fontFamily, className, canvas, renderVirtualCanvas, layer, animationDuration]);

    return null;
}
