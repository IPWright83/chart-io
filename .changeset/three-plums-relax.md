---
"@chart-io/react": minor
---

Increase `<AngleAxis>`'s default `tickPadding` from 8 to 20, so a category's spoke label no longer sits almost on top of the sibling `<RadialAxis>`'s outermost ring label at the top of the chart.

Add `filled`/`fillOpacity` to `<RadialArea>`/`<RadialAreas>` (matching `<Radar>`'s existing props): a filled series completely covers a smaller series behind it wherever its own values are greater, regardless of z-order or opacity, so `filled={false}` gives a reliable way to keep every series visible when comparing overlapping series.

Also fixed a couple of `<Radar>` Storybook play functions that clicked at stale, imprecise coordinates that landed just off their target marker.
