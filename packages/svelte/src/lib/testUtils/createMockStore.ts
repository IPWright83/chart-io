import { vi } from "vitest";
import { defaultChartState, defaultEventState } from "@chart-io/core";
import type { IStore } from "@chart-io/core";

export function createMockStore(state: { chart?: any; event?: any }): IStore {
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

export function createMockStorybookStore(state: { chart?: any; event?: any }): IStore {
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
