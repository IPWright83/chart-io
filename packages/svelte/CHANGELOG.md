# @chart-io/svelte

## 0.1.1

### Patch Changes

- 84d343a6: Fixed Axis titles (`<XAxis title="...">`, `<YAxis title="...">`) not picking up the chart's theme - the title text always rendered at a fixed 14px in the browser's default black fill, regardless of the active theme, so it could look inconsistent with the rest of the axis (which does use the theme) or hard to read against a dark background. The title now uses `theme.axis.stroke` for its fill and `theme.font.family`/`theme.font.size` for its typography, matching the tick labels.

## 0.1.0

### Minor Changes

- c21d0371: Moving some helper functions, adding Svelte package

### Patch Changes

- cc56bcb5: Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
