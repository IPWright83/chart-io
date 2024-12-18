import type { StoreCreator } from "@reduxjs/toolkit";

export function svelteStoreEnhancer(
    createStoreApi: StoreCreator,
) {
    return function (reducer: any, initialState: any) {
        const reduxStore = createStoreApi(reducer, initialState);
        return {
            ...reduxStore,
            subscribe(fn: ((value: any) => void)) {
                fn(reduxStore.getState());
                return reduxStore.subscribe(() => {
                    fn(reduxStore.getState());
                });
            }
        }
    }
}
