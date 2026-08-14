# @chart-io/react-d3

## 0.63.0

### Minor Changes

- 17303933: Added `<Dendrogram>`, drawing a tree of nodes (built from `categories`) connected by links, laid out left-to-right with every leaf aligned at the same depth. It's a self-contained chart - like `<Treemap>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `radial` to lay the same tree out radiating outward from the center instead, with every leaf aligned at the same radius.

  Introduces the shared zoom feature used by `<Treemap>`, `<Dendrogram>` and `<CirclePacking>`: set `zoomable` to let a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail letting you jump back to any ancestor level. `<StackedDonut>` also gained `zoomable` support, showing the breadcrumb via its wrapping `<RadialChart>`'s existing `breadcrumb` prop.

  Canvas support added a new `renderLink`/`renderLinkRadial` core primitives, replaying a link's geometry through `d3.linkHorizontal()`/`d3.linkRadial()` the same way `renderArc` already does for `d3.arc()`, and a `renderText` primitive so node labels render in Canvas mode too.

  `showInLegend` now defaults to `false` on `<Dendrogram>`, since node labels already identify each value. Node labels can be toggled off entirely with `labels={false}` for dense hierarchies, and styled independently of the general `font`/`axis` theme settings via a new `theme.label` section (`color`, `fontSize`, `fontFamily`). Pass a `[min, max]` tuple to `nodeRadius` instead of a fixed number to size each node's circle by its own value, proportional by area.

### Patch Changes

- Updated dependencies [17303933]
  - @chart-io/core@0.10.0

## 0.62.1

### Patch Changes

- 2d98366d: Fixed Canvas-rendered charts (e.g. `<Pie useCanvas>`, `<Donut useCanvas>`, `<Column useCanvas>`) not showing tooltips once the page had been scrolled after the chart mounted. The virtual canvas's hit-testing cached the canvas's bounding rect once on mount and never recomputed it, so scrolling (or any reflow that moved the chart) made every subsequent hover/click sample the wrong pixel and silently find no datum.
- Updated dependencies [2d98366d]
  - @chart-io/core@0.9.1

## 0.62.0

### Minor Changes

- 32a76912: Added a `<Treemap>` chart, subdividing the plot area into nested rectangles from a flat dataset - `categories` is an ordered list of fields, outermost group first, with each leaf cell's area proportional to `value`. It shares the same `buildHierarchy` data model as `<StackedDonut>` (including the new `buildHierarchy` override prop, and the `W009` negative-value warning), applying `d3.treemap()` instead of the angular partition layout.

  `<Treemap>` is a self-contained chart: unlike `<Bar>`/`<Line>` (which need an `<XYChart>` wrapper) or `<Pie>`/`<Radar>` (which need a `<RadialChart>` wrapper), it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `zoomable` to let a click on a cell zoom in and refocus on that cell's immediate parent group, and `breadcrumb` to also show the current zoom path as a clickable trail - the same shared zoom feature available on `<Dendrogram>`/`<RadialDendrogram>`/`<CirclePacking>`.

### Patch Changes

- 32a76912: Fixed a bug where a deeper hierarchy node's brightened color could wash out to solid white and disappear against the page background - most visible on `<Treemap>`, where a washed-out cell reads as a blank gap rather than just a pale color. Extracted the color derivation `<StackedDonut>` and `<Treemap>` both use into a shared `colorHierarchyNode` utility in `@chart-io/core`, and capped how light a brightened color can get so it can never reach white, however many siblings a node has. Also fixed the same issue in the opposite direction against a dark theme: `colorHierarchyNode` now darkens (rather than brightens) deeper nodes when the theme's background is dark, capped so a color can never wash out to solid black either.
- Updated dependencies [32a76912]
- Updated dependencies [32a76912]
  - @chart-io/core@0.9.0

## 0.61.2

### Patch Changes

- 79759e37: Fixed `<RadialArea>` and `<RadialAreas>` not being exported from the package - they were built and documented in Storybook, but missing from the barrel exports, so `import { RadialArea } from "@chart-io/react"` resolved to `undefined`.

## 0.61.1

### Patch Changes

