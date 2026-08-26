import { d3 } from "@chart-io/core";
import type { IGeoFeatures, IOnClick, IOnMouseOut, IOnMouseOver } from "@chart-io/core";

import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";
import { extendChildrenProps } from "../../../utils";

import { GeoContext } from "./GeoContext";
import type { IGeoProjectionType } from "./resolveProjection";
import { useGeoProjection } from "./useGeoProjection";

export interface IGeoProps extends Omit<IChartProps, "children"> {
    /**
     * The layers to render onto the map, e.g. any combination of `<Choropleth>`, `<GeoPoints>`,
     * `<GeoPie>`, `<GeoArcs>` and `<GeoPaths>`
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * The geography to render/fit the map to - GeoJSON (a `Feature` or `FeatureCollection`) or a
     * TopoJSON `Topology` (e.g. from `world-atlas`/`us-atlas`) - see `object`. Consumed directly by
     * `<Choropleth>` for its regions, and used by every layer to fit the shared projection.
     * Optional - a map of scattered points/arcs/paths doesn't need any region geometry, and will
     * fit the projection to the whole globe/plane instead
     */
    features?: IGeoFeatures;
    /**
     * Which object to extract, if `features` is a TopoJSON `Topology` with more than one (e.g.
     * `"states"` vs `"counties"`). Defaults to the first object on the topology
     */
    object?: string;
    /**
     * The projection to use - either one of the built-in presets (`"equalEarth"`, `"mercator"`,
     * `"naturalEarth1"`, `"orthographic"`, `"albersUsa"`, `"albers"`, `"azimuthalEqualArea"`), or a
     * factory function for full control over a `d3-geo` projection of your own
     * @default "equalEarth"
     */
    projection?: IGeoProjectionType | (() => d3.GeoProjection);
    /**
     * An optional `[lambda, phi, gamma]` rotation, in degrees, applied to the projection - e.g. to
     * recenter a world map on a different meridian
     */
    rotate?: [number, number, number];
}

/**
 * Represents a Geo/map chart. A self-contained chart: no need to wrap it in another chart component
 * yourself. Renders no basemap of its own - compose in whichever layers you need as `children`:
 * `<Choropleth>` for shaded regions, `<GeoPoints>`/`<GeoPie>` for markers/pie glyphs at
 * locations, and `<GeoArcs>`/`<GeoPaths>` for flows between locations or tracked routes through
 * them - any combination can be layered together onto the same projection
 * @param  props       The set of React properties
 * @return             The Geo component
 */
export const Geo = forwardRef<IChartRef, IGeoProps>(({ children, features, object, projection, rotate, ...chartProps }, ref) => {
    return (
        <Chart ref={ref} {...chartProps}>
            <GeoLayer features={features} object={object} projection={projection} rotate={rotate}>
                {children}
            </GeoLayer>
            <TooltipOverlay onlyNearest={true} />
            <LegendOverlay />
        </Chart>
    );
});

Geo.displayName = "Geo";

interface IGeoLayerProps {
    children?: JSX.Element | JSX.Element[];
    features?: IGeoFeatures;
    object?: string;
    projection?: IGeoProjectionType | (() => d3.GeoProjection);
    rotate?: [number, number, number];
    /**
     * The following are provided by `<Chart>`/`<VirtualCanvas>` cloning them onto their direct
     * children - `<GeoLayer>` is that direct child, so it re-forwards them onto its own children
     * (the actual layers), which is where they're really needed
     */
    useCanvas?: boolean;
    animationDuration?: number;
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Computes the projection shared by every layer (see `useGeoProjection`) and provides it via
 * `GeoContext`, so `<Choropleth>`/`<GeoPoints>`/`<GeoPie>`/`<GeoArcs>`/`<GeoPaths>` can project their
 * data into the same pixel space without each recomputing their own. Also the direct child of
 * `<Chart>` that actually carries the `isPlot`/`requiresVirtualCanvas` flags `<VirtualCanvas>` and
 * `<ZoomBrush>` look for - so it re-forwards the props they clone onto it down to its own children
 * @param  props       The set of React properties
 * @return             The GeoLayer component
 */
function GeoLayer({
    children,
    features,
    object,
    projection,
    rotate,
    useCanvas,
    animationDuration,
    renderVirtualCanvas,
    onMouseOver,
    onMouseOut,
    onClick,
}: IGeoLayerProps) {
    const context = useGeoProjection({ features, object, projection, rotate });

    const childrenWithProps = extendChildrenProps(children, {
        useCanvas,
        animationDuration,
        renderVirtualCanvas,
        ...(onMouseOver && { onMouseOver }),
        ...(onMouseOut && { onMouseOut }),
        ...(onClick && { onClick }),
    });

    return <GeoContext.Provider value={context}>{childrenWithProps}</GeoContext.Provider>;
}

GeoLayer.requiresVirtualCanvas = true;
GeoLayer.isPlot = true;
