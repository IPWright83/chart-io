import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import {
    bird_migration_dataset,
    city_energy_mix,
    continent_centroids,
    continent_population,
    continent_regions,
    major_cities,
} from "../../../data/world_map_dataset";
import { trade_flows_dataset } from "../../../data/trade_flows_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { createSVGTest } from "../../testUtils";
import { Choropleth } from "./Geo/Choropleth";
import { Geo } from "./Geo/Geo";
import { GeoArcs } from "./Geo/GeoArcs";
import { GeoPaths } from "./Geo/GeoPaths";
import { GeoPie } from "./Geo/GeoPie";
import { GeoPoints } from "./Geo/GeoPoints";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Geo/Geo",
    component: Geo,
    parameters: {
        docs: {
            transformSource: (src) => {
                src = src.replaceAll(/undefined,?/g, "");
                src = src.replace(/^\s*\n/gm, "");
                return src;
            },
        },
        chromatic: { delay: 300 },
    },
    args: {
        onClick: fn(),
        onMouseOver: fn(),
        onMouseOut: fn(),
    },
    argTypes: {
        useCanvas,
        width,
        height,
        theme,
        leftMargin: margin,
        rightMargin: margin,
        topMargin: margin,
        bottomMargin: margin,
    },
} as Meta<typeof Geo>;

const GeoTemplate = (args) => (
    <Geo
        data={args.data}
        features={args.features}
        plotMargin={{
            left: args.leftMargin,
            right: args.rightMargin,
            top: args.topMargin,
            bottom: args.bottomMargin,
        }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
    >
        {args.children}
    </Geo>
);

const DEFAULT_ARGS = {
    useCanvas: false,
    width: 700,
    height: 450,
    animationDuration: 250,
    theme: themes.light,
    leftMargin: 20,
    rightMargin: 20,
    topMargin: 20,
    bottomMargin: 20,
};

export const Basic = {
    name: "Choropleth",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: continent_population,
        features: continent_regions,
        children: <Choropleth regionKey="continent" value="population" />,
    },
    play: createSVGTest("path.choropleth-region", { clientX: 150, clientY: 200 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: GeoTemplate,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
};

export const Points = {
    name: "GeoPoints",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: major_cities,
        features: continent_regions,
        children: <GeoPoints lat="lat" lon="lon" value="population" radius={[4, 20]} category="continent" />,
    },
    play: createSVGTest("circle.geo-point", { clientX: 150, clientY: 200 }),
};

export const Pie = {
    name: "GeoPie",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: city_energy_mix,
        features: continent_regions,
        children: <GeoPie lat="lat" lon="lon" category="source" value="value" radius={16} />,
    },
    play: createSVGTest("path.geo-pie-slice", { clientX: 150, clientY: 200 }),
};

// Combine a handful of the illustrative continent-to-continent `trade_flows_dataset` routes (see
// Chord/Sankey) with each continent's approximate centroid, so they can be plotted as flow arcs.
// Only a few routes are used so each arc's curve stays legible - the full dataset has 14 routes,
// several long-haul enough (e.g. North America/Asia) that their great circles cross near the
// antimeridian, which this projection (fitted to the visible continents, not the Pacific) can't show
const TRADE_ROUTES_TO_SHOW = [
    ["North America", "Europe"],
    ["Europe", "Africa"],
    ["Africa", "Asia"],
    ["Asia", "Oceania"],
];

const tradeFlowRoutes = TRADE_ROUTES_TO_SHOW.map(([from, to]) => {
    const { trade } = trade_flows_dataset.find((route) => route.from === from && route.to === to);

    return {
        from,
        to,
        trade,
        fromLat: continent_centroids[from].lat,
        fromLon: continent_centroids[from].lon,
        toLat: continent_centroids[to].lat,
        toLon: continent_centroids[to].lon,
    };
});

export const Arcs = {
    name: "GeoArcs",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: tradeFlowRoutes,
        features: continent_regions,
        children: <GeoArcs sourceLat="fromLat" sourceLon="fromLon" targetLat="toLat" targetLon="toLon" value="trade" category="from" />,
    },
    play: createSVGTest("path.geo-arc", { clientX: 150, clientY: 200 }),
};

export const Paths = {
    name: "GeoPaths",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: bird_migration_dataset,
        features: continent_regions,
        children: <GeoPaths lat="lat" lon="lon" group="bird" order="day" />,
    },
    play: createSVGTest("path.geo-route", { clientX: 150, clientY: 200 }),
};

// A single dataset shared by both layers: the city rows carry `lat`/`lon` for <GeoPoints>, and the
// continent rows (deliberately listed last, so they win Choropleth's region lookup for any continent
// that also has a city) carry the `population` <Choropleth> colors regions by
const composedData = [...major_cities, ...continent_population];

export const Composed = {
    name: "Composing Multiple Layers",
    render: GeoTemplate,
    args: {
        ...DEFAULT_ARGS,
        data: composedData,
        features: continent_regions,
        children: (
            <React.Fragment>
                <Choropleth regionKey="continent" value="population" />
                <GeoPoints lat="lat" lon="lon" color="#ffffff" radius={4} interactive={false} />
            </React.Fragment>
        ),
    },
    play: createSVGTest("path.choropleth-region", { clientX: 150, clientY: 200 }),
};
