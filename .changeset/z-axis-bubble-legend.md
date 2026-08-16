---
"@chart-io/react": minor
---

Added `<ZAxis>`, a legend for the size (`z`) encoding of a `<Scatter z>`/`<Scatters z>` bubble chart. It draws a set of circles nested inside one another sharing a baseline, each labelled with the value it represents via a leader line - in the style of a New York Times bubble-size legend. `<ZAxis>` sets up the same scale `<Scatter z>`/`<Scatters z>` read their radius from (like `<XAxis>`/`<YAxis>` do for `x`/`y`), so the legend's circles are always drawn at the same size as the series' points they describe. `horizontalPosition`/`verticalPosition` anchor it to a corner of the plot, and `ticks`/`tickValues`/`tickFormat` control which values get a circle and how they're labelled.
