import type { IColor, IColorLegend } from "@chart-io/core";
import { chartActions } from "@chart-io/core";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

/**
 * Registers a color legend with the chart's `<Legend>`, rendered as a horizontal gradient bar at
 * its bottom explaining a plot's continuous color scale (e.g. `<Heatmap>`). Mirrors `useSizeLegend`
 * @param  colors     The color palette the gradient interpolates between, lowest value first
 * @param  domain     The [min, max] value domain the gradient spans, or `undefined` while unresolved
 * @param  format     Formats each end of the gradient's value label
 */
export function useColorLegend(
    colors: IColor[] | undefined,
    domain: [number, number] | undefined,
    format: ((value: number) => string) | undefined,
) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!colors || !domain) {
            return undefined;
        }

        const colorLegend: IColorLegend = { colors, domain, format };

        dispatch(chartActions.setColorLegend(colorLegend));

        return () => {
            dispatch(chartActions.clearColorLegend());
        };
    }, [colors, domain, format]);
}
