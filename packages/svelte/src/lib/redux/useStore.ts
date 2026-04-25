import type { Store } from "@reduxjs/toolkit";
import { getContext } from "svelte";

import { STORE_KEY } from "./constants";

export function useStore<T>(): Store<T> {
    const store: Store<T> = getContext(STORE_KEY);
    return store;
}
