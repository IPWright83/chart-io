import { feature as topojsonFeature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";

/** A bare TopoJSON topology - typed loosely since `topojson-specification` isn't a direct dependency */
export interface ITopology {
    type: "Topology";
    objects: Record<string, unknown>;
    [key: string]: unknown;
}

/**
 * The geography a `<Geo>` chart can be given - either plain GeoJSON (a single `Feature` or a
 * `FeatureCollection`, e.g. hand-authored or already converted), or a TopoJSON `Topology` (e.g.
 * `world-atlas`/`us-atlas`), which is far more common for basemaps since it's typically an order of
 * magnitude smaller on the wire than the equivalent GeoJSON
 */
export type IGeoFeatures = Feature | FeatureCollection | ITopology;

/**
 * Normalizes any of the shapes `<Geo>` accepts for its `features` prop down to a single GeoJSON
 * `FeatureCollection`, so every layer (`<Choropleth>`, the projection fit, an optional sphere/graticule
 * outline, ...) can consume one consistent shape regardless of what was actually passed in
 * @param  features     The geography to normalize, or `undefined` if none was provided
 * @param  object       Which TopoJSON object to extract, if `features` is a `Topology`. Defaults to
 *                       the first object on the topology
 * @return              The normalized `FeatureCollection`, or `undefined` if no `features` were given
 */
export function normalizeGeoFeatures(features: IGeoFeatures | undefined, object?: string): FeatureCollection | undefined {
    if (!features) {
        return undefined;
    }

    if (features.type === "Topology") {
        const objectKey = object ?? Object.keys(features.objects)[0];
        const geometry = features.objects[objectKey];

        // istanbul ignore next: only reachable by passing a Topology with no objects, or an unknown key
        if (!geometry) {
            return { type: "FeatureCollection", features: [] };
        }

        // `topojson-client`'s `feature()` returns a `FeatureCollection` for a GeometryCollection
        // object, or a single `Feature` for anything else - normalize both to the same shape
        const extracted = topojsonFeature(features as any, geometry as any) as
            | FeatureCollection<Geometry>
            | Feature<Geometry>;

        return extracted.type === "FeatureCollection" ? extracted : { type: "FeatureCollection", features: [extracted] };
    }

    if (features.type === "FeatureCollection") {
        return features;
    }

    return { type: "FeatureCollection", features: [features] };
}
