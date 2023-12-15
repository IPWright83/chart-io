import * as d3 from "@chart-io/d3";
import { IColor, IFocused, IScale, ITheme } from "@chart-io/types";

import type { Selection } from "d3-selection";

import { eventActions } from "../../store";
import { getXYFromTransform } from "../../utils";
import type { IDispatch } from "../../store";

export interface IBarFocusProps {
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
     * The scale to use for the YAxis
     */
    yScale: IScale;
    /**
     * True if the columns are grouped
     */
    grouped?: boolean;
}

/**
 * Helper function to manage markers & droplines for a selected datum on the Bar plot
 * @return              A function to set the focused datum
 */
export function focus({ dispatch, focused, theme, yScale, grouped = false }: IBarFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as Selection<any, unknown, null, undefined>;
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const width = +selection.attr("width");
    const tranformY =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).y;

    selection.style("opacity", theme.series.selectedOpacity);

    const verticalDropline = {
        isVertical: true,
        color: fill as IColor,
        x1: x + width,
        x2: x + width,
        y1: y + tranformY,
        y2: yScale.range()[0],
    };

    dispatch(eventActions.addDropline(verticalDropline));

    return () => {
        selection.style("opacity", theme.series.opacity);
        dispatch(eventActions.removeDropline(verticalDropline));
    };
}
