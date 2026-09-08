import { chartActions, chartSelectors, IPivot, IState } from "@chart-io/core";

import { useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

export interface IPivotState {
    /**
     * Which axis (if any) is currently collapsed into a single cumulative linear scale, `undefined`
     * meaning the full grid
     */
    pivot: IPivot | undefined;
    /**
     * Switches to the given pivot
     * @param  pivot     The pivot to switch to, or `undefined` for the full grid
     */
    pivotTo: (pivot: IPivot | undefined) => void;
}

/**
 * Reads/writes the chart-level pivot state used by `<Heatmap>` to support switching between its full
 * grid, row-stacked-bars and column-stacked-bars layouts. Pass `pivotable` to also dispatch it into the
 * store as a side effect - `<HeatmapPlot>` does this itself (rather than `<Heatmap>` wrapping it),
 * since only descendants of `<Chart>` have access to the store it creates
 * @param  pivotable     Whether pivoting should be enabled. Omit to only read pivot state without
 *                       writing anything
 * @return The current pivot, and a function to change it
 */
export function usePivot(pivotable?: boolean): IPivotState {
    const store = useStore();
    const pivot = useSelector((s: IState) => chartSelectors.pivot(s));

    useEffect(() => {
        if (pivotable !== undefined) {
            store.dispatch(chartActions.setPivotable(pivotable));
        }
    }, [store, pivotable]);

    // Kept referentially stable across renders - it's included in useRender's dependency array,
    // which schedules a new render (and a state update) whenever any of its dependencies change
    const pivotTo = useCallback(
        (newPivot: IPivot | undefined) => {
            store.dispatch(chartActions.setPivot(newPivot));
        },
        [store],
    );

    return { pivot, pivotTo };
}
