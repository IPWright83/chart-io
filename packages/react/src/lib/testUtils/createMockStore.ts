import { Store, AnyAction } from "redux";
import { IState, defaultChartState, defaultEventState } from "../store";

/**
 * Creates a mock Redux store for testing with
 * @param  state     The initial state of the store
 * @return           A mock store
 */
export function createMockStore(state: IState) {
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
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    } as unknown as Store<any, AnyAction>;
}

/**
 * Creates a mock Redux store for Storybook
 * @param  state     The initial state of the store
 * @return           A mock store
 */
export function createMockStorybookStore(state: IState) {
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
        dispatch: () => {},
        subscribe: () => {},
    } as unknown as Store<any, AnyAction>;
}
