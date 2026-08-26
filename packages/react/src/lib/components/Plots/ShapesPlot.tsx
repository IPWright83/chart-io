import { chartSelectors, d3, IState } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useRender } from "../../hooks";

import { renderCanvas } from "./renderCanvas";

export interface IShapesPlotProps<T> {
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
     * The CSS class applied to every shape - also doubles as the D3 join/transition selector, so it
     * should be unique to this plot instance
     */
    className: string;
    items: T[];
    keyFor: (item: T) => string;
    /**
     * The already-projected SVG path `d` string for this item - e.g. `d3.geoPath(projection)(feature)`
     * for a `<Choropleth>` region, or a hand-built `M...L...` string for a flow arc or tracked route
     */
    d: (item: T) => string;
    /**
     * The fill color, either fixed for every shape or derived per-item - e.g. a `<Choropleth>` region
     * colored by its value. Defaults to `"none"`, for a stroke-only shape like a route or flow line
     */
    fill?: string | ((item: T) => string);
    fillOpacity?: number;
    /**
     * The stroke color, either fixed for every shape or derived per-item. Defaults to `"none"`, for a
     * fill-only shape like a `<Choropleth>` region with no border
     */
    stroke?: string | ((item: T) => string);
    strokeOpacity?: number;
    strokeWidth?: number | ((item: T) => number);
    cursor?: (item: T) => string;
    /**
     * The baseline opacity applied to every shape - independent of `useFocused`'s per-item
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
 * Renders a set of arbitrary SVG shapes from a `d` path string, with Canvas support (via the `"geo"`
 * Canvas path type - see `renderGeoPath`). Used by `<Geo>`'s layers (`<Choropleth>`'s regions,
 * `<GeoArcs>`'s flow lines, `<GeoPaths>`'s tracked routes) but not specific to any one of them - not
 * geo-specific either, just generalizes `<LinksPlot>` to arbitrary (not just source/target) items and
 * to filled (not just stroked) shapes
 * @param  props       The set of React properties
 * @return             The ShapesPlot component
 */
export function ShapesPlot<T>({
    layer,
    canvas,
    renderVirtualCanvas,
    className,
    items,
    keyFor,
    d,
    fill = "none",
    fillOpacity = 1,
    stroke = "none",
    strokeOpacity = 1,
    strokeWidth,
    cursor,
    opacity,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IShapesPlotProps<T>) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        const fillFor = typeof fill === "function" ? fill : () => fill;
        const strokeFor = typeof stroke === "function" ? stroke : () => stroke;
        const strokeWidthFor = typeof strokeWidth === "function" ? strokeWidth : () => strokeWidth ?? 1;

        const join = d3.select(layer.current).selectAll<Element, T>(`.${className}`).data(items, (item) => keyFor(item));

        join.exit().remove();

        const enter = join
            .enter()
            .append("path")
            .attr("class", className)
            .attr("data-path-type", "geo")
            .attr("d", (item) => d(item))
            .style("opacity", 0)
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

        const update = enter
            .merge(join as any)
            .style("fill", fillFor)
            .style("fill-opacity", fillOpacity)
            .style("stroke", strokeFor)
            .style("stroke-opacity", strokeOpacity)
            .style("stroke-width", strokeWidth === undefined ? null : strokeWidthFor)
            .style("cursor", (item) => (cursor ? cursor(item) : "default"));

        const transition = update
            .transition(className)
            .duration(animationDuration)
            .attr("d", (item) => d(item))
            .style("opacity", opacity ?? 1);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [
        items,
        keyFor,
        d,
        fill,
        fillOpacity,
        stroke,
        strokeOpacity,
        strokeWidth,
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
    ]);

    return null;
}
