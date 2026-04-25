import type { StoreCreator, Reducer, Action } from "@reduxjs/toolkit";

export function svelteStoreEnhancer(createStoreApi: StoreCreator) {
    return function (reducer: Reducer<unknown, Action>, initialState: unknown) {
        const reduxStore = createStoreApi(reducer, initialState as never);
        return {
            ...reduxStore,
            subscribe(fn: (value: unknown) => void) {
                fn(reduxStore.getState());
                return reduxStore.subscribe(() => {
                    fn(reduxStore.getState());
                });
            },
        };
    };
}
