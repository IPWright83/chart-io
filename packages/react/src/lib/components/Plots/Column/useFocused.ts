import { d3, eventActions, getXYFromTransform } from "@chart-io/core";
import type { IColor, IDispatch, IFocused, IScale, ITheme } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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
function focus({ dispatch, focused, theme, xScale, grouped = false }: IColumnFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as d3.Selection<any, unknown, null, undefined>;
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

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  xScale       The d3 scale for the x-axis
 * @param  theme        The theme for the chart
 * @param  grouped      Whether the data on the chart is grouped
 * @return              A function to set the focused datum
 */
export const useFocused = ({ xScale, theme, grouped }: Omit<IColumnFocusProps, "dispatch" | "focused">) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return focus({ dispatch, xScale, focused, theme, grouped });
    }, [dispatch, focused, xScale, theme.series.selectedOpacity]);

    return setFocused;
};
