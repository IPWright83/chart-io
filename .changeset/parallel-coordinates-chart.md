---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<ParallelCoordinates>`, showing one line per row of `data`, connecting a point for each field in `dimensions` across a set of independently-scaled vertical axes, one per dimension. Unlike an XY chart (fixed at two axes), it supports any number of dimensions, the same way each spoke of a `<Radar>` is scaled to its own field's domain.

`<ParallelCoordinates>` is a self-contained chart - like `<Chord>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. It composes a `<ParallelCoordinatesPlot>` (the lines) with a new `<ParallelAxis>` per dimension (ticks, labels and brushes) as separate chart-level children, the same way `<XYChart>` composes a plot with its own `<XAxis>`/`<YAxis>`. Like other plots, it supports rendering to Canvas via `useCanvas`, with rendering automatically batched into progressive passes for large datasets; `<ParallelAxis>` is always rendered as SVG regardless, since brushing needs real, draggable DOM elements.

Each axis can be dragged (`d3.brushY`) to filter rows by their value on that dimension. Brushing is backed by a new generic, reusable Redux mechanism - `chartActions.setFilter({ field, value })`/`chartSelectors.filters` - rather than being wired up bespoke to this one chart; selections on multiple axes combine, and `onBrush` reports the currently selected rows. Set `color` to color rows categorically instead of every row sharing one color, `brushable={false}` to disable brushing entirely, and `tooltip={true}` to opt into a hover tooltip (off by default, since a tooltip following every hover across potentially hundreds of crossing lines can be more noise than signal).
