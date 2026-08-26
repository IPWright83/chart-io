import { chartSelectors, d3, IState } from "@chart-io/core";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import { groupBy, sortBy } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems } from "../../../../hooks";
import { withCanvas, withSVG } from "../../../../hoc";

import { INodesPlotProps, NodesPlot } from "../../NodesPlot";
import { ShapesPlot, IShapesPlotProps } from "../../ShapesPlot";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { useGeoContext } from "../GeoContext";

interface IRoute {
    key: string;
    group: string;
    rows: IData;
    d: string;
}

interface IWaypoint {
    key: string;
    group: string;
    datum: IDatum;
    cx: number;
    cy: number;
}

const CanvasRoutesPlot = withCanvas<IShapesPlotProps<IRoute>>(ShapesPlot, "plot geo-route");
const SVGRoutesPlot = withSVG<IShapesPlotProps<IRoute>>(ShapesPlot, "plot geo-route");
const CanvasWaypointsPlot = withCanvas<INodesPlotProps<IWaypoint>>(NodesPlot, "plot geo-waypoint");
const SVGWaypointsPlot = withSVG<INodesPlotProps<IWaypoint>>(NodesPlot, "plot geo-waypoint");

export interface IGeoPathsProps {
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
     * The key of the field identifying which route/track each row belongs to - e.g. a tracked
     * animal's ID, joining up all of its individual position readings into a single route
     */
    group: string;
    /**
     * The key of a field to sort each route's rows by before connecting them - e.g. a timestamp.
     * Uses the data's existing order if omitted
     */
    order?: string;
    /**
     * The key of a field used to color each route categorically. Every route uses `color`/the
     * theme's series colors (cycled by route) if omitted
     */
    category?: string;
    /**
     * A fixed color for every route, used when `category` isn't given
     */
    color?: IColor;
    /**
     * The set of colors to cycle through for each route/`category`. Defaults to the theme's series colors
     */
    colors?: IColor[];
    strokeWidth?: number;
    strokeOpacity?: number;
    /**
     * Should a marker be drawn at every waypoint along each route?
     * @default true
     */
    showPoints?: boolean;
    /**
     * The radius, in pixels, of each waypoint marker
     * @default 2.5
     */
    pointRadius?: number;
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
 * Represents a GeoPaths layer, connecting every route/`group`'s rows of data (e.g. one tracked
 * animal's individual position readings) into a single route across the map, ordered by `order` if
 * given. Used inside a `<Geo>` chart alongside any other layer - not a standalone chart itself
 * @param  props       The set of React properties
 * @return             The GeoPaths component
 */
export function GeoPaths({
    useCanvas = false,
    lat,
    lon,
    group,
    order,
    category,
    color,
    colors,
    strokeWidth = 1.5,
    strokeOpacity = 1,
    showPoints = true,
    pointRadius = 2.5,
    interactive = true,
    showInLegend = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IGeoPathsProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { project } = useGeoContext("GeoPaths");

    const palette = colors ?? theme.series.colors;
    const groups = useMemo(() => Object.keys(groupBy(data as IData, group)), [data, group]);
    const legendKeys = category ? Array.from(new Set((data as IData).map((d) => `${d[category]}`))) : groups;
    const legendColors = useMemo(() => legendKeys.map((_, index) => palette[index % palette.length]), [legendKeys, palette]);

    useLegendItems(legendKeys, "line", showInLegend, legendColors);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    const { routes, waypoints, colorFor } = useMemo(() => {
        const byGroup = groupBy(data as IData, group);

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(legendKeys).range(palette);
        const colorFor = (groupKey: string, datum: IDatum) => {
            if (color) return color.toString();
            const key = category ? `${datum[category]}` : groupKey;
            return colorScale(key).toString();
        };

        const projectRow = (datum: IDatum): [number, number] | null => {
            const longitude = Number(datum[lon]);
            const latitude = Number(datum[lat]);
            if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return null;

            return project([longitude, latitude]);
        };

        const routes: IRoute[] = groups.map((groupKey) => {
            const rows = order ? sortBy(byGroup[groupKey], order) : byGroup[groupKey];
            const coordinates = rows.map(projectRow).filter((point): point is [number, number] => point !== null);

            return { key: groupKey, group: groupKey, rows, d: d3.line()(coordinates) ?? "" };
        });

        const waypoints: IWaypoint[] = showPoints
            ? groups.flatMap((groupKey) =>
                  (order ? sortBy(byGroup[groupKey], order) : byGroup[groupKey])
                      .map((datum, index) => {
                          const projected = projectRow(datum);
                          return projected ? { key: `${groupKey}:${index}`, group: groupKey, datum, cx: projected[0], cy: projected[1] } : null;
                      })
                      .filter((waypoint): waypoint is IWaypoint => waypoint !== null),
              )
            : [];

        return { routes, waypoints, colorFor };
    }, [data, group, groups, order, lat, lon, category, legendKeys, palette, color, project, showPoints]);

    const handleMouseOver = (item: IRoute | IWaypoint, element: Element, event: MouseEvent) => {
        const datum = "datum" in item ? item.datum : item.rows[item.rows.length - 1];
        const routeColor = colorFor(item.group, datum) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && onTooltip({ datum, event, name: item.group, value: undefined, color: routeColor });
    };

    const handleMouseOut = (item: IRoute | IWaypoint, element: Element, event: MouseEvent) => {
        const datum = "datum" in item ? item.datum : item.rows[item.rows.length - 1];

        onMouseOut && onMouseOut(datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (item: IRoute | IWaypoint, element: Element, event: MouseEvent) => {
        const datum = "datum" in item ? item.datum : item.rows[item.rows.length - 1];
        onClick && onClick(datum, element, event);
    };

    const Routes = useCanvas ? CanvasRoutesPlot : SVGRoutesPlot;
    const Waypoints = useCanvas ? CanvasWaypointsPlot : SVGWaypointsPlot;

    return (
        <React.Fragment>
            <Routes
                renderVirtualCanvas={renderVirtualCanvas}
                className="geo-route"
                items={routes}
                keyFor={(route) => route.key}
                d={(route) => route.d}
                stroke={(route) => colorFor(route.group, route.rows[route.rows.length - 1])}
                strokeOpacity={strokeOpacity}
                strokeWidth={strokeWidth}
                cursor={() => (interactive ? "pointer" : "default")}
                interactive={interactive}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            />
            {showPoints && (
                <Waypoints
                    renderVirtualCanvas={renderVirtualCanvas}
                    className="geo-waypoint"
                    items={waypoints}
                    keyFor={(waypoint) => waypoint.key}
                    cx={(waypoint) => waypoint.cx}
                    cy={(waypoint) => waypoint.cy}
                    radius={() => pointRadius}
                    color={(waypoint) => colorFor(waypoint.group, waypoint.datum)}
                    opacity={theme.series.opacity}
                    cursor={() => (interactive ? "pointer" : "default")}
                    interactive={interactive}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleClick}
                />
            )}
        </React.Fragment>
    );
}
