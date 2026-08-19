---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<ParallelCoordinates>`, showing one line per row of `data`, connecting a point for each field in `dimensions` across a set of independently-scaled vertical axes, one per dimension. Unlike an XY chart (fixed at two axes), it supports any number of dimensions, the same way each spoke of a `<Radar>` is scaled to its own field's domain.

`<ParallelCoordinates>` is a self-contained chart - like `<Chord>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Like other plots, it supports rendering to Canvas via `useCanvas`, with rendering automatically batched into progressive passes for large datasets; its axes (ticks, labels and brushes) are always rendered as SVG regardless, since brushing needs real, draggable DOM elements. Each axis can be dragged (`d3.brushY`) to filter rows by their value on that dimension - selections on multiple axes combine, and `onBrush` reports the currently selected rows. Set `color` to color rows categorically instead of every row sharing one color, and `brushable={false}` to disable brushing entirely.
