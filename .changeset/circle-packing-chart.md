---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<CirclePacking>`, nesting a circle per node of the hierarchy built from `categories` inside its parent's circle, each sized proportionally to `value`. Unlike `<Treemap>`, every node at every level is drawn, not just leaves. Only leaves are labelled - siblings never overlap in a packed layout, but a dominant child is packed concentrically with its parent, so labelling every level would stack group and leaf labels on the same point; group names remain available via the tooltip and the breadcrumb trail.

`<CirclePacking>` is a self-contained chart - like `<Treemap>`, `<Dendrogram>` and `<RadialDendrogram>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `zoomable` to let a click on a non-leaf node zoom in and refocus the layout on just its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail.
