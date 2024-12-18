import type { Selector } from "@reduxjs/toolkit";
import { getContext } from "svelte";
import { derived, type Readable } from "svelte/store";

import { STORE_KEY } from "./constants.ts";

/**
 * Returns a store whose value is the selected value from the contextual Redux store.
 *
 * @param selector      Function for retrieving a value from the store
 * @param equalityFn    Function that determines if the selector value has changed, ensuring the store is only updated when the value has changed
 * @example
 * ```
 * const thisTodo = useSelector((store) => store.todos[todoId]);
 * ...
 * <p>{$thisTodo.name}</p>
 * ```
 */
export function useSelector<T, S>(
    selector: Selector<T, S>,
    equalityFn?: (lhs: S, rhs: S) => boolean
): Readable<S> {
    if (!equalityFn) {
        equalityFn = (lhs: S, rhs: S) => lhs === rhs;
    }

    const store: Readable<T> = getContext(STORE_KEY);
    let lastSelectorValue: S;
    console.log({ store, state: store.getState() });

    return derived(store, ($state: T, set) => {
        console.log("state", $state);
        const selectorValue: S = selector($state);

        if (!equalityFn!(selectorValue, lastSelectorValue)) {
            lastSelectorValue = selectorValue;
            set(lastSelectorValue);
        }
    })

}
