# @chart-io/core

## 0.8.0

### Minor Changes

- 5b2c44b1: Moved the hierarchy-building logic behind `<StackedDonut>` into `@chart-io/core` as a shared `buildHierarchy` utility, decoupled from any particular layout. It now only groups, sums and (optionally) sorts a flat dataset into a `d3.hierarchy`, leaving each chart to apply its own layout on top (`<StackedDonut>` applies `d3.partition()` itself) - this is the first step towards sharing the same hierarchical data model across upcoming chart types (a treemap, dendrogram and radial dendrogram).

  Negative values in the hierarchy's `value` field are now treated as `0` (they aren't representable by any of these layouts) and log a new `W009` warning, rather than silently producing an incorrect or degenerate layout as before.

## 0.7.0

### Minor Changes

- 12dd70e7: Make the labeller chart-level rather than Radar-specific: `<Chart labeller>` (and so `<RadialChart>`/`<XYChart>`) now dispatches it into the redux store, mirroring how `theme` already works, so it's available to any plot type via the new `chartSelectors.labeller`. `<Radar>`'s own `labeller` prop now overrides the chart-level one for just that series rather than being the only way to set it.

  `<Radar>`'s `category` prop is now optional, defaulting to `"category"` - it only needs to be set explicitly when a chart has more than one independent Radar.

- 12dd70e7: Add a `<RadialArea>` chart - a filled area from the center outward, following a continuous angular domain (e.g. a full year of dates) around the circle. This is the polar equivalent of `<Area>`, and the shape behind [Observable's radial area chart example](https://observablehq.com/@d3/radial-area-chart/2). `<RadialAreas>` renders one series per field for multi-series comparisons.

  `<AngleAxis>` now supports continuous (`"time"`/`"linear"`) scale types in addition to categorical ones, drawing an evenly-spaced set of ticks rather than one spoke per raw data point. `<RadialAxis>` now shows real tick values (rather than always a normalized percentage) when it resolves to a single scale - one field, or multiple fields sharing an explicit `domain` - falling back to the normalized view only when fields are independently scaled (as `<Radar>` needs).

  `<RadialChart>` now includes an `<EventReceiver>` and `<Markers>` overlay (matching `<XYChart>`), so radial plots can support hover interactions driven by the global mouse position, not just per-element hover.

- 12dd70e7: Add a `<Radar>` chart, the polar equivalent of `<Lines>`: one closed polygon per series (one row of `data` per series), connecting a point for every field in `ys` around a shared angular scale, with a marker at each vertex for hover/click tooltips. Each series can be rendered `filled` (default) or as a stroke-only outline, which is useful when overlaying many series to compare trends without the fills obscuring one another.

  New `<AngleAxis>` and `<RadialAxis>` components (and matching `AngleScale`/`RadiusScale`) provide the spokes/category labels and normalized concentric rings that `<Radar>` needs, following the same `<XAxis>`/`<YAxis>` pattern used by `<Line>`. Unlike a shared linear axis, each field in `<RadialAxis>` gets its own independently computed domain, so one spoke can represent, say, a 1-5 rating while another represents a percentage or a raw count - the rings are always normalized (0-100%) so the differing domains stay comparable.

  `@chart-io/core` gains a generic `renderPolygon` canvas primitive so Radar series support Canvas rendering and hit-testing like other plots, and a new `createLabeller` utility that maps a field key (e.g. `"avg_score"`) to a display label (e.g. `"Mean Score"`) for use in tooltips, legends, and axis ticks - a first step towards future translation/formatting support.

- 12dd70e7: Add `chartSelectors.dimensions.plot.cx`/`cy`/`maxRadius` (`@chart-io/core`) and use them to de-duplicate the center-point/radius calculation that was repeated across `RadiusScale`, `AngleAxis`, `RadialAxis`, `withRadialPlot` and `CenterValueOverlay`. Also corrects the `aggregate` documentation on `RadiusScale`/`RadialAxis` (it computes a domain from the _sum_ of every field's value, the same as `<YAxis aggregate>` for a stacked chart - not a shared domain left unchanged, which is what an explicit `domain` override is for).

## 0.6.0

### Minor Changes

- 23d55506: Add Pie, Donut and StackedDonut charts. Introduces a `<PieChart>` wrapper (the polar equivalent of `<XYChart>`) composed with `<Pie>`, `<Donut>`, and `<StackedDonut>` plot components, following the same layering, HOC, and SVG/Canvas dual-rendering conventions as the existing XY plots. `@chart-io/core` gains a generic `renderArc` canvas primitive so Pie/Donut slices support Canvas rendering and hit-testing like other plots.

## 0.5.0

### Minor Changes

- cc56bcb5: Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
- c21d0371: Moving some helper functions, adding Svelte package

## 0.4.0

### Minor Changes

- 91e1f56: Removes sub-packages @chart-io/types @chart-io/d3 @chart-io/detection

## 0.3.0

### Minor Changes

- 1415a40: Adopt Redux toolkit over Redux

## 0.2.0

### Minor Changes

- 13dd7aa: Added a new core package for main rendering logic
