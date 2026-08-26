---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Geo>`, a map chart supporting Choropleth (shaded region) maps as well as points, pie glyphs, flow arcs and tracked routes plotted onto a shared projection.

`<Geo>` is a composition root like `<XYChart>` - it's self-contained (wraps `<Chart>` directly, so no need to nest it yourself), but rather than a single fixed plot it composes any combination of new layers as `children`, all sharing one `d3-geo` projection fitted to the plot area:

- `<Choropleth>` shades each region of a GeoJSON/TopoJSON `features` geography by a quantized color scale, joined against the chart's data by a region key - e.g. population by country/state.
- `<GeoPoints>` plots a marker per row at its `lat`/`lon`, optionally sized by a value field.
- `<GeoPie>` plots a small Pie/Donut glyph per location, summarizing that location's rows by category - e.g. the energy mix for every country on a world map.
- `<GeoArcs>` draws a great-circle flow line between a `source`/`target` `lat`/`lon` pair per row - e.g. migration between regions.
- `<GeoPaths>` connects each group's rows (e.g. one tracked animal's individual position readings) into a single ordered route across the map - e.g. bird migration tracks.

Any combination of layers can be composed onto the same `<Geo>`, e.g. a Choropleth with `<GeoPoints>` markers on top. Supports both GeoJSON and TopoJSON (via the new `topojson-client` dependency) for `features`, any of `d3-geo`'s standard projections (or a custom projection factory), and Canvas rendering via `useCanvas` alongside a new `renderGeoPath` Canvas primitive (registered under the `"geo"` path type) shared by every layer that draws an arbitrary projected shape.
