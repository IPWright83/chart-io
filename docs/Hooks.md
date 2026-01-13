# Hooks [internal]

This library has a few custom [React hooks](https://reactjs.org/docs/hooks-intro.html) that are used for convenience. They are documented here to aid understanding of the codebase, however understanding these is not required to simply use the package.

## `useRender` Hook

This hook is designed to delay the rendering of a layer triggered by multiple small store updates. It is common for several things in the store to change at once (such as some data, and therefore the scale associated with the data) however this can trigger a layer to render multiple times unncessairly.

> **Developer Note:** This may be redundant in a newer version of React due to how they are handling batching of state updates

This hook therefore delays the render until the main thread is avaliable by using a `setTimeout` with no actual delay on it.
