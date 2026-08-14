import { chartActions, chartSelectors, IState } from "@chart-io/core";

import { useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

export interface IZoom {
    /**
     * The ancestry path (root excluded) of the node currently focused on. An empty array means fully
     * zoomed out
     */
    path: string[];
    /**
     * Zooms to the node with this ancestry path. Pass an empty array to zoom all the way back out
     * @param  path      The ancestry path (root excluded) of the node to zoom to
     */
    zoomTo: (path: string[]) => void;
}

/**
 * Reads/writes the chart-level zoom state used by hierarchical plots (e.g. `<Treemap>`, `<Dendrogram>`,
 * `<StackedDonut>`) to support clicking a node to zoom in and refocus on its subtree. Pass `zoomable` to
 * also dispatch it into the store as a side effect - the plot components do this themselves (rather than
 * the chart component wrapping them) since only descendants of `<Chart>` have access to the store it
 * creates
 * @param  zoomable       Whether zooming should be enabled. Omit to only read zoom state without
 *                        writing anything
 * @param  centerRadius   The radius, in pixels, of the focused node's clickable center hole (e.g. a
 *                        `<StackedDonut>`'s hole). Only meaningful for radial plots - omit otherwise
 * @return The current zoom path, and a function to change it
 */
export function useZoom(zoomable?: boolean, centerRadius?: number): IZoom {
    const store = useStore();
    const path = useSelector((s: IState) => chartSelectors.zoom.path(s));

    useEffect(() => {
        if (zoomable !== undefined) {
            store.dispatch(chartActions.setZoomable(zoomable));
        }
    }, [store, zoomable]);

    useEffect(() => {
        if (centerRadius !== undefined) {
            store.dispatch(chartActions.setZoomCenterRadius(centerRadius));
        }
    }, [store, centerRadius]);

    // Kept referentially stable across renders - it's included in useRender's dependency array,
    // which schedules a new render (and a state update) whenever any of its dependencies change
    const zoomTo = useCallback(
        (newPath: string[]) => {
            store.dispatch(chartActions.setZoomPath(newPath));
        },
        [store],
    );

    return { path, zoomTo };
}
