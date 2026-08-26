import { chartSelectors, d3, formatNumber, IState } from "@chart-io/core";
import type { IColor, IData, IDatum, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import type { Feature } from "geojson";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useDatumContextMenu, useLegendItems } from "../../../../hooks";
import { withCanvas, withSVG } from "../../../../hoc";

import { ShapesPlot, IShapesPlotProps } from "../../ShapesPlot";
import { useFocused } from "../../useFocused";
import { useTooltip } from "../../useTooltip";
import { useGeoContext } from "../GeoContext";

const DEFAULT_COLORS: IColor[] = ["#eff3ff", "#bdd7e7", "#9ecae1", "#6baed6", "#3182bd", "#08519c"];

interface IRegion {
    id: string;
    feature: Feature;
    datum?: IDatum;
    d: string;
}

const CanvasRegionsPlot = withCanvas<IShapesPlotProps<IRegion>>(ShapesPlot, "plot choropleth-region");
const SVGRegionsPlot = withSVG<IShapesPlotProps<IRegion>>(ShapesPlot, "plot choropleth-region");

export interface IChoroplethProps {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
    /**
     * The key of the field, on each row of data, that identifies which region it belongs to - joined
     * against `featureKey(feature)` to color that region
     */
    regionKey: string;
    /**
     * The key of the numeric field used to color each region
     */
    value: string;
    /**
     * Returns the ID for a GeoJSON feature, matched against each row's `regionKey` field to find the
     * data for that region
     * @default (feature) => `${feature.id ?? feature.properties?.id}`
     */
    featureKey?: (feature: Feature) => string;
    /**
     * Returns the display name for a GeoJSON feature, used in the tooltip
     * @default (feature) => `${feature.properties?.name ?? featureKey(feature)}`
     */
    featureName?: (feature: Feature) => string;
    /**
     * The sequence of colors to quantize `value` into - e.g. a 3-color array buckets every region
     * into a "low"/"medium"/"high" shade
     * @default A 6-shade sequential blue palette
     */
    colors?: IColor[];
    /**
     * Overrides the `[min, max]` domain colors are quantized across. Defaults to the extent of
     * `value` across the data
     */
    domain?: [number, number];
    /**
     * The fill color for a region with no matching row of data
     * @default theme.background
     */
    noDataColor?: IColor;
    /**
     * The border color drawn between regions
     * @default theme.background
     */
    stroke?: IColor;
    /**
     * The width, in pixels, of the border between regions
     * @default 1
     */
    strokeWidth?: number;
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

const defaultFeatureKey = (feature: Feature) => `${feature.id ?? (feature.properties as IDatum)?.id}`;

/**
 * Represents a Choropleth layer, shading each region of `<Geo>`'s `features` by a quantized color
 * scale of `value`, joined against the chart's data via `regionKey`/`featureKey`. Used inside a
 * `<Geo>` chart alongside any other layer (`<GeoPoints>`, `<GeoPie>`, `<GeoArcs>`, `<GeoPaths>`) -
 * not a standalone chart itself
 * @param  props       The set of React properties
 * @return             The Choropleth component
 */
export function Choropleth({
    useCanvas = false,
    regionKey,
    value,
    featureKey = defaultFeatureKey,
    featureName,
    colors,
    domain,
    noDataColor,
    stroke,
    strokeWidth = 1,
    interactive = true,
    showInLegend = true,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IChoroplethProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const { features, path } = useGeoContext("Choropleth");

    const palette = colors ?? DEFAULT_COLORS;
    const nameFor = featureName ?? ((feature: Feature) => `${(feature.properties as IDatum)?.name ?? featureKey(feature)}`);

    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);
    const onDatumContextMenu = useDatumContextMenu();

    const { regions, colorScale } = useMemo(() => {
        const byRegion = new Map<string, IDatum>();
        (data as IData).forEach((datum) => byRegion.set(`${datum[regionKey]}`, datum));

        const extent = domain ?? (d3.extent((data as IData).map((datum) => Number(datum[value]))) as [number, number]);
        const colorScale = d3.scaleQuantize<IColor>().domain(extent).range(palette);

        const regions: IRegion[] = (features?.features ?? []).map((feature) => {
            const id = featureKey(feature);
            return { id, feature, datum: byRegion.get(id), d: path(feature) ?? "" };
        });

        return { regions, colorScale };
    }, [data, features, regionKey, value, domain, palette, featureKey, path]);

    const legendColors = colorScale.range();
    const legendKeys = legendColors.map((color) => {
        const [min, max] = colorScale.invertExtent(color);
        return `${formatNumber(min)} - ${formatNumber(max)}`;
    });

    useLegendItems(legendKeys, "square", showInLegend, legendColors);

    const colorFor = (region: IRegion) =>
        region.datum ? colorScale(Number(region.datum[value])).toString() : (noDataColor ?? theme.background).toString();

    const handleMouseOver = (region: IRegion, element: Element, event: MouseEvent) => {
        const { datum } = region;
        const color = colorFor(region) as IColor;

        onMouseOver && onMouseOver(datum, element, event);
        onFocus && onFocus({ element, event, datum });
        onTooltip && datum && onTooltip({ datum, event, name: nameFor(region.feature), value: datum[value], color });
    };

    const handleMouseOut = (region: IRegion, element: Element, event: MouseEvent) => {
        onMouseOut && onMouseOut(region.datum, element, event);
        onFocus && onFocus(null);
        onTooltip && onTooltip(null);
    };

    const handleClick = (region: IRegion, element: Element, event: MouseEvent) => {
        onClick && onClick(region.datum, element, event);
        region.datum && onDatumContextMenu(region.datum, event);
    };

    const Regions = useCanvas ? CanvasRegionsPlot : SVGRegionsPlot;

    return (
        <Regions
            renderVirtualCanvas={renderVirtualCanvas}
            className="choropleth-region"
            items={regions}
            keyFor={(region) => region.id}
            d={(region) => region.d}
            fill={colorFor}
            fillOpacity={theme.series.opacity}
            stroke={(stroke ?? theme.background).toString()}
            strokeWidth={strokeWidth}
            cursor={() => (interactive ? "pointer" : "default")}
            interactive={interactive}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        />
    );
}
