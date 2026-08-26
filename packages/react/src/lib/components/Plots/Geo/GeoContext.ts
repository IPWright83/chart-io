import { d3, logAndThrowError } from "@chart-io/core";

import type { FeatureCollection } from "geojson";

import { createContext, useContext } from "react";

export interface IGeoContextValue {
    /** The projection every layer's coordinates are projected through, fitted to the plot area */
    projection: d3.GeoProjection;
    /** A `d3.geoPath` bound to `projection`, turning a GeoJSON geometry into an SVG `d` string */
    path: d3.GeoPath;
    /** Projects a `[longitude, latitude]` pair into `[x, y]` pixels, or `null` if it's not visible */
    project: (coordinates: [number, number]) => [number, number] | null;
    /** The normalized geography passed to `<Geo>`, if any - consumed by `<Choropleth>` */
    features?: FeatureCollection;
}

export const GeoContext = createContext<IGeoContextValue | null>(null);

/**
 * Reads the projection set up by an ancestor `<Geo>` - used by every one of its layers
 * (`<Choropleth>`, `<GeoPoints>`, `<GeoPie>`, `<GeoArcs>`, `<GeoPaths>`) to project their
 * longitude/latitude data into the same shared pixel space
 * @param  componentName     The name of the calling layer component, used in the error if it's missing
 * @return                   The projection context
 */
export function useGeoContext(componentName: string): IGeoContextValue {
    const context = useContext(GeoContext);

    if (!context) {
        logAndThrowError("E009", `<${componentName}> must be rendered inside a <Geo> chart`);
    }

    return context;
}
