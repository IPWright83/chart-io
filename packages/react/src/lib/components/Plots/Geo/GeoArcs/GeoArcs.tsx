import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../../hooks";
import { withCanvas, withSVG } from "../../../../hoc";

import { ShapesPlot, IShapesPlotProps } from "../../ShapesPlot";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { useGeoContext } from "../GeoContext";

// How many points to sample the great-circle interpolation between source and target at - enough
// to look smoothly curved once projected, without generating an excessively long `d` string
const INTERPOLATION_STEPS = 64;

interface IArc {
    key: string;
    datum: IDatum;
    d: string;
}

const CanvasArcsPlot = withCanvas<IShapesPlotProps<IArc>>(ShapesPlot, "plot geo-arcs");
const SVGArcsPlot = withSVG<IShapesPlotProps<IArc>>(ShapesPlot, "plot geo-arcs");

export interface IGeoArcsProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The key of the field holding each row's origin latitude
     */
    sourceLat: string;
    /**
     * The key of the field holding each row's origin longitude
     */
    sourceLon: string;
    /**
     * The key of the field holding each row's destination latitude
     */
    targetLat: string;
    /**
     * The key of the field holding each row's destination longitude
     */
    targetLon: string;
    /**
     * The key of a numeric field to scale each arc's stroke width by (e.g. flow magnitude, like the
     * size of a migration between two regions). Arcs are drawn at a fixed `strokeWidth` if omitted
     */
    value?: string;
    /**
     * A fixed stroke width for every arc, or the `[min, max]` pixel range to scale `value` into
     * @default 1.5
     */
    strokeWidth?: number | [number, number];
    /**
     * The key of a field used to color each arc categorically. Every arc uses `color`/the theme's
     * first series color if omitted
     */
    category?: string;
    /**
     * A fixed color for every arc, used when `category` isn't given
     */
    color?: IColor;
    /**
     * The set of colors to use for each `category`. Defaults to the theme's series colors
     */
    colors?: IColor[];
    strokeOpacity?: number;
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
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a GeoArcs layer, drawing a great-circle flow line between a `source`/`target`
 * lat/lon pair for every row of data - e.g. migration between regions, or any other origin/destination
 * flow. Used inside a `<Geo>` chart alongside any other layer - not a standalone chart itself
 * @param  props       The set of React properties
 * @return             The GeoArcs component
 */
export function GeoArcs({
    useCanvas = false,
    sourceLat,
    sourceLon,
    targetLat,
    targetLon,
    value,
    strokeWidth = 1.5,
    category,
    color,
    colors,
    strokeOpacity = 0.75,
    interactive = true,
    showInLegend = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IGeoArcsProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { path } = useGeoContext("GeoArcs");

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(
        () => (category ? Array.from(new Set((data as IData).map((d) => `${d[category]}`))) : []),
        [data, category],
    );
    const legendColors = useMemo(() => categories.map((_, index) => palette[index % palette.length]), [categories, palette]);

    useLegendItems(categories, "line", showInLegend && Boolean(category), legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const { arcs, colorFor, strokeWidthFor } = useMemo(() => {
        const arcs: IArc[] = (data as IData)
            .map((datum, index) => {
                const source: [number, number] = [Number(datum[sourceLon]), Number(datum[sourceLat])];
                const target: [number, number] = [Number(datum[targetLon]), Number(datum[targetLat])];
                if (![...source, ...target].every(Number.isFinite)) return null;

                const interpolate = d3.geoInterpolate(source, target);
                const coordinates = d3.range(0, INTERPOLATION_STEPS + 1).map((step) => interpolate(step / INTERPOLATION_STEPS));
                const d = path({ type: "LineString", coordinates });

                return d ? { key: `${index}`, datum, d } : null;
            })
            .filter((arc): arc is IArc => arc !== null);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = category ? d3.scaleOrdinal<string>().domain(categories).range(palette) : null;
        const colorFor = (arc: IArc) => (colorScale ? colorScale(`${arc.datum[category]}`).toString() : (color ?? palette[0]).toString());

        const strokeWidthFor = Array.isArray(strokeWidth)
            ? (() => {
                  const extent = d3.extent((data as IData).map((datum) => Number(datum[value]))) as [number, number];
                  const scale = d3.scaleSqrt().domain(extent).range(strokeWidth);
                  return (arc: IArc) => scale(Number(arc.datum[value]));
              })()
            : () => strokeWidth;

        return { arcs, colorFor, strokeWidthFor };
    }, [data, sourceLat, sourceLon, targetLat, targetLon, value, strokeWidth, category, categories, palette, color, path]);

    const handleMouseOver = (arc: IArc, element: Element, event: MouseEvent) => {
        const { datum } = arc;
        const color = colorFor(arc) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip &&
            onTooltip({
                datum,
                event,
                name: `${datum[sourceLat]}, ${datum[sourceLon]} → ${datum[targetLat]}, ${datum[targetLon]}`,
                value: value ? datum[value] : undefined,
                color,
            });
    };

    const handleMouseOut = (arc: IArc, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(arc.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (arc: IArc, element: Element, event: MouseEvent) => {
        onClick && onClick(arc.datum, element, event);
    };

    const Arcs = useCanvas ? CanvasArcsPlot : SVGArcsPlot;

    return (
        <Arcs
            renderVirtualCanvas={renderVirtualCanvas}
            className="geo-arc"
            items={arcs}
            keyFor={(arc) => arc.key}
            d={(arc) => arc.d}
            stroke={colorFor}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidthFor}
            cursor={() => (interactive ? "pointer" : "default")}
            interactive={interactive}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        />
    );
}
