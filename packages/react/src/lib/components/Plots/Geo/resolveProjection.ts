import { d3 } from "@chart-io/core";

export type IGeoProjectionType =
    | "equalEarth"
    | "mercator"
    | "naturalEarth1"
    | "orthographic"
    | "albersUsa"
    | "albers"
    | "azimuthalEqualArea";

const PROJECTIONS: Record<IGeoProjectionType, () => d3.GeoProjection> = {
    equalEarth: d3.geoEqualEarth,
    mercator: d3.geoMercator,
    naturalEarth1: d3.geoNaturalEarth1,
    orthographic: d3.geoOrthographic,
    albersUsa: d3.geoAlbersUsa,
    albers: d3.geoAlbers,
    azimuthalEqualArea: d3.geoAzimuthalEqualArea,
};

/**
 * Resolves `<Geo>`'s `projection` prop into a fresh `d3.GeoProjection` instance - either one of the
 * built-in named presets, or a caller-supplied factory for full control (e.g. a custom `.rotate()`,
 * `.clipAngle()`, or an entirely different `d3-geo` projection not offered as a preset)
 * @param  projection     A preset name, or a factory function returning a `d3.GeoProjection`
 * @return                A new projection instance
 */
export function resolveProjection(projection: IGeoProjectionType | (() => d3.GeoProjection) = "equalEarth"): d3.GeoProjection {
    if (typeof projection === "function") {
        return projection();
    }

    return PROJECTIONS[projection]();
}
