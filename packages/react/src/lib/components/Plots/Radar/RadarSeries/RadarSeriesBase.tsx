import { chartSelectors, d3, ensureValuesAreUnique, IState } from "@chart-io/core";
import type { IColor, IDatum, IOnClick, IOnMouseOut, IOnMouseOver, IValue } from "@chart-io/core";

import React from "react";
import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { interpolatePoints } from "../interpolatePoints";

export interface IRadarSeriesBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the angular (category) position of each point
     */
    category: string;
    /**
     * The key of the field used for the radial (value) position of each point
     */
    y: string;
    /**
     * The color of this series. Defaults to the theme's series colors
     */
    color?: IColor;
    /**
     * The opacity of the filled area of the series
     * @default 0.15
     */
    fillOpacity?: number;
    /**
     * The radius, in pixels, of each vertex marker
     * @default 4
     */
    markerRadius?: number;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend?
     * @default true
     */
    showInLegend?: boolean;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    /**
     * The x-coordinate of the center of the Radar. Provided by `withRadialPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the Radar. Provided by `withRadialPlot`
     */
    cy?: number;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

interface IRadarPoint {
    x: number;
    y: number;
}

type IRadarElement =
    | { type: "shape"; key: string }
    | { type: "marker"; key: string; datum: IDatum; point: IRadarPoint };

/**
 * Represents a single series of a Radar plot: a closed polygon connecting one point per category,
 * with a marker at each vertex to support hover/click interaction. Requires an `<AngleAxis>` and
 * `<RadiusAxis>` to be present to provide the angular/radial scales
 * @param  props       The set of React properties
 * @return             The RadarSeries plot component
 */
export function RadarSeriesBase({
    category,
    y,
    color,
    fillOpacity = 0.15,
    markerRadius = 4,
    canvas,
    renderVirtualCanvas,
    layer,
    cx,
    cy,
    showInLegend = true,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IRadarSeriesBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const angleScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, category, "plot"));
    const radiusScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, "plot"));

    const seriesColor = (color ?? theme.series.colors[0]).toString();

    useLegendItem(y, "square", showInLegend, seriesColor as IColor);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        if (!angleScale || !radiusScale) {
            return;
        }

        ensureValuesAreUnique(data, category, "Radar");

        // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
        const angleOf = angleScale as unknown as (value: IValue) => number;
        const radiusOf = radiusScale as unknown as (value: IValue) => number;

        // Coordinates are computed in absolute (chart-relative) space rather than relative to the
        // origin plus an SVG `transform`, since the Canvas primitives that draw `points`/`cx`/`cy`
        // read those attributes directly and have no notion of an SVG transform
        const toPoint = (d: IDatum): IRadarPoint => {
            const angle = angleOf(d[category]);
            const radius = Math.max(0, radiusOf(d[y]));
            return { x: cx + radius * Math.sin(angle), y: cy - radius * Math.cos(angle) };
        };

        const points = data.map(toPoint);
        const pointsAttr = points.map((p) => `${p.x},${p.y}`).join(" ");

        const elements: IRadarElement[] = [
            { type: "shape", key: "shape" },
            ...data.map((datum, i) => ({ type: "marker" as const, key: `marker-${i}`, datum, point: points[i] })),
        ];

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<Element, IRadarElement>(".radar-element")
            .data(elements, (d) => d.key);

        // Exit elements
        join.exit().remove();

        // Enter elements - a single "shape" polygon, plus one "marker" circle per point. The
        // element is created in the parent's own namespace (rather than always assuming SVG),
        // since in Canvas mode the "layer" is a detached, non-namespaced HTML element instead
        const enter = join
            .enter()
            .append(function (this: Element, d) {
                return document.createElementNS(this.namespaceURI, d.type === "shape" ? "polygon" : "circle");
            })
            .attr("class", (d) => `radar-element radar-${d.type}`);

        // Update new and existing elements
        const update = enter
            .merge(join as any)
            .style("fill", seriesColor)
            .style("fill-opacity", (d) => (d.type === "shape" ? fillOpacity : null))
            .style("stroke", (d) => (d.type === "shape" ? seriesColor : null))
            .style("stroke-width", (d) => (d.type === "shape" ? 2 : null))
            .style("opacity", (d) => (d.type === "marker" ? theme.series.opacity : null))
            .on("mouseover", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                onMouseOver && onMouseOver(d.datum, this, event);
                onFocus && onFocus({ element: this, event, datum: d.datum });
                onTooltip &&
                    onTooltip({ datum: d.datum, event, name: y, value: d.datum[y], color: seriesColor as IColor });
            })
            .on("mouseout", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                onMouseOut && onMouseOut(d.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                onClick && onClick(d.datum, this, event);
            });

        // A single transition covers both the polygon "shape" (animating its points) and the
        // "marker" circles (animating their position), since a canvas render needs one Transition
        // whose completion it can await
        const transition = update.transition("radar").duration(animationDuration);

        transition.tween("radar-geometry", function (d) {
            const node = d3.select(this);

            if (d.type === "shape") {
                const previous = node.attr("points") || pointsAttr;
                return (t: number) => node.attr("points", interpolatePoints(previous, pointsAttr, t));
            }

            const previousX = Number(node.attr("cx")) || d.point.x;
            const previousY = Number(node.attr("cy")) || d.point.y;
            return (t: number) =>
                node
                    .attr("cx", previousX + (d.point.x - previousX) * t)
                    .attr("cy", previousY + (d.point.y - previousY) * t)
                    .attr("r", markerRadius);
        });

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [
        category,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        angleScale,
        radiusScale,
        layer,
        animationDuration,
        seriesColor,
        fillOpacity,
        markerRadius,
        showInLegend,
        interactive,
        onMouseOver,
        onMouseOut,
        onClick,
        theme,
    ]);

    return null;
}
