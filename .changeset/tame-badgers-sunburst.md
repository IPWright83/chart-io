---
"@chart-io/react": minor
---

Generalize `<StackedDonut>` to support an arbitrary number of hierarchy levels via a `categories: string[]` prop (replacing the previous fixed 2-level `category`/`subCategory` props), producing an N-ring sunburst. `<RadialChart>` also gains a `centerValue` prop that displays the hovered slice's name/value in the center of the chart's hole instead of a floating Tooltip.
