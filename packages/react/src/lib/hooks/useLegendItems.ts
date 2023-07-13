import type { IColor, IShape } from "@chart-io/types";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

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

export function useLegendItems(names: string[], shape: IShape, showInLegend: boolean, colors?: IColor[]) {
    const dispatch = useDispatch();

    const legendItems = useMemo(() => {
        return names.map((name, index) => ({
            name,
            icon: shape,
            color: colors[index],
        }));
    }, [names, colors]);

    useEffect(() => {
        if (showInLegend) {
            legendItems.forEach((legendItem) => dispatch(chartActions.addLegendItem(legendItem)));
        }

        return () => {
            if (showInLegend) {
                legendItems.forEach((legendItem) => dispatch(chartActions.removeLegendItem(legendItem)));
            }
        };
    }, [legendItems, showInLegend]);
}
