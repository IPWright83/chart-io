import type { IColor, IShape } from "@chart-it/types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { chartActions } from "../store";

/**
 * Triggers adding an item to the Legend
 * @param {string}  name             The name of the series
 * @param {IShape}  shape            The shape to use for any icon in the legend
 * @param {boolean} showInLegend     True if this hook should use the legend. Setting to false bypasses the hook
 * @param {IColor}  color            The color to use for the shape
 */
export function useLegendItem(name: string, shape: IShape, showInLegend: boolean, color?: IColor) {
    const dispatch = useDispatch();

    useEffect(() => {
        const legendItem = { name, color, icon: shape };

        if (showInLegend) {
            dispatch(chartActions.addLegendItem(legendItem));
        }

        return () => {
            if (showInLegend) {
                dispatch(chartActions.removeLegendItem(legendItem));
            }
        };
    }, [name, shape, color, showInLegend]);
}
