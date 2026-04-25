import { configureStore } from "@reduxjs/toolkit";
import { chartSlice, eventSlice } from "@chart-io/core";

import { svelteStoreEnhancer } from "./svelteStoreEnhancer";

export const createStore = () => {
    return configureStore({
        reducer: {
            [chartSlice.name]: chartSlice.reducer,
            [eventSlice.name]: eventSlice.reducer,
        },
        enhancers: (getDefaultEnhancers) => [svelteStoreEnhancer, ...getDefaultEnhancers()],
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }),
    });
};
