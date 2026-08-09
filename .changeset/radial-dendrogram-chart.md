---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<RadialDendrogram>`, the polar equivalent of `<Dendrogram>` - the same tree of nodes and links, radiating outward from the center instead of growing left-to-right, with every leaf aligned at the same radius. Use it within a `<RadialChart>`, alongside `<Pie>`, `<Donut>`, `<StackedDonut>`, `<Radar>` and `<RadialArea>`.

Canvas support added a new `renderLinkRadial` core primitive, replaying a link's polar geometry through `d3.linkRadial().context(...)` the same way `renderArc` already does for `d3.arc()`.
