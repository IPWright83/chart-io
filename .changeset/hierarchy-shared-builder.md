---
"@chart-io/core": minor
"@chart-io/react": patch
---

Moved the hierarchy-building logic behind `<StackedDonut>` into `@chart-io/core` as a shared `buildHierarchy` utility, decoupled from any particular layout. It now only groups, sums and (optionally) sorts a flat dataset into a `d3.hierarchy`, leaving each chart to apply its own layout on top (`<StackedDonut>` applies `d3.partition()` itself) - this is the first step towards sharing the same hierarchical data model across upcoming chart types (a treemap, dendrogram and radial dendrogram).

Negative values in the hierarchy's `value` field are now treated as `0` (they aren't representable by any of these layouts) and log a new `W009` warning, rather than silently producing an incorrect or degenerate layout as before.
