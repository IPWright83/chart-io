---
"@chart-io/core": minor
"@chart-io/react": minor
"@chart-io/svelte": patch
---

Move chart plot rendering out of @chart-io/core and into the React components/hooks that use it, removing the renderers abstraction. Also fixes a broken Svelte package build caused by barrel exports pointing at components that don't exist yet.
