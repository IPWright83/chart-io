# @chart-io/core

## 0.12.0

### Minor Changes

- 8d22b1e7: Added `<CirclePacking>`, nesting a circle per node of the hierarchy built from `categories` inside its parent's circle, each sized proportionally to `value`. Unlike `<Treemap>`, every node at every level is drawn, not just leaves. Only leaves are labelled - siblings never overlap in a packed layout, but a dominant child is packed concentrically with its parent, so labelling every level would stack group and leaf labels on the same point; group names remain available via the tooltip and the breadcrumb trail.

  `<CirclePacking>` is a self-contained chart - like `<Treemap>`, `<Dendrogram>` and `<RadialDendrogram>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `zoomable` to let a click on a non-leaf node zoom in and refocus the layout on just its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail.

## 0.11.0

### Minor Changes

- d3688e1c: Added a `d3.one()` utility to `@chart-io/core` for selecting/creating (or removing) at most a single child element under a selection, joined the same way as any other D3 data-bound selection - see https://github.com/d3/d3-selection/pull/300. Used it to simplify `<StackedDonut>`'s center-hole hit target (previously hand-rolled enter/exit/merge boilerplate) into a single call.
- d3688e1c: `<StackedDonut>` is now zoomable by default (`zoomable` defaults to `true` instead of `false`). Clicking the donut's center hole now zooms back out one level - previously there was no way to zoom back out by clicking on the chart itself, in either SVG or Canvas mode. While zoomed in, the center hole also now displays the focused node's name whenever nothing's hovered, instead of showing nothing.

### Patch Changes

- d3688e1c: Fixed the hovered slice not being highlighted on Canvas-rendered `<Pie useCanvas>`, `<Donut useCanvas>` and `<StackedDonut useCanvas>` charts. Hovering updated the slice's opacity on its underlying (detached) DOM node as before, but nothing repainted the visible `<canvas>` bitmap to reflect it, so the highlight silently never appeared - unlike SVG, where the browser repaints the style change on its own.

## 0.10.1

### Patch Changes

- a4554574: Fixed `<AngleAxis>`/`<RadialAxis>` spokes, rings and labels animating in from the center (0,0) on a `<Radar>`/`<RadialArea>`'s very first render - they now appear directly at their final position, and only animate when moving between two real positions on a later update.

  Fixed `state.data = [...action.payload]` no longer aliasing the caller's own data array into the Redux store. Immer freezes anything reachable from the store's state, so a caller's own array (e.g. a Storybook story's shared `args.data`) previously became frozen as a side effect of being passed to a chart, breaking any other code (including Storybook's own args handling) that still expected to be able to write to it - most visibly as `Cannot assign to read only property '0' of object '[object Array]'` when switching between Radial chart stories that reused the same data.

## 0.10.0

### Minor Changes

- 17303933: Added `<Dendrogram>`, drawing a tree of nodes (built from `categories`) connected by links, laid out left-to-right with every leaf aligned at the same depth. It's a self-contained chart - like `<Treemap>`, it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `radial` to lay the same tree out radiating outward from the center instead, with every leaf aligned at the same radius.

  Introduces the shared zoom feature used by `<Treemap>`, `<Dendrogram>` and `<CirclePacking>`: set `zoomable` to let a click on a node zoom in and refocus the layout on its subtree, and `breadcrumb` to also show the current zoom path as a clickable trail letting you jump back to any ancestor level. `<StackedDonut>` also gained `zoomable` support, showing the breadcrumb via its wrapping `<RadialChart>`'s existing `breadcrumb` prop.

  Canvas support added a new `renderLink`/`renderLinkRadial` core primitives, replaying a link's geometry through `d3.linkHorizontal()`/`d3.linkRadial()` the same way `renderArc` already does for `d3.arc()`, and a `renderText` primitive so node labels render in Canvas mode too.

  `showInLegend` now defaults to `false` on `<Dendrogram>`, since node labels already identify each value. Node labels can be toggled off entirely with `labels={false}` for dense hierarchies, and styled independently of the general `font`/`axis` theme settings via a new `theme.label` section (`color`, `fontSize`, `fontFamily`). Pass a `[min, max]` tuple to `nodeRadius` instead of a fixed number to size each node's circle by its own value, proportional by area.

## 0.9.1

### Patch Changes

- 2d98366d: Fixed Canvas-rendered charts (e.g. `<Pie useCanvas>`, `<Donut useCanvas>`, `<Column useCanvas>`) not showing tooltips once the page had been scrolled after the chart mounted. The virtual canvas's hit-testing cached the canvas's bounding rect once on mount and never recomputed it, so scrolling (or any reflow that moved the chart) made every subsequent hover/click sample the wrong pixel and silently find no datum.

## 0.9.0

### Minor Changes

- 32a76912: Added a `<Treemap>` chart, subdividing the plot area into nested rectangles from a flat dataset - `categories` is an ordered list of fields, outermost group first, with each leaf cell's area proportional to `value`. It shares the same `buildHierarchy` data model as `<StackedDonut>` (including the new `buildHierarchy` override prop, and the `W009` negative-value warning), applying `d3.treemap()` instead of the angular partition layout.

  `<Treemap>` is a self-contained chart: unlike `<Bar>`/`<Line>` (which need an `<XYChart>` wrapper) or `<Pie>`/`<Radar>` (which need a `<RadialChart>` wrapper), it accepts chart-level props like `data`/`width`/`height` directly, since it only ever has a single plot. Set `zoomable` to let a click on a cell zoom in and refocus on that cell's immediate parent group, and `breadcrumb` to also show the current zoom path as a clickable trail - the same shared zoom feature available on `<Dendrogram>`/`<RadialDendrogram>`/`<CirclePacking>`.

### Patch Changes

- 32a76912: Fixed a bug where a deeper hierarchy node's brightened color could wash out to solid white and disappear against the page background - most visible on `<Treemap>`, where a washed-out cell reads as a blank gap rather than just a pale color. Extracted the color derivation `<StackedDonut>` and `<Treemap>` both use into a shared `colorHierarchyNode` utility in `@chart-io/core`, and capped how light a brightened color can get so it can never reach white, however many siblings a node has. Also fixed the same issue in the opposite direction against a dark theme: `colorHierarchyNode` now darkens (rather than brightens) deeper nodes when the theme's background is dark, capped so a color can never wash out to solid black either.

## 0.8.0

### Minor Changes

- 5b2c44b1: Moved the hierarchy-building logic behind `<StackedDonut>` into `@chart-io/core` as a shared `buildHierarchy` utility, decoupled from any particular layout. It now only groups, sums and (optionally) sorts a flat dataset into a `d3.hierarchy`, leaving each chart to apply its own layout on top (`<StackedDonut>` applies `d3.partition()` itself) - this is the first step towards sharing the same hierarchical data model across upcoming chart types (a treemap, dendrogram and radial dendrogram).

  Negative values in the hierarchy's `value` field are now treated as `0` (they aren't representable by any of these layouts) and log a new `W009` warning, rather than silently producing an incorrect or degenerate layout as before.

## 0.7.0

### Minor Changes

- 12dd70e7: Make the labeller chart-level rather than Radar-specific: `<Chart labeller>` (and so `<RadialChart>`/`<XYChart>`) now dispatches it into the redux store, mirroring how `theme` already works, so it's available to any plot type via the new `chartSelectors.labeller`. `<Radar>`'s own `labeller` prop now overrides the chart-level one for just that series rather than being the only way to set it.

  `<Radar>`'s `category` prop is now optional, defaulting to `"category"` - it only needs to be set explicitly when a chart has more than one independent Radar.

- 12dd70e7: Add a `<RadialArea>` chart - a filled area from the center outward, following a continuous angular domain (e.g. a full year of dates) around the circle. This is the polar equivalent of `<Area>`, and the shape behind [Observable's radial area chart example](https://observablehq.com/@d3/radial-area-chart/2). `<RadialAreas>` renders one series per field for multi-series comparisons.

  `<AngleAxis>` now supports continuous (`"time"`/`"linear"`) scale types in addition to categorical ones, drawing an evenly-spaced set of ticks rather than one spoke per raw data point. `<RadialAxis>` now shows real tick values (rather than always a normalized percentage) when it resolves to a single scale - one field, or multiple fields sharing an explicit `domain` - falling back to the normalized view only when fields are independently scaled (as `<Radar>` needs).

  `<RadialChart>` now includes an `<EventReceiver>` and `<Markers>` overlay (matching `<XYChart>`), so radial plots can support hover interactions driven by the global mouse position, not just per-element hover.

- 12dd70e7: Add a `<Radar>` chart, the polar equivalent of `<Lines>`: one closed polygon per series (one row of `data` per series), connecting a point for every field in `ys` around a shared angular scale, with a marker at each vertex for hover/click tooltips. Each series can be rendered `filled` (default) or as a stroke-only outline, which is useful when overlaying many series to compare trends without the fills obscuring one another.

  New `<AngleAxis>` and `<RadialAxis>` components (and matching `AngleScale`/`RadiusScale`) provide the spokes/category labels and normalized concentric rings that `<Radar>` needs, following the same `<XAxis>`/`<YAxis>` pattern used by `<Line>`. Unlike a shared linear axis, each field in `<RadialAxis>` gets its own independently computed domain, so one spoke can represent, say, a 1-5 rating while another represents a percentage or a raw count - the rings are always normalized (0-100%) so the differing domains stay comparable.

  `@chart-io/core` gains a generic `renderPolygon` canvas primitive so Radar series support Canvas rendering and hit-testing like other plots, and a new `createLabeller` utility that maps a field key (e.g. `"avg_score"`) to a display label (e.g. `"Mean Score"`) for use in tooltips, legends, and axis ticks - a first step towards future translation/formatting support.

- 12dd70e7: Add `chartSelectors.dimensions.plot.cx`/`cy`/`maxRadius` (`@chart-io/core`) and use them to de-duplicate the center-point/radius calculation that was repeated across `RadiusScale`, `AngleAxis`, `RadialAxis`, `withRadialPlot` and `CenterValueOverlay`. Also corrects the `aggregate` documentation on `RadiusScale`/`RadialAxis` (it computes a domain from the _sum_ of every field's value, the same as `<YAxis aggregate>` for a stacked chart - not a shared domain left unchanged, which is what an explicit `domain` override is for).

## 0.6.0

### Minor Changes

- 23d55506: Add Pie, Donut and StackedDonut charts. Introduces a `<PieChart>` wrapper (the polar equivalent of `<XYChart>`) composed with `<Pie>`, `<Donut>`, and `<StackedDonut>` plot components, following the same layering, HOC, and SVG/Canvas dual-rendering conventions as the existing XY plots. `@chart-io/core` gains a generic `renderArc` canvas primitive so Pie/Donut slices support Canvas rendering and hit-testing like other plots.

## 0.5.0

### Minor Changes

- cc56bcb5: Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
- c21d0371: Moving some helper functions, adding Svelte package

## 0.4.0

### Minor Changes

- 91e1f56: Removes sub-packages @chart-io/types @chart-io/d3 @chart-io/detection

## 0.3.0

### Minor Changes

- 1415a40: Adopt Redux toolkit over Redux

## 0.2.0

### Minor Changes

- 13dd7aa: Added a new core package for main rendering logic
