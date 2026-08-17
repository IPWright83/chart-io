---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Sankey>`, laying out a flow diagram from a flat dataset: `categories` is an ordered list of fields, first column first, and each row flows left-to-right through them, contributing `value` to the link between every consecutive pair of columns. Flows between the same pair of node values are summed together into a single, wider band rather than drawn as separate parallel flows.

`<Sankey>` is a self-contained chart - like `<Treemap>`, `<CirclePacking>`, `<Dendrogram>` and `<WordCloud>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. The underlying graph builder is exported from `@chart-io/core` as `buildSankeyGraph` - override it (as `<Sankey buildSankeyGraph={...}>`) if your data doesn't already fit that flat, group-by-`categories` shape.

A first-column node takes its color from the palette; every other node - which, unlike a hierarchy, can be fed by several incoming flows - takes the color of whichever incoming flow contributes the most value to it, tracing back to a first-column node. Each flow is drawn in its source node's color.

Also fixed a Canvas rendering bug affecting `<Dendrogram>` and now `<Sankey>`, the two plots with semi-transparent links: the Canvas primitive read a link's opacity from the wrong CSS property, so a link's `strokeOpacity` was respected in SVG but rendered fully opaque on Canvas.
