import { vi } from "vitest";
import { defaultChartState, defaultEventState } from "@chart-io/core";
import type { IChartState, IEventState, IStore } from "@chart-io/core";

interface MockStoreState {
    chart?: Partial<IChartState>;
    event?: Partial<IEventState>;
}

export function createMockStore(state: MockStoreState): IStore {
    const { dimensions: chartDimensions, ...restChart } = state.chart ?? {};
    return {
        getState: () => ({
            chart: {
                ...defaultChartState,
                id: "test",
                ...restChart,
                dimensions: {
                    ...defaultChartState.dimensions,
                    ...(chartDimensions ?? {}),
                },
            },
            event: {
                ...defaultEventState,
                ...(state.event ?? {}),
            },
        }),
        dispatch: vi.fn(),
        subscribe: vi.fn().mockReturnValue(() => {}),
    } as unknown as IStore;
}

export function createMockStorybookStore(state: MockStoreState): IStore {
    const { dimensions: chartDimensions, ...restChart } = state.chart ?? {};
    return {
        getState: () => ({
            chart: {
                ...defaultChartState,
                ...restChart,
                dimensions: {
                    ...defaultChartState.dimensions,
                    ...(chartDimensions ?? {}),
                },
            },
            event: {
                ...defaultEventState,
                ...(state.event ?? {}),
            },
        }),
        dispatch: () => {},
        subscribe: () => () => {},
    } as unknown as IStore;
}
