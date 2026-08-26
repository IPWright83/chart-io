import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useDatumContextMenu, useLegendItems } from "../../../../hooks";
import { withCanvas, withSVG } from "../../../../hoc";

import { INodesPlotProps, NodesPlot } from "../../NodesPlot";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { useGeoContext } from "../GeoContext";

interface IPoint {
    key: string;
    datum: IDatum;
    cx: number;
    cy: number;
}

const CanvasPointsPlot = withCanvas<INodesPlotProps<IPoint>>(NodesPlot, "plot geo-points");
const SVGPointsPlot = withSVG<INodesPlotProps<IPoint>>(NodesPlot, "plot geo-points");

export interface IGeoPointsProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The key of the field holding each row's latitude
     */
    lat: string;
    /**
     * The key of the field holding each row's longitude
     */
    lon: string;
    /**
     * The key of a numeric field to size each point by (area-proportional, via a square-root
     * scale). Points are drawn at a fixed `radius` if omitted
     */
    value?: string;
    /**
     * A fixed radius for every point, or the `[min, max]` pixel range to scale `value` into
     * @default 4
     */
    radius?: number | [number, number];
    /**
     * The key of a field used to color each point categorically. Every point uses `color`/the
     * theme's first series color if omitted
     */
    category?: string;
    /**
     * A fixed color for every point, used when `category` isn't given
     */
    color?: IColor;
    /**
     * The set of colors to use for each `category`. Defaults to the theme's series colors
     */
    colors?: IColor[];
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
 * Represents a GeoPoints layer, plotting a circle marker for every row of data at its `lat`/`lon`
 * coordinate - optionally sized by a `value` field and/or colored by a `category` field. Used inside
 * a `<Geo>` chart alongside any other layer - not a standalone chart itself
 * @param  props       The set of React properties
 * @return             The GeoPoints component
 */
export function GeoPoints({
    useCanvas = false,
    lat,
    lon,
    value,
    radius = 4,
    category,
    color,
    colors,
    interactive = true,
    showInLegend = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IGeoPointsProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { project } = useGeoContext("GeoPoints");

    const palette = colors ?? theme.series.colors;
    const categories = useMemo(
        () => (category ? Array.from(new Set((data as IData).map((d) => `${d[category]}`))) : []),
        [data, category],
    );
    const legendColors = useMemo(() => categories.map((_, index) => palette[index % palette.length]), [categories, palette]);

    useLegendItems(categories, "circle", showInLegend && Boolean(category), legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);
    const onDatumContextMenu = useDatumContextMenu();

    const { points, colorFor, radiusFor } = useMemo(() => {
        const points: IPoint[] = (data as IData)
            .map((datum, index) => {
                const longitude = Number(datum[lon]);
                const latitude = Number(datum[lat]);
                if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return null;

                const projected = project([longitude, latitude]);
                return projected ? { key: `${index}`, datum, cx: projected[0], cy: projected[1] } : null;
            })
            .filter((point): point is IPoint => point !== null);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = category ? d3.scaleOrdinal<string>().domain(categories).range(palette) : null;
        const colorFor = (point: IPoint) => (colorScale ? colorScale(`${point.datum[category]}`).toString() : (color ?? palette[0]).toString());

        const radiusFor = Array.isArray(radius)
            ? (() => {
                  const extent = d3.extent((data as IData).map((datum) => Number(datum[value]))) as [number, number];
                  const scale = d3.scaleSqrt().domain(extent).range(radius);
                  return (point: IPoint) => scale(Number(point.datum[value]));
              })()
            : () => radius;

        return { points, colorFor, radiusFor };
    }, [data, lat, lon, value, radius, category, categories, palette, color, project]);

    const handleMouseOver = (point: IPoint, element: Element, event: MouseEvent) => {
        const { datum } = point;
        const color = colorFor(point) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name: category ? `${datum[category]}` : `${datum[lat]}, ${datum[lon]}`, value: value ? datum[value] : undefined, color });
    };

    const handleMouseOut = (point: IPoint, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(point.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (point: IPoint, element: Element, event: MouseEvent) => {
        onClick && onClick(point.datum, element, event);
        onDatumContextMenu(point.datum, event);
    };

    const Points = useCanvas ? CanvasPointsPlot : SVGPointsPlot;

    return (
        <Points
            renderVirtualCanvas={renderVirtualCanvas}
            className="geo-point"
            items={points}
            keyFor={(point) => point.key}
            cx={(point) => point.cx}
            cy={(point) => point.cy}
            radius={radiusFor}
            color={colorFor}
            opacity={theme.series.opacity}
            stroke={theme.background.toString()}
            cursor={() => (interactive ? "pointer" : "default")}
            interactive={interactive}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        />
    );
}
