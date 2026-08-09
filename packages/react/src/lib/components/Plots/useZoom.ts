import { chartActions, chartSelectors, IState } from "@chart-io/core";

import { useCallback } from "react";
import { useSelector, useStore } from "react-redux";

export interface IZoom {
    /**
     * Should this plot support clicking a node to zoom in and refocus on its subtree?
     */
    zoomable: boolean;
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
 * Reads/writes the chart-level zoom state used by hierarchical plots (e.g. `<Treemap>`) to support
 * clicking a node to zoom in and refocus on its subtree - see `<Chart zoomable>`
 * @return The current zoom state, and a function to change it
 */
export function useZoom(): IZoom {
    const store = useStore();
    const zoomable = useSelector((s: IState) => chartSelectors.zoomable(s));
    const path = useSelector((s: IState) => chartSelectors.zoom.path(s));

    // Kept referentially stable across renders - it's included in useRender's dependency array,
    // which schedules a new render (and a state update) whenever any of its dependencies change
    const zoomTo = useCallback(
        (newPath: string[]) => {
            store.dispatch(chartActions.setZoomPath(newPath));
        },
        [store],
    );

    return { zoomable, path, zoomTo };
}
