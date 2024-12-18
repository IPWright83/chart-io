import { configureStore, createSlice } from "@reduxjs/toolkit";
import { svelteStoreEnhancer } from "./svelteStoreEnhancer.ts";

const testSlice = createSlice({
    name: "chart",
    initialState: {
        brush: {},
        dimensions: {
            width: 100,
            height: 100,
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
        },
    },
    reducers: {
        setWidth: (state: any, action: any) => {
            state.dimensions.width = action.payload;
        }
    }
})

export const createStore = () => {
    const store = configureStore({
        reducer: {
            chart: testSlice.reducer
        },
        enhancers: getDefaultEnhancers => [svelteStoreEnhancer, ...getDefaultEnhancers()],
    });

    return store;
}
