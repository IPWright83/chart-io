import { chartSelectors, d3, interpolateMultiPath, isNullOrUndefined, IState } from "@chart-io/core";
import type { IColor, IScaleMode } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItem, useRender } from "../../../../hooks";
import { useRadialDatumFocus } from "./useRadialDatumFocus";

export interface IRadialAreaBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The x-coordinate of the center of the plot. Provided by `withRadialPlot`
     */
    cx?: number;
    /**
     * The y-coordinate of the center of the plot. Provided by `withRadialPlot`
     */
    cy?: number;
    /**
     * The key of the field used for the angular position, e.g. a date or number. Should match the
     * `fields` used by the sibling `<AngleAxis>`
     */
    x: string;
    /**
     * The key of the field used for the radial position, read from the baseline (`0`) outward.
     * Should match the `fields` used by the sibling `<RadialAxis>`
     */
    y: string;
    /**
     * The color of the plot. Defaults to the theme's series colors
     */
    color?: IColor;
    /**
     * Should the area be drawn as a closed loop, joining the last point back to the first? Useful
     * for a fully cyclical domain (e.g. a full year of dates) where the shape should wrap around
     * seamlessly. Leave this as `false` for a partial domain, where closing the loop would draw an
     * incorrect line straight across the middle of the chart
     * @default false
     */
    closed?: boolean;
    /**
     * Should the plot be interactive and be able to trigger markers & tooltips?
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
     * An internal setting, to prefer using a brush scale. You should not need to use it directly
     */
    scaleMode?: IScaleMode;
}

/**
 * Represents a RadialArea plot: a single filled area from the center outward to `y`, following a
 * continuous angular domain (`x`) around the circle - the polar equivalent of `<Area>`. Requires
 * an `<AngleAxis>` (typically with a continuous `scaleType` such as `"time"`) and a `<RadialAxis>`
 * to provide the angular/radial scales
 * @param  props       The set of React properties
 * @return             The RadialArea plot component
 */
export function RadialAreaBase({
    x,
    y,
    color,
    closed = false,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
    cx,
    cy,
}: IRadialAreaBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const sortedData = useMemo(() => data.toSorted((a, b) => d3.ascending(a[x], b[x])), [data, x]);

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;
    const strokeColor = fillColor.darker();

    useLegendItem(y, "line", showInLegend, fillColor);

    useRender(() => {
        if (!xScale || !yScale) {
            return;
        }

        const angleOf = xScale as unknown as (value: unknown) => number;
        const radiusOf = yScale as unknown as (value: unknown) => number;
        const baselineRadius = yScale.range()[0] as number;

        const areaShape = d3
            .areaRadial()
            .curve(closed ? d3.curveLinearClosed : d3.curveLinear)
            .angle((d) => angleOf(d[x]))
            .innerRadius(() => baselineRadius)
            .outerRadius((d) => Math.max(0, radiusOf(d[y])))
            .defined((d) => !isNullOrUndefined(d[y]));

        // Handle Canvas rendering - draw directly to the canvas context, the same approach as
        // AreaBase. This is why RadialArea doesn't need a generic canvas primitive like Radar's
        // renderPolygon: d3's shape generators can write straight to a CanvasRenderingContext2D
        if (canvas) {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, width, height);
            context.save();
            context.translate(cx, cy);
            context.beginPath();
            // @ts-ignore: TODO: Not sure how to fix this
            areaShape.context(context)(sortedData);
            context.fillStyle = fillColor.toString();
            context.strokeStyle = strokeColor.toString();
            context.fill();
            context.stroke();
            context.restore();

            // Note that because we've drawn directly to the canvas, there is no need
            // for us to use the canvas render loop
            return;
        }

        if (!layer.current) {
            return;
        }

        d3.select(layer.current).attr("transform", `translate(${cx}, ${cy})`);

        let path = d3.select(layer.current).select<SVGPathElement>("path.radial-area");
        if (path.empty()) {
            path = d3.select(layer.current).append("path").attr("class", "radial-area");
        }

        // @ts-ignore: TODO: Not sure how to fix this
        const current: string = areaShape(sortedData);

        path
            .datum(sortedData)
            .style("fill", fillColor.toString())
            .style("stroke", strokeColor.toString())
            .style("pointer-events", "none")
            .transition("radial-area")
            .duration(animationDuration)
            .attrTween("d", function () {
                // Nothing to animate from on the very first render - jump straight to the final shape
                const previous = d3.select(this).attr("d") || current;
                return interpolateMultiPath(previous, current);
            });
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height, cx, cy, closed, animationDuration, color, theme.series.colors, theme.series.opacity]);

    useRadialDatumFocus({ interactive, x, y, xScale, yScale, data: sortedData, color: strokeColor, cx, cy });

    return null;
}
