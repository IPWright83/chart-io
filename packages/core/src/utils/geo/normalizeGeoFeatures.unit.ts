import type { FeatureCollection } from "geojson";

import { ITopology, normalizeGeoFeatures } from "./normalizeGeoFeatures";

describe("normalizeGeoFeatures", () => {
    it("returns undefined when no features are given", () => {
        expect(normalizeGeoFeatures(undefined)).toBeUndefined();
    });

    it("passes a FeatureCollection through unchanged", () => {
        const featureCollection: FeatureCollection = {
            type: "FeatureCollection",
            features: [{ type: "Feature", properties: { id: "A" }, geometry: { type: "Point", coordinates: [0, 0] } }],
        };

        expect(normalizeGeoFeatures(featureCollection)).toBe(featureCollection);
    });

    it("wraps a single Feature in a FeatureCollection", () => {
        const feature = { type: "Feature" as const, properties: { id: "A" }, geometry: { type: "Point" as const, coordinates: [0, 0] } };

        expect(normalizeGeoFeatures(feature)).toEqual({
            type: "FeatureCollection",
            features: [feature],
        });
    });

    it("converts a TopoJSON Topology's default object into a FeatureCollection", () => {
        const topology: ITopology = {
            type: "Topology",
            objects: {
                states: {
                    type: "GeometryCollection",
                    geometries: [
                        {
                            type: "Polygon",
                            properties: { name: "A" },
                            arcs: [[0]],
                        },
                    ],
                },
            },
            arcs: [
                [
                    [0, 0],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                    [0, -1],
                ],
            ],
        };

        const result = normalizeGeoFeatures(topology);

        expect(result.type).toBe("FeatureCollection");
        expect(result.features).toHaveLength(1);
        expect(result.features[0].properties).toEqual({ name: "A" });
    });

    it("converts a named TopoJSON object when `object` is given", () => {
        const topology: ITopology = {
            type: "Topology",
            objects: {
                countries: {
                    type: "GeometryCollection",
                    geometries: [],
                },
                states: {
                    type: "GeometryCollection",
                    geometries: [
                        {
                            type: "Polygon",
                            properties: { name: "A" },
                            arcs: [[0]],
                        },
                    ],
                },
            },
            arcs: [
                [
                    [0, 0],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                    [0, -1],
                ],
            ],
        };

        const result = normalizeGeoFeatures(topology, "states");

        expect(result.features).toHaveLength(1);
        expect(result.features[0].properties).toEqual({ name: "A" });
    });

    it("wraps a single extracted Feature (a non-GeometryCollection object) in a FeatureCollection", () => {
        const topology: ITopology = {
            type: "Topology",
            objects: {
                outline: {
                    type: "Polygon",
                    properties: { name: "outline" },
                    arcs: [[0]],
                },
            },
            arcs: [
                [
                    [0, 0],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                    [0, -1],
                ],
            ],
        };

        const result = normalizeGeoFeatures(topology);

        expect(result.type).toBe("FeatureCollection");
        expect(result.features).toHaveLength(1);
    });
});
