import type { Store } from "@reduxjs/toolkit";
import { getContext } from "svelte";

import { STORE_KEY } from "./constants.ts";

/**
 * Returns the Redux store that's avaliable in context.
 * Assumes a Redux store is avaliable in context via the `StoreProvider` component, or using
 * the `STORE_KEY` directly
 */
export function useStore<T>(): Store<T> {
    const store: Store<T> = getContext(STORE_KEY);
    return store;
}
