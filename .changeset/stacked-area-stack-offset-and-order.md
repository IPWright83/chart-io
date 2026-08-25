---
"@chart-io/react": minor
---

`<StackedArea>` and `<Areas stacked>` now accept `offset` and `order` props to control how the stack's layers are positioned - e.g. `offset="wiggle"` produces a Stream Graph. Previously the stack was always built with a fixed zero baseline (`d3`'s default `stackOffsetNone`/`stackOrderNone`), so a real Stream Graph couldn't be built at all.

This also fixes the Storybook "Stream Graph" example under `<Area>`, which didn't actually render a streamgraph - it rendered a plain `<Area>` with a `y2` band (now correctly relabelled "Range Area"). The real Stream Graph example now lives under `<Areas>`, built with the new `offset="wiggle"` prop.
