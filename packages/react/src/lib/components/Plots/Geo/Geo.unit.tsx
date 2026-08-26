import { chartSelectors } from "@chart-io/core";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import React from "react";
import { render } from "@testing-library/react";

import { getBuffer, wait } from "../../../testUtils";

import { Choropleth } from "./Choropleth";
import { Geo } from "./Geo";
import { GeoArcs } from "./GeoArcs";
import { GeoPaths } from "./GeoPaths";
import { GeoPie } from "./GeoPie";
import { GeoPoints } from "./GeoPoints";

expect.extend({ toMatchImageSnapshot });

// GeoJSON (RFC 7946) requires an exterior ring to be wound clockwise when plotted with longitude as
// x and latitude as y (north up) - d3-geo relies on this to tell "the inside of this ring" from "the
// rest of the sphere", so a counterclockwise ring here would render as almost the whole globe with
// this shape cut out of it, not the shape itself
const features = {
    type: "FeatureCollection" as const,
    features: [
        {
            type: "Feature" as const,
            properties: { id: "north" },
            geometry: {
                type: "Polygon" as const,
                coordinates: [
                    [
                        [-10, 10],
                        [-10, 80],
                        [10, 80],
                        [10, 10],
                        [-10, 10],
                    ],
                ],
            },
        },
        {
            type: "Feature" as const,
            properties: { id: "south" },
            geometry: {
                type: "Polygon" as const,
                coordinates: [
                    [
                        [-10, -80],
                        [-10, -10],
                        [10, -10],
                        [10, -80],
                        [-10, -80],
                    ],
                ],
            },
        },
    ],
};

