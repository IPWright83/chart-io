---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Dendrogram>` and `<RadialDendrogram>`, drawing a tree of nodes (built from `categories`) connected by links - `<Dendrogram>` laid out left-to-right with every leaf aligned at the same depth, `<RadialDendrogram>` its polar equivalent, radiating outward from the center with every leaf aligned at the same radius. Both are self-contained charts - like `<Treemap>`, they accept chart-level props like `data`/`width`/`height` directly, since they only ever have a single plot.

Introduces the shared zoom feature used by `<Treemap>`, `<Dendrogram>`, `<RadialDendrogram>` and `<CirclePacking>`: set `zoomable` to let a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail letting you jump back to any ancestor level.

Canvas support added a new `renderLink`/`renderLinkRadial` core primitives, replaying a link's geometry through `d3.linkHorizontal()`/`d3.linkRadial()` the same way `renderArc` already does for `d3.arc()`.
