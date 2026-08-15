---
"@chart-io/core": minor
"@chart-io/react": patch
---

Added a `d3.one()` utility to `@chart-io/core` for selecting/creating (or removing) at most a single child element under a selection, joined the same way as any other D3 data-bound selection - see https://github.com/d3/d3-selection/pull/300. Used it to simplify `<StackedDonut>`'s center-hole hit target (previously hand-rolled enter/exit/merge boilerplate) into a single call.