describe("Geo", () => {
    describe("Choropleth", () => {
        const data = [
            { region: "north", population: 10 },
            { region: "south", population: 90 },
        ];

        it("should render a region for every feature", async () => {
            const { container } = render(
                <Geo data={data} features={features} width={200} height={200}>
                    <Choropleth regionKey="region" value="population" />
                </Geo>,
            );

            await wait();

            expect(container.querySelectorAll("path.choropleth-region").length).toBe(2);
        });

        it("should color a region without a matching row of data using noDataColor", async () => {
            const noMatch = [{ region: "north", population: 10 }];

            const { container } = render(
                <Geo data={noMatch} features={features} width={200} height={200}>
                    <Choropleth regionKey="region" value="population" noDataColor="rgb(1, 2, 3)" />
                </Geo>,
            );

            await wait();

            const regions = container.querySelectorAll("path.choropleth-region");
            const southRegion = Array.from(regions).find((region) => region.getAttribute("d") !== regions[0].getAttribute("d"));

            expect((southRegion as SVGPathElement).style.fill).toBe("rgb(1, 2, 3)");
        });

        it("should add a legend item for every quantized color bucket", async () => {
            let capturedStore;

            render(
                <Geo
                    data={data}
                    features={features}
                    width={200}
                    height={200}
                    onStoreCreated={(store) => (capturedStore = store)}
                >
                    <Choropleth regionKey="region" value="population" colors={["#fff", "#000"]} />
                </Geo>,
            );

            await wait();

            expect(chartSelectors.legend.items(capturedStore.getState())).toHaveLength(2);
        });
    });

    describe("GeoPoints", () => {
        const data = [
            { city: "A", lat: 40, lon: -20, value: 5 },
            { city: "B", lat: -40, lon: 20, value: 15 },
        ];

        it("should render a point for every row of data", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200}>
                    <GeoPoints lat="lat" lon="lon" />
                </Geo>,
            );

            await wait();

            const points = container.querySelectorAll("circle.geo-point");
            expect(points.length).toBe(2);

            points.forEach((point) => {
                expect(Number(point.getAttribute("cx"))).toBeGreaterThanOrEqual(0);
                expect(Number(point.getAttribute("cx"))).toBeLessThanOrEqual(200);
                expect(Number(point.getAttribute("cy"))).toBeGreaterThanOrEqual(0);
                expect(Number(point.getAttribute("cy"))).toBeLessThanOrEqual(200);
            });
        });

        it("should scale radius by value when radius is a [min, max] range", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200} animationDuration={0}>
                    <GeoPoints lat="lat" lon="lon" value="value" radius={[2, 20]} />
                </Geo>,
            );

            await wait();

            const points = Array.from(container.querySelectorAll("circle.geo-point"));
            const radii = points.map((point) => Number(point.getAttribute("r")));

            expect(Math.min(...radii)).toBeCloseTo(2, 0);
            expect(Math.max(...radii)).toBeCloseTo(20, 0);
        });
    });

    describe("GeoArcs", () => {
        const data = [
            { fromLat: 10, fromLon: -10, toLat: 40, toLon: 30, migrants: 100 },
            { fromLat: -40, fromLon: -20, toLat: -10, toLon: 10, migrants: 50 },
        ];

        it("should render an arc for every row of data", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200}>
                    <GeoArcs sourceLat="fromLat" sourceLon="fromLon" targetLat="toLat" targetLon="toLon" value="migrants" />
                </Geo>,
            );

            await wait();

            const arcs = container.querySelectorAll("path.geo-arc");
            expect(arcs.length).toBe(2);
            arcs.forEach((arc) => expect(arc.getAttribute("d")).toMatch(/^M/));
        });
    });

    describe("GeoPaths", () => {
        const data = [
            { bird: "A", lat: 10, lon: -10, t: 1 },
            { bird: "A", lat: 15, lon: -5, t: 2 },
            { bird: "A", lat: 20, lon: 0, t: 3 },
            { bird: "B", lat: -10, lon: 10, t: 1 },
            { bird: "B", lat: -15, lon: 15, t: 2 },
        ];

        it("should render one route per group, and a waypoint per row", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200}>
                    <GeoPaths lat="lat" lon="lon" group="bird" order="t" />
                </Geo>,
            );

            await wait();

            expect(container.querySelectorAll("path.geo-route").length).toBe(2);
            expect(container.querySelectorAll("circle.geo-waypoint").length).toBe(5);
        });

        it("should not render waypoints when showPoints is false", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200}>
                    <GeoPaths lat="lat" lon="lon" group="bird" order="t" showPoints={false} />
                </Geo>,
            );

            await wait();

            expect(container.querySelectorAll("circle.geo-waypoint").length).toBe(0);
        });
    });

    describe("GeoPie", () => {
        const data = [
            { city: "A", lat: 40, lon: -20, source: "Solar", value: 30 },
            { city: "A", lat: 40, lon: -20, source: "Wind", value: 70 },
            { city: "B", lat: -40, lon: 20, source: "Solar", value: 50 },
            { city: "B", lat: -40, lon: 20, source: "Wind", value: 50 },
        ];

        it("should render a slice per row, grouped by location", async () => {
            const { container } = render(
                <Geo data={data} width={200} height={200}>
                    <GeoPie lat="lat" lon="lon" category="source" value="value" />
                </Geo>,
            );

            await wait();

            expect(container.querySelectorAll("path.geo-pie-slice").length).toBe(4);
        });
    });

    describe("composing multiple layers together", () => {
        it("should render every layer's elements onto the same map, sharing one projection", async () => {
            // A single shared dataset - the Choropleth reads `region`/`population`, GeoPoints reads
            // `lat`/`lon` - each layer simply ignores the fields it doesn't need
            const data = [
                { region: "north", population: 10, lat: 40, lon: -5 },
                { region: "south", population: 90, lat: -40, lon: 5 },
            ];

            const { container } = render(
                <Geo data={data} features={features} width={200} height={200}>
                    <Choropleth regionKey="region" value="population" />
                    <GeoPoints lat="lat" lon="lon" />
                </Geo>,
            );

            await wait();

            expect(container.querySelectorAll("path.choropleth-region").length).toBe(2);
            expect(container.querySelectorAll("circle.geo-point").length).toBe(2);
        });
    });

    describe("using Canvas", () => {
        it("should render a Choropleth to Canvas without throwing", async () => {
            const data = [
                { region: "north", population: 10 },
                { region: "south", population: 90 },
            ];

            const { container } = render(
                <Geo useCanvas={true} data={data} features={features} width={200} height={200} animationDuration={0}>
                    <Choropleth regionKey="region" value="population" />
                </Geo>,
            );

            await wait(300);

            const canvases = container.querySelectorAll(".canvas");
            expect(canvases.length).toBe(1);

            const buffer = getBuffer(canvases[0] as HTMLCanvasElement);
            expect(buffer).toMatchImageSnapshot();
        });
    });
});
