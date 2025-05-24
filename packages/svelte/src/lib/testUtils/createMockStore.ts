import { defaultChartState, defaultEventState, type IStore } from "@chart-io/core";
// import { vi } from "vitest";

// /**
//  * Creates a mock Redux store for testing with
//  * @param  state     The initial state of the store
//  * @return           A mock store
//  */
// export function createMockStore(state: { chart?: any; event?: any }): IStore {
//     return {
//         getState: () => ({
//             chart: {
//                 ...{ ...defaultChartState, id: "test" },
//                 ...(state.chart ?? {}),
//             },
//             event: {
//                 ...defaultEventState,
//                 ...(state.event ?? {}),
//             },
//         }),
//         dispatch: vi.fn(),
//         subscribe: vi.fn(),
//     } as unknown as IStore;
// }

/**
 * Creates a mock Redux store for Storybook
 * @param  state     The initial state of the store
 * @return           A mock store
 */
export function createMockStorybookStore(state: { chart?: any; event?: any }): IStore {
    return {
        getState: () => ({
            chart: {
                ...defaultChartState,
                ...(state.chart ?? {}),
            },
            event: {
                ...defaultEventState,
                ...(state.event ?? {}),
            },
        }),
        //eslint-disable-next-line @typescript-eslint/no-empty-function
        dispatch: () => {},
        //eslint-disable-next-line @typescript-eslint/no-empty-function
        subscribe: () => {},
    } as unknown as IStore;
} 
