---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Dendrogram>`, drawing a tree of nodes (built from `categories`) connected by links, laid out left-to-right with every leaf aligned at the same depth. It's a self-contained chart - like `<Treemap>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `radial` to lay the same tree out radiating outward from the center instead, with every leaf aligned at the same radius.

Introduces the shared zoom feature used by `<Treemap>`, `<Dendrogram>` and `<CirclePacking>`: set `zoomable` to let a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail letting you jump back to any ancestor level. `<StackedDonut>` also gained `zoomable` support, showing the breadcrumb via its wrapping `<RadialChart>`'s existing `breadcrumb` prop.

Canvas support added a new `renderLink`/`renderLinkRadial` core primitives, replaying a link's geometry through `d3.linkHorizontal()`/`d3.linkRadial()` the same way `renderArc` already does for `d3.arc()`, and a `renderText` primitive so node labels render in Canvas mode too.

`showInLegend` now defaults to `false` on `<Dendrogram>`, since node labels already identify each value. Node labels can be toggled off entirely with `labels={false}` for dense hierarchies, and styled independently of the general `font`/`axis` theme settings via a new `theme.label` section (`color`, `fontSize`, `fontFamily`). Pass a `[min, max]` tuple to `nodeRadius` instead of a fixed number to size each node's circle by its own value, proportional by area.
