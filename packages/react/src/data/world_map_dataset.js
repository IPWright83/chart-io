// Illustrative, deliberately low-resolution "world map" used by the <Geo> family of stories -
// simplified bounding-box regions rather than real coastlines, so the Storybook/Chromatic build has
// no external basemap dependency. GeoJSON requires an exterior ring to be wound clockwise when
// plotted with longitude as x and latitude as y (north up) - see each ring below

const continent_regions = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            id: "North America",
            properties: { continent: "North America" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-170, 10],
                        [-170, 75],
                        [-50, 75],
                        [-50, 10],
                        [-170, 10],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            id: "South America",
            properties: { continent: "South America" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-80, -55],
                        [-80, 10],
                        [-35, 10],
                        [-35, -55],
                        [-80, -55],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            id: "Europe",
            properties: { continent: "Europe" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-10, 35],
                        [-10, 70],
                        [40, 70],
                        [40, 35],
                        [-10, 35],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            id: "Africa",
            properties: { continent: "Africa" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-20, -35],
                        [-20, 37],
                        [50, 37],
                        [50, -35],
                        [-20, -35],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            id: "Asia",
            properties: { continent: "Asia" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [45, 5],
                        [45, 70],
                        [150, 70],
                        [150, 5],
                        [45, 5],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            id: "Oceania",
            properties: { continent: "Oceania" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [110, -45],
                        [110, -10],
                        [180, -10],
                        [180, -45],
                        [110, -45],
                    ],
                ],
            },
        },
    ],
};

// Approximate 2023 population, in millions
const continent_population = [
    { continent: "North America", population: 596 },
    { continent: "South America", population: 436 },
    { continent: "Europe", population: 743 },
    { continent: "Africa", population: 1460 },
    { continent: "Asia", population: 4753 },
    { continent: "Oceania", population: 45 },
];

const major_cities = [
    { city: "New York", continent: "North America", lat: 40.7, lon: -74.0, population: 8.3 },
    { city: "Mexico City", continent: "North America", lat: 19.4, lon: -99.1, population: 9.2 },
    { city: "São Paulo", continent: "South America", lat: -23.5, lon: -46.6, population: 12.3 },
    { city: "Buenos Aires", continent: "South America", lat: -34.6, lon: -58.4, population: 3.1 },
    { city: "London", continent: "Europe", lat: 51.5, lon: -0.1, population: 8.9 },
    { city: "Paris", continent: "Europe", lat: 48.9, lon: 2.4, population: 2.1 },
    { city: "Cairo", continent: "Africa", lat: 30.0, lon: 31.2, population: 10.0 },
    { city: "Lagos", continent: "Africa", lat: 6.5, lon: 3.4, population: 15.4 },
    { city: "Tokyo", continent: "Asia", lat: 35.7, lon: 139.7, population: 14.0 },
    { city: "Mumbai", continent: "Asia", lat: 19.1, lon: 72.9, population: 12.4 },
    { city: "Sydney", continent: "Oceania", lat: -33.9, lon: 151.2, population: 5.3 },
];

// Each city's illustrative electricity generation mix, for the <GeoPie> story
const ENERGY_MIX_BY_CITY = {
    "New York": [35, 45, 20],
    "Mexico City": [25, 65, 10],
    "São Paulo": [70, 25, 5],
    "Buenos Aires": [30, 60, 10],
    London: [45, 35, 20],
    Paris: [25, 15, 60],
    Cairo: [15, 80, 5],
    Lagos: [10, 90, 0],
    Tokyo: [30, 55, 15],
    Mumbai: [20, 75, 5],
    Sydney: [40, 60, 0],
};

const city_energy_mix = major_cities.flatMap(({ city, continent, lat, lon }) => {
    const [renewables, fossilFuels, nuclear] = ENERGY_MIX_BY_CITY[city];

    return [
        { city, continent, lat, lon, source: "Renewables", value: renewables },
        { city, continent, lat, lon, source: "Fossil fuels", value: fossilFuels },
        { city, continent, lat, lon, source: "Nuclear", value: nuclear },
    ];
});

// Approximate continent centroids, used to plot `trade_flows_dataset` (see ./trade_flows_dataset)
// as flow arcs on a <GeoArcs> layer
const continent_centroids = {
    "North America": { lat: 45, lon: -100 },
    "South America": { lat: -15, lon: -60 },
    Europe: { lat: 50, lon: 15 },
    Africa: { lat: 5, lon: 20 },
    Asia: { lat: 35, lon: 90 },
    Oceania: { lat: -25, lon: 140 },
};

// Simulated GPS fixes for two migrating birds, for the <GeoPaths> story
const bird_migration_dataset = [
    { bird: "Osprey 14", day: 1, lat: 60, lon: 15 },
    { bird: "Osprey 14", day: 5, lat: 50, lon: 10 },
    { bird: "Osprey 14", day: 10, lat: 35, lon: 5 },
    { bird: "Osprey 14", day: 15, lat: 15, lon: 0 },
    { bird: "Osprey 14", day: 20, lat: -5, lon: 10 },
    { bird: "Osprey 14", day: 25, lat: -25, lon: 20 },
    { bird: "Curlew 7", day: 1, lat: 65, lon: -20 },
    { bird: "Curlew 7", day: 6, lat: 55, lon: -15 },
    { bird: "Curlew 7", day: 12, lat: 40, lon: -12 },
    { bird: "Curlew 7", day: 18, lat: 20, lon: -16 },
    { bird: "Curlew 7", day: 24, lat: 0, lon: -10 },
];

export { continent_regions, continent_population, major_cities, city_energy_mix, continent_centroids, bird_migration_dataset };
