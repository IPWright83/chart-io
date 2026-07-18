# @chart-io/core

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
