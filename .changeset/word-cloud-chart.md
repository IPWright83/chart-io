---
"@chart-io/core": minor
"@chart-io/react": minor
---

Added `<WordCloud>`, sizing each word in a flat dataset's `category` field proportionally to `value` and packing the words - largest first, working outward from the center along an Archimedean spiral - into the available space without overlapping. Set `rotate` to alternate every other placed word between horizontal and vertical, for the more traditional word cloud look.

`<WordCloud>` is a self-contained chart - like `<Treemap>`, `<CirclePacking>`, `<Dendrogram>` and `<RadialDendrogram>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. The underlying layout is exported from `@chart-io/core` as `computeWordCloudLayout`, which measures words via a `<canvas>`-based `measureText` by default - override it (as `<WordCloud measureText={...}>`) if `<canvas>` isn't available in your environment.

Words whose bounding box can't be placed anywhere without overlapping another word are dropped from the layout and a new `W010` warning is logged.
