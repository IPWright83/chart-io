import { configureStore } from "@reduxjs/toolkit";

import { chartSlice } from "./chart";
import { eventSlice } from "./event";

/**
 * Creates a Redux store
 * @param customReducers       A set of additional custom reducers to apply to the store
 * @return                     The redux store object
 */
const createStore = (customReducers = {}) => {
    const store = configureStore({
        reducer: {
            [eventSlice.name]: eventSlice.reducer,
            [chartSlice.name]: chartSlice.reducer,
            ...customReducers,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            // We disable the immutable check because D3 will databind and
            // potentially augment additional information to each datum
            immutableCheck: false,
            // Not all the information we store in state is serializable
            // for example Dates or D3.Scales
            serializableCheck: false
        }),
    })

    return store;
};

export { createStore };
