---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<CirclePacking>`, nesting a circle per node of the hierarchy built from `categories` inside its parent's circle, each sized proportionally to `value`. Unlike `<Treemap>`, every node at every level is drawn, not just leaves. Only leaves are labelled - siblings never overlap in a packed layout, but a dominant child is packed concentrically with its parent, so labelling every level would stack group and leaf labels on the same point; group names remain available via the tooltip and the breadcrumb trail. Use it within a `<RectangularChart>`, alongside `<Treemap>`, `<Dendrogram>` and `<RadialDendrogram>`.

Like `<Treemap>`, `<Dendrogram>` and `<RadialDendrogram>`, `<CirclePacking>` supports the `zoomable`/`breadcrumb` props on its enclosing chart, letting a click on a non-leaf node zoom in and refocus the layout on just its subtree.
