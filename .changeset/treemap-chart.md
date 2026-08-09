---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added a `<Treemap>` chart, subdividing the plot area into nested rectangles from a flat dataset - `categories` is an ordered list of fields, outermost group first, with each leaf cell's area proportional to `value`. It shares the same `buildHierarchy` data model as `<StackedDonut>` (including the new `buildHierarchy` override prop, and the `W009` negative-value warning), applying `d3.treemap()` instead of the angular partition layout.

`<Treemap>` is a self-contained chart: unlike `<Bar>`/`<Line>` (which need an `<XYChart>` wrapper) or `<Pie>`/`<Radar>` (which need a `<RadialChart>` wrapper), it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `zoomable` to let a click on a cell zoom in and refocus on that cell's immediate parent group, and `breadcrumb` to also show the current zoom path as a clickable trail - the same shared zoom feature available on `<Dendrogram>`/`<RadialDendrogram>`/`<CirclePacking>`.
