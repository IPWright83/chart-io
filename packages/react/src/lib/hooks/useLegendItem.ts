import type { IColor, IShape } from "@chart-it/types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { chartActions } from "../store";

/**
 * Trigger the rendering of a layer asynchronously. This is useful
 * when we expect several store updates to happen asynchronously and
 * want to render afterwards.
 *
 * An example is when the data changes we calculate new a scales, which is done off the back
 * of a render. We need both the new data and new scale to reliably render a plot
 * @param callback       The actual render function
 * @param dependencies   The set of dependencies that should trigger a re-render
 */

export function useLegendItem(name: string, shape: IShape, interactive: boolean, color?: IColor) {
    const dispatch = useDispatch();

    useEffect(() => {
        const legendItem = { name, color, icon: shape };

        if (interactive) {
            dispatch(chartActions.addLegendItem(legendItem));
        }

        return () => {
            if (interactive) {
                dispatch(chartActions.removeLegendItem(legendItem));
            }
        };
    }, [name, shape, color, interactive]);
}
