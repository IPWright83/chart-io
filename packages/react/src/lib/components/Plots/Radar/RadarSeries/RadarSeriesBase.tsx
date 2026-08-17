import { chartSelectors, d3, ensureValuesAreUnique, IState } from "@chart-io/core";
import type { IColor, ILabeller, IOnClick, IOnMouseOut, IOnMouseOver, IValue } from "@chart-io/core";

import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";

import { interpolatePoints } from "../../interpolatePoints";
import { renderCanvas } from "../../renderCanvas";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";

export interface IRadarSeriesBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * An arbitrary key used to register the angular scale, matching the `fields` used by the
     * sibling `<AngleAxis>`. Only needs to be set explicitly when a chart has more than one
     * independent Radar - e.g. two separate `<Radar>`/`<AngleAxis>` pairs on the same
     * `<RadialChart>` - since each pair otherwise registers its scale under the same default key
     * and would overwrite one another:
     * ```jsx
     * <AngleAxis fields="skills" domain={skillFields} />
     * <Radar category="skills" name="player" ys={skillFields} />
     * <AngleAxis fields="metrics" domain={metricFields} />
     * <Radar category="metrics" name="player" ys={metricFields} />
     * ```
     * @default "category"
     */
    category?: string;
    /**
     * The key of the field used to identify each series - one row of `data` per series. Its value
     * for this particular series is `seriesName`
     */
    name: string;
    /**
     * The value of the `name` field that identifies this particular series' row within `data`
     */
    seriesName: string;
    /**
     * The ordered list of fields to plot, one spoke per field, read from this series' single row.
     * Each field can have its own domain (registered separately by a sibling `<RadialAxis>`)
     */
    ys: string[];
    /**
     * Maps a `ys` field key to a display label, used for the tooltip name shown when hovering a
     * vertex. Also worth passing as `<AngleAxis>`'s `tickFormat` for consistent spoke labels.
     * Overrides the chart-level labeller set via `<Chart labeller>`, if any
     * @default the chart-level labeller, or identity if none is set
     */
    labeller?: ILabeller;
    /**
     * The color of this series. Defaults to the theme's series colors
     */
    color?: IColor;
    /**
     * Should the area within the series be filled? Set to false for a stroke-only outline, useful
     * when overlaying many series to compare trends without the fills obscuring one another
     * @default true
     */
    filled?: boolean;
    /**
     * The opacity of the filled area of the series, when `filled` is true
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
    | { type: "marker"; key: string; field: string; point: IRadarPoint };

/**
 * Represents a single series of a Radar plot: a closed polygon connecting one point per field in
 * `ys` (read from this series' own row of `data`), with a marker at each vertex to support
 * hover/click interaction. Requires an `<AngleAxis>` and `<RadialAxis>` to be present to provide
 * the angular/radial scales
 * @param  props       The set of React properties
 * @return             The RadarSeries plot component
 */
export function RadarSeriesBase({
    category = "category",
    name,
    seriesName,
    ys,
    labeller,
    color,
    filled = true,
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
    // Each field in `ys` is independently scaled, so a spoke can represent a different domain
    // (e.g. 1-5 on one spoke, a percentage on another)
    const radiusScales = useSelector(
        (s: IState) => ys.map((field) => chartSelectors.scales.getScale(s, field, "plot")),
        // The mapped array is a new reference on every call even when its contents are identical,
        // so use a shallow comparison to avoid re-rendering (and re-selecting) in an infinite loop
        shallowEqual,
    );
    // `labeller` overrides the chart-level one set via `<Chart labeller>`, which itself defaults to
    // the identity function - both are stable references, so neither risks a render loop
    const chartLabeller = useSelector((s: IState) => chartSelectors.labeller(s));
    const effectiveLabeller = labeller ?? chartLabeller;

    const row = useMemo(() => data.find((d) => `${d[name]}` === seriesName), [data, name, seriesName]);
    const seriesColor = (color ?? theme.series.colors[0]).toString();

    useLegendItem(effectiveLabeller(seriesName), "square", showInLegend, seriesColor as IColor);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        if (!angleScale || !row || radiusScales.some((scale) => !scale)) {
            return;
        }

        ensureValuesAreUnique(data, name, "Radar");

        // The intersected call signature on IScale doesn't resolve cleanly against a plain IValue argument
        const angleOf = angleScale as unknown as (value: IValue) => number;

        // Coordinates are computed in absolute (chart-relative) space rather than relative to the
        // origin plus an SVG `transform`, since the Canvas primitives that draw `points`/`cx`/`cy`
        // read those attributes directly and have no notion of an SVG transform
        const toPoint = (field: string, index: number): IRadarPoint => {
            const radiusOf = radiusScales[index] as unknown as (value: IValue) => number;
            const angle = angleOf(field);
            const radius = Math.max(0, radiusOf(row[field]));
            return { x: cx + radius * Math.sin(angle), y: cy - radius * Math.cos(angle) };
        };

        const points = ys.map(toPoint);
        const pointsAttr = points.map((p) => `${p.x},${p.y}`).join(" ");

        const elements: IRadarElement[] = [
            { type: "shape", key: "shape" },
            ...ys.map((field, i) => ({ type: "marker" as const, key: `marker-${field}`, field, point: points[i] })),
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
            .style("fill", (d) => (d.type === "shape" && !filled ? "none" : seriesColor))
            .style("fill-opacity", (d) => (d.type === "shape" ? fillOpacity : null))
            .style("stroke", (d) => (d.type === "shape" ? seriesColor : null))
            .style("stroke-width", (d) => (d.type === "shape" ? 2 : null))
            .style("opacity", (d) => (d.type === "marker" ? theme.series.opacity : null))
            .on("mouseover", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                const value = row[d.field];

                onMouseOver && onMouseOver(row, this, event);
                onFocus && onFocus({ element: this, event, datum: row });
                onTooltip &&
                    onTooltip({
                        datum: row,
                        event,
                        name: effectiveLabeller(d.field),
                        value,
                        color: seriesColor as IColor,
                    });
            })
            .on("mouseout", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                onMouseOut && onMouseOut(row, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, d) {
                // istanbul ignore next
                if (!interactive || d.type !== "marker") return;

                onClick && onClick(row, this, event);
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
        name,
        seriesName,
        ys,
        effectiveLabeller,
        row,
        data,
        canvas,
        renderVirtualCanvas,
        cx,
        cy,
        angleScale,
        radiusScales,
        layer,
        animationDuration,
        seriesColor,
        filled,
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