- 5b2c44b1: Moved the hierarchy-building logic behind `<StackedDonut>` into `@chart-io/core` as a shared `buildHierarchy` utility, decoupled from any particular layout. It now only groups, sums and (optionally) sorts a flat dataset into a `d3.hierarchy`, leaving each chart to apply its own layout on top (`<StackedDonut>` applies `d3.partition()` itself) - this is the first step towards sharing the same hierarchical data model across upcoming chart types (a treemap, dendrogram and radial dendrogram).

  Negative values in the hierarchy's `value` field are now treated as `0` (they aren't representable by any of these layouts) and log a new `W009` warning, rather than silently producing an incorrect or degenerate layout as before.

- Updated dependencies [5b2c44b1]
  - @chart-io/core@0.8.0

## 0.61.0

### Minor Changes

- 12dd70e7: Make the labeller chart-level rather than Radar-specific: `<Chart labeller>` (and so `<RadialChart>`/`<XYChart>`) now dispatches it into the redux store, mirroring how `theme` already works, so it's available to any plot type via the new `chartSelectors.labeller`. `<Radar>`'s own `labeller` prop now overrides the chart-level one for just that series rather than being the only way to set it.

  `<Radar>`'s `category` prop is now optional, defaulting to `"category"` - it only needs to be set explicitly when a chart has more than one independent Radar.

