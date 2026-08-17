import type { ISizeLegend, IValue } from "@chart-io/core";
import { chartActions } from "@chart-io/core";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

/**
 * Registers a size legend with the chart's `<Legend>`, rendered as a nested-circle diagram at its
 * bottom explaining a `<Scatter z>`/`<Scatters z>`'s size encoding. Used by `<ZAxis>`
 * @param {string}    field         The key of the field the size scale is built from
 * @param {number}    ticks         The number of representative circles to draw
 * @param {IValue[]}  tickValues    Explicit values to draw a circle for, instead of `ticks`
 * @param {Function}  tickFormat    Formats each circle's value label
 */
export function useSizeLegend(
    field: string,
    ticks: number | undefined,
    tickValues: IValue[] | undefined,
    tickFormat: ((value: IValue) => string) | undefined,
) {
    const dispatch = useDispatch();

    useEffect(() => {
        const sizeLegend: ISizeLegend = { field, ticks, tickValues, tickFormat };

        dispatch(chartActions.setSizeLegend(sizeLegend));

        return () => {
            dispatch(chartActions.clearSizeLegend());
        };
    }, [field, ticks, tickValues, tickFormat]);
}
