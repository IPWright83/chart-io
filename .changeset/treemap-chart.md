---
"@chart-io/react": minor
---

Added a `<Treemap>` chart, subdividing the plot area into nested rectangles from a flat dataset - `categories` is an ordered list of fields, outermost group first, with each leaf cell's area proportional to `value`. It shares the same `buildHierarchy` data model as `<StackedDonut>` (including the new `buildHierarchy` override prop, and the `W009` negative-value warning), applying `d3.treemap()` instead of the angular partition layout.

Since `<Treemap>` lays itself out within the full plot area rather than against x/y scales, it should be used within a new `<RectangularChart>` container rather than `<XYChart>`/`<RadialChart>`.
