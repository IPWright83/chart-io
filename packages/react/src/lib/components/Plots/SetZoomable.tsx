import { chartActions } from "@chart-io/core";

import { useEffect } from "react";
import { useStore } from "react-redux";

export interface ISetZoomableProps {
    /**
     * Should hierarchical plots in the chart support clicking a node to zoom in and refocus on its
     * subtree?
     */
    zoomable: boolean;
}

/**
 * Dispatches the chart-level zoomable flag into the Redux store - see `useZoom`. Rendered as a child of
 * `<Chart>` by hierarchical chart components (e.g. `<Treemap zoomable>`) that support zooming, since
 * only descendants of `<Chart>` have access to the store it creates
 * @param  zoomable      Whether zooming should be enabled
 * @return               Renders nothing
 */
export function SetZoomable({ zoomable }: ISetZoomableProps) {
    const store = useStore();

    useEffect(() => {
        store.dispatch(chartActions.setZoomable(zoomable));
    }, [store, zoomable]);

    return null;
}
