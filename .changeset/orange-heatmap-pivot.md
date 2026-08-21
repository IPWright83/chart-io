---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Heatmap>`, a grid of cells - one per `rows`/`columns` combination in the data - colored by `value` along a sequential (or diverging) scale. It's a self-contained chart, but unlike `<Treemap>`/`<Sankey>`/`<Chord>` it composes `<XYChart>` plus real `<XAxis>`/`<YAxis>` internally, since it always needs both a row and a column axis.

Set `pivotable` to let the user switch, via the `<PivotControl>` this renders, between the full grid and two stacked-bar-chart layouts sharing the same cells: `"rows"` collapses the column axis into a linear scale, stacking each row's cells into a single horizontal bar; `"columns"` does the same collapsing the row axis instead, stacking each column's cells into a vertical bar. Every cell is keyed by its row/column pair, so switching layouts transitions each one to its new position/size rather than re-creating it - this pivot state lives in the store, the same way `<Treemap zoomable>`'s zoom state does.

Pass an odd-length `colors` palette (3, 5, ...) - e.g. for a correlation matrix - and the color scale centers on 0 instead of the data's own midpoint, so equal-and-opposite values get equally saturated, opposite colors.

Also adds a generic `<PivotControl>` (mirroring `<ZoomBreadcrumb>`) and chart-level pivot state (`pivotable`/`pivot`, mirroring `zoomable`/`zoom`) to `@chart-io/core`.
