import { IColor, IFocused, IScale, ITheme } from "@chart-io/types";
import { d3 } from "../../d3";

import type { Selection } from "d3-selection";

import type { IDispatch } from "../../store";
import { eventActions } from "../../store";
import { getXYFromTransform } from "../../utils";

export interface IColumnFocusProps {
    /**
     * The redux store dispatch function
     */
    dispatch: IDispatch;
    /**
     * The datum that is currently focused
     */
    focused?: IFocused;
    /**
     * The theme for the chart
     */
    theme: ITheme;
    /**
     * The scale to use for the XAxis
     */
    xScale: IScale;
    /**
     * True if the columns are grouped
     */
    grouped?: boolean;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Column plot
 * @return              A function to set the focused datum
 */
export function focus({ dispatch, focused, theme, xScale, grouped = false }: IColumnFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as Selection<any, unknown, null, undefined>;
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const tranformX =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).x;

    selection.style("opacity", theme.series.selectedOpacity);

    const horizontalDropline = {
        isHorizontal: true,
        color: fill as IColor,
        x1: x + tranformX,
        x2: xScale.range()[0] as number,
        y1: y,
        y2: y,
    };

    dispatch(eventActions.addDropline(horizontalDropline));

    return () => {
        selection.style("opacity", theme.series.opacity);
        dispatch(eventActions.removeDropline(horizontalDropline));
    };
}
