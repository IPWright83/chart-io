---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Chord>`, showing the flow between nodes built from `source`/`target` as ribbons connecting arcs arranged around a circle. Each row of `data` is one flow, from the node named in `source` to the node named in `target`, sized by `value`; each node's arc is sized proportionally to its total flow (incoming and outgoing combined), and each ribbon takes the color of its source node.

`<Chord>` is a self-contained chart - like `<CirclePacking>`, `<Treemap>` and `<Dendrogram>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Like other plots, it supports rendering to Canvas via `useCanvas`.
