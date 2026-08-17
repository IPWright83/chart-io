---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Chord>`, showing the flow between nodes built from `source`/`target` as ribbons connecting arcs arranged around a circle. Each row of `data` is one flow, from the node named in `source` to the node named in `target`, sized by `value`; each node's arc is sized proportionally to its total flow (incoming and outgoing combined), and each ribbon takes the color of its source node.

`<Chord>` is a self-contained chart - like `<CirclePacking>`, `<Treemap>` and `<Dendrogram>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Like other plots, it supports rendering to Canvas via `useCanvas`. The group ring's outer radius is derived automatically from the available plot radius (shrinking to leave room for labels), so only a `thickness` prop is needed rather than a separate inner/outer radius. `showInLegend` defaults to `false`, since every node's arc is already labelled directly on the diagram.
