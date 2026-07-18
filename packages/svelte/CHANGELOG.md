# @chart-io/svelte

## 0.1.0

### Minor Changes

- c21d0371: Moving some helper functions, adding Svelte package

### Patch Changes

- cc56bcb5: Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
