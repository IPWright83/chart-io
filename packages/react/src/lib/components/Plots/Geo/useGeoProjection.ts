import { chartSelectors, d3, IState, normalizeGeoFeatures } from "@chart-io/core";
import type { IGeoFeatures } from "@chart-io/core";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import type { IGeoContextValue } from "./GeoContext";
import { IGeoProjectionType, resolveProjection } from "./resolveProjection";

// Used to fit the projection to the whole globe/plane when no `features` are given yet (e.g. while
// a `<GeoPoints>`/`<GeoArcs>`/`<GeoPaths>` map with no basemap geography is loading its own data)
const WORLD = { type: "Sphere" } as const;

export interface IUseGeoProjectionProps {
    /**
     * The geography to render/fit the projection to - GeoJSON (a `Feature` or `FeatureCollection`)
     * or a TopoJSON `Topology` (see `object`)
     */
    features?: IGeoFeatures;
    /**
     * Which object to extract, if `features` is a TopoJSON `Topology` with more than one. Defaults
     * to the first object on the topology
     */
    object?: string;
    /**
     * The projection to use - either one of the built-in presets, or a factory for full control
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
 * Builds the projection shared by a `<Geo>` chart's layers - fitted to the plot area (and, if given,
 * to `features`) once per render rather than being repeated by each layer
 * @param  props       The set of properties needed to build the projection
 * @return             The projection, its `path` generator, a `project` shorthand, and the
 *                      normalized `features`
 */
export function useGeoProjection({ features, object, projection, rotate }: IUseGeoProjectionProps): IGeoContextValue {
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));

    const featureCollection = useMemo(() => normalizeGeoFeatures(features, object), [features, object]);

    return useMemo(() => {
        const projectionInstance = resolveProjection(projection);

        if (rotate) {
            projectionInstance.rotate(rotate);
        }

        // A projection can't be usefully fitted to a zero-sized plot area (e.g. the first render,
        // before <Chart> has dispatched its measured dimensions)
        if (plotWidth > 0 && plotHeight > 0) {
            const extent: [[number, number], [number, number]] = [
                [plotLeft, plotTop],
                [plotLeft + plotWidth, plotTop + plotHeight],
            ];
            const geometry = featureCollection?.features?.length ? featureCollection : WORLD;

            projectionInstance.fitExtent(extent, geometry as any);
        }

        const path = d3.geoPath(projectionInstance);
        const project = ([longitude, latitude]: [number, number]): [number, number] | null =>
            projectionInstance([longitude, latitude]);

        return { projection: projectionInstance, path, project, features: featureCollection };
    }, [projection, rotate, featureCollection, plotLeft, plotTop, plotWidth, plotHeight]);
}
