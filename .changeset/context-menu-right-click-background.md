---
"@chart-io/core": minor
"@chart-io/react": patch
---

Fixed `<ContextMenuOverlay>` opening on every click anywhere in the chart, including on top of plot marks and other interactive elements - it now only opens on a right-click of the chart's actual background (the bare `<svg>`, or the invisible hit-target rect `<XYChart>`/`<RadialChart>` render behind everything else), suppressing the browser's native context menu for just that click. A right-click elsewhere (a bar, a line, an axis brush, ...) is left alone.

Added a "Reset filters" action (`createResetFiltersAction`, with a new `contextMenuIcons.resetFilters` icon) that clears every filter set via `chartActions.setFilter` - shown disabled while nothing is filtered.
