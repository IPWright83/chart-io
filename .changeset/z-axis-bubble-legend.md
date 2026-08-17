---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<ZAxis>`, which builds the size (`z`) scale a `<Scatter z>`/`<Scatters z>` bubble series sizes its circles from, and registers a size legend explaining it - a nested-circle diagram drawn at the bottom of the chart's `<Legend>`, in the style of a New York Times bubble-size legend. `<ZAxis>` sets up the same scale `<Scatter z>`/`<Scatters z>` read their radius from (like `<XAxis>`/`<YAxis>` do for `x`/`y`), so the legend's circles are always drawn at the same size as the series' points they describe.

The Legend can now be dragged to reposition it. Rather than being freeform, it docks to whichever of 8 compass positions around the edge of the chart (`"N"`, `"NE"`, `"E"`, `"SE"`, `"S"`, `"SW"`, `"W"`, `"NW"`) it's dropped nearest to. `<LegendOverlay>`'s `horizontalPosition`/`verticalPosition` props are replaced by a single `position` prop taking one of these compass values, defaulting to `"E"` (the same effective default as before).
