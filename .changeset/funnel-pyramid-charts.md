---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<Funnel>` and `<Pyramid>`, stacking one trapezoid segment per row of data - built from `category`/`value` - each segment's width proportional to its value. `<Funnel>` narrows from the widest segment at the top down to the narrowest at the bottom (e.g. a sales/conversion funnel); `<Pyramid>` is a `<Funnel>` turned upside down, with the widest segment forming the flat base at the bottom instead. Every segment's shared edge tapers smoothly into the next, so the last segment stays a flat-bottomed (or, for `<Pyramid>`, flat-topped) rectangle. As with `<Treemap>`/`<StackedDonut>`, negative values aren't representable by a segment's width, so they're treated as `0` and a `W009` warning is logged.

Both are self-contained charts - like `<Treemap>`, `<CirclePacking>`, `<Dendrogram>` and `<RadialDendrogram>`, they accept chart-level props like `data`/`width`/`height` directly, since each only ever has a single plot. Set `sort` to order segments by value (descending) instead of the order of the data.

Also extracted the `W009` negative-value check `buildHierarchy` already used into a standalone `ensureNoNegativeValues` export from `@chart-io/core`, alongside the existing `ensureValuesAreUnique`/`ensureCombinationsAreUnique`/etc. checks, so `<Funnel>`/`<Pyramid>` can reuse the same warning instead of silently clamping.