- 12dd70e7: Add a `<RadialArea>` chart - a filled area from the center outward, following a continuous angular domain (e.g. a full year of dates) around the circle. This is the polar equivalent of `<Area>`, and the shape behind [Observable's radial area chart example](https://observablehq.com/@d3/radial-area-chart/2). `<RadialAreas>` renders one series per field for multi-series comparisons.

  `<AngleAxis>` now supports continuous (`"time"`/`"linear"`) scale types in addition to categorical ones, drawing an evenly-spaced set of ticks rather than one spoke per raw data point. `<RadialAxis>` now shows real tick values (rather than always a normalized percentage) when it resolves to a single scale - one field, or multiple fields sharing an explicit `domain` - falling back to the normalized view only when fields are independently scaled (as `<Radar>` needs).

  `<RadialChart>` now includes an `<EventReceiver>` and `<Markers>` overlay (matching `<XYChart>`), so radial plots can support hover interactions driven by the global mouse position, not just per-element hover.

- 12dd70e7: Add a `<Radar>` chart, the polar equivalent of `<Lines>`: one closed polygon per series (one row of `data` per series), connecting a point for every field in `ys` around a shared angular scale, with a marker at each vertex for hover/click tooltips. Each series can be rendered `filled` (default) or as a stroke-only outline, which is useful when overlaying many series to compare trends without the fills obscuring one another.

  New `<AngleAxis>` and `<RadialAxis>` components (and matching `AngleScale`/`RadiusScale`) provide the spokes/category labels and normalized concentric rings that `<Radar>` needs, following the same `<XAxis>`/`<YAxis>` pattern used by `<Line>`. Unlike a shared linear axis, each field in `<RadialAxis>` gets its own independently computed domain, so one spoke can represent, say, a 1-5 rating while another represents a percentage or a raw count - the rings are always normalized (0-100%) so the differing domains stay comparable.

  `@chart-io/core` gains a generic `renderPolygon` canvas primitive so Radar series support Canvas rendering and hit-testing like other plots, and a new `createLabeller` utility that maps a field key (e.g. `"avg_score"`) to a display label (e.g. `"Mean Score"`) for use in tooltips, legends, and axis ticks - a first step towards future translation/formatting support.

- 12dd70e7: Increase `<AngleAxis>`'s default `tickPadding` from 8 to 20, so a category's spoke label no longer sits almost on top of the sibling `<RadialAxis>`'s outermost ring label at the top of the chart.

  Add `filled`/`fillOpacity` to `<RadialArea>`/`<RadialAreas>` (matching `<Radar>`'s existing props): a filled series completely covers a smaller series behind it wherever its own values are greater, regardless of z-order or opacity, so `filled={false}` gives a reliable way to keep every series visible when comparing overlapping series.

  Also fixed a couple of `<Radar>` Storybook play functions that clicked at stale, imprecise coordinates that landed just off their target marker.

### Patch Changes

- 12dd70e7: Add `chartSelectors.dimensions.plot.cx`/`cy`/`maxRadius` (`@chart-io/core`) and use them to de-duplicate the center-point/radius calculation that was repeated across `RadiusScale`, `AngleAxis`, `RadialAxis`, `withRadialPlot` and `CenterValueOverlay`. Also corrects the `aggregate` documentation on `RadiusScale`/`RadialAxis` (it computes a domain from the _sum_ of every field's value, the same as `<YAxis aggregate>` for a stacked chart - not a shared domain left unchanged, which is what an explicit `domain` override is for).
- Updated dependencies [12dd70e7]
- Updated dependencies [12dd70e7]
- Updated dependencies [12dd70e7]
- Updated dependencies [12dd70e7]
  - @chart-io/core@0.7.0

## 0.60.0

### Minor Changes

- 6e30fec9: Generalize `<StackedDonut>` to support an arbitrary number of hierarchy levels via a `categories: string[]` prop (replacing the previous fixed 2-level `category`/`subCategory` props), producing an N-ring sunburst. `<RadialChart>` also gains a `centerValue` prop that displays the hovered slice's name/value in the center of the chart's hole instead of a floating Tooltip.

## 0.59.0

### Minor Changes

- 23d55506: Add Pie, Donut and StackedDonut charts. Introduces a `<PieChart>` wrapper (the polar equivalent of `<XYChart>`) composed with `<Pie>`, `<Donut>`, and `<StackedDonut>` plot components, following the same layering, HOC, and SVG/Canvas dual-rendering conventions as the existing XY plots. `@chart-io/core` gains a generic `renderArc` canvas primitive so Pie/Donut slices support Canvas rendering and hit-testing like other plots.

### Patch Changes

- Updated dependencies [23d55506]
  - @chart-io/core@0.6.0

## 0.58.0

### Minor Changes

- cc56bcb5: Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
- c21d0371: Moving some helper functions, adding Svelte package

### Patch Changes

- Updated dependencies [cc56bcb5]
- Updated dependencies [c21d0371]
  - @chart-io/core@0.5.0

## 0.57.0

### Minor Changes

- 7616e14: Make @chart-io/core a full dependency

## 0.56.0

### Minor Changes

- 91e1f56: Removes sub-packages @chart-io/types @chart-io/d3 @chart-io/detection

## 0.55.1

### Patch Changes

- b4f0f73: Fix theme on export

## 0.55.0

### Minor Changes

- 9596f08: Fix current node for snapshots

## 0.54.0

### Minor Changes

- 23ea031: Fix export

## 0.53.0

### Minor Changes

- 90bed02: Add types

## 0.52.0

### Minor Changes

- 8278c18: Publish types

## 0.51.0

### Minor Changes

- 3b353ff: Update dependencies to latest

## 0.50.0

### Minor Changes

- 6d83895: Update react-redux peer version

## 0.49.0

### Minor Changes

- 3cac3a9: Update peer dependency versions

## 0.48.0

### Minor Changes

- 1415a40: Adopt Redux toolkit over Redux

## 0.47.0

### Minor Changes

- 431d9a9: Updated layer ordering so crosshairs sit further back

## 0.46.0

### Minor Changes

- 13dd7aa: Added a new core package for main rendering logic

## 0.45.0

### Minor Changes

- a031b89: Allow showing nearest item on Area & Line plots

## 0.44.0

### Minor Changes

- 6eba8e0: Upgraded Storybook

## 0.43.0

### Minor Changes

- 833ab59: Added a JsonChart

## 0.42.0

### Minor Changes

- d9091cf: Allow easier Tooltip customizations

## 0.41.0

### Minor Changes

- cc0ea9a: Support exporting charts to images

## 0.40.0

### Minor Changes

- e48034a: Fixes an issue where Bar/Column canvas plots can overlap the axis domain

## 0.39.0

### Minor Changes

- 9203370: Fixed some bugs

## 0.38.0

### Minor Changes

- 2052317: Fix several small bugs

  - Tooltip items now allign correctly
  - Legend items no longer re-order
  - Markers no longer display an incorrect colour when switching types quickly

  This also improves some storybook examples around mixed plots

## 0.37.0

### Minor Changes

- 7f38cb8: Docs update

## 0.36.0

### Minor Changes

- a63a4c8: CI Attemp 2

## 0.35.0

### Minor Changes

- 2c3e88d: CI testing

## 0.34.0

### Minor Changes

- c0e9b17: Debugging workflow
- 8eb4ab6: Docs update
- c667653: Testing auto-merge

## 0.33.0

### Minor Changes

- a878c2f: Updated name

## 0.32.0

### Minor Changes

- 351a30f: Fixes an issue when using the RectangleClipPath that prevents canvas plots working

## 0.31.0

### Minor Changes

- 1614f17: Fixes an issue when using the RectangleClipPath that prevents canvas plots working

## 0.30.0

### Minor Changes

- 03edbbc: Updated support for margins & brushes

## 0.29.0

### Minor Changes

- 0ecc65b: Better support for mixed plot types

## 0.28.0

### Minor Changes

- adedf46: Support for mixed plot types

## 0.27.0

### Minor Changes

- 491d050: Added ZoomBrush support

## 0.26.0

### Minor Changes

- 83b620c: Updates warnings & errors

## 0.25.0

### Minor Changes

- 7febde1: Fixing deploy

## 0.24.0

### Minor Changes

- f462652: Allow non-array inputs for Scale/Axis

## 0.23.0

### Minor Changes

- 245192e: Allow non-array inputs for Scale/Axis

## 0.22.0

### Minor Changes

- f8166d8: Added support for Legends

## 0.21.0

### Minor Changes

- 17c4895: Test

## 0.20.0

### Minor Changes

- 0862879: Test

## 0.19.0

### Minor Changes

- bb81e3a: Test

## 0.18.0

### Minor Changes

- 494a204: Test
- 5c9ca11: testing

## 0.17.0

### Minor Changes

- 744f129: Updated Chromatic settings

## 0.16.0

### Minor Changes

- feddec9: TypeScript support

### Patch Changes

- Updated dependencies [feddec9]
  - @chart-io/d3@0.2.0
  - @chart-io/detection@0.5.0
  - @chart-io/types@0.5.0

## 0.15.0

### Minor Changes

- b0d2e5e: - Exposed more options to Axis (tickValues)
  - Fixed pointer-events on Markers causing flicker
  - Introduced an `<AutoScale>` component, which is the old `<Scale>`
  - Introduced some new warnings for protection
  - Added the ability to format tooltip popup strings

## 0.14.0

### Minor Changes

- 3f81ca2: Pick stroke color from background for bars/columns
- 3f81ca2: Resolved issue with flickering tooltips due to incorrect pointer-events

## 0.13.0

### Minor Changes

- 175dd66: Pick stroke color from background for bars/columns
- 175dd66: Resolved issue with flickering tooltips due to incorrect pointer-events

## 0.12.0

### Minor Changes

- a6cc33a: Testing changesets

### Patch Changes

- Updated dependencies [a6cc33a]
  - @chart-io/detection@0.4.0

## 0.11.0

### Minor Changes

- aa0b805: Testing changesets

### Patch Changes

- Updated dependencies [aa0b805]
  - @chart-io/detection@0.3.0

## 0.10.0

### Minor Changes

- 29b2703: Fixing peer dependencies

## 0.9.0

### Minor Changes

- 3254c1e: Vite build

## 0.8.0

### Minor Changes

- bc7e7f3: Trying to fix publishing CI

### Patch Changes

- Updated dependencies [bc7e7f3]
  - @chart-io/detection@0.2.0

## 0.7.0

### Minor Changes

- 71eaab3: Tag Test 2

## 0.6.0

### Minor Changes

- 74010a0: This is a test

## 0.5.0

### Minor Changes

- 4d17cab: Added a Rect component
- 4d17cab: Allowed more marker styling

## 0.4.0

### Minor Changes

- 1c8f120: Fixes issues with linkStores in production builds

## 0.3.0

### Minor Changes

- ccedcd6: Updated Storybook docs

## 0.2.0

### Minor Changes

- 856ea4f: Improved selector performance by introducing reselect

## 0.1.33

### Patch Changes

- c2ccdd1: Test
- Updated dependencies [c2ccdd1]
  - @chart-io/detection@0.1.33
