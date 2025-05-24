import type { Selector } from "@reduxjs/toolkit";
import { getContext } from "svelte";
import { derived, readable, type Readable } from "svelte/store";
import type { IStore } from "@chart-io/core";

import { STORE_KEY } from "./constants.ts";

/**
 * Returns a Svelte store whose value is derived from the Redux store
 * @param selector Function for retrieving a value from the store
 * @param equalityFn Optional function to determine if the value has changed
 * @example
 * ```
 * const value = useSelector((store) => store.value);
 * // Use with $ prefix in template
 * <div>{$value}</div>
 * ```
 */
export function useSelector<T, S>(
    selector: Selector<T, S>,
    equalityFn?: (lhs: S, rhs: S) => boolean
): Readable<S> {
    if (!equalityFn) {
        equalityFn = (lhs: S, rhs: S) => lhs === rhs;
    }

    const store = getContext<IStore>(STORE_KEY);
    if (!store) {
        throw new Error("No Redux store found in context. Did you forget to wrap your component with StoreProvider?");
    }

    // Create a Svelte readable store from the Redux store
    const reduxStore = readable(store.getState(), (set) => {
        return store.subscribe(() => {
            set(store.getState());
        });
    });

    // Use derived to only update when selected value changes
    let lastValue: S;
    return derived(reduxStore, ($state, set) => {
        const nextValue = selector($state);
        if (!lastValue || !equalityFn(nextValue, lastValue)) {
            lastValue = nextValue;
            set(nextValue);
        }
    }, selector(store.getState())); // Initialize with current value
}
