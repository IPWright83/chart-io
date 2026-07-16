import { d3, eventActions, getXYFromTransform } from "@chart-io/core";
import type { IColor, IDispatch, IFocused, IScale, ITheme } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

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
function focus({ dispatch, focused, theme, yScale, grouped = false }: IBarFocusProps) {
    if (!focused) return;

    // Get the appropriate attributes
    const { element } = focused;
    const selection = d3.select(element) as d3.Selection<any, unknown, null, undefined>;
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
        y2: yScale.range()[0] as number,
    };

    dispatch(eventActions.addDropline(verticalDropline));

    return () => {
        selection.style("opacity", theme.series.opacity);
        dispatch(eventActions.removeDropline(verticalDropline));
    };
}

/**
 * Handles the user interacting with a DataPoint on the Bar chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  yScale       The d3 scale for the x-axis
 * @param  theme        The theme for the chart
 * @param  grouped      Whether the data on the chart is grouped
 * @return              A function to set the focused datum
 */
export const useFocused = ({ yScale, theme, grouped }: Omit<IBarFocusProps, "dispatch" | "focused">) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return focus({ dispatch, yScale, focused, theme, grouped });
    }, [dispatch, focused, yScale, theme.series.selectedOpacity]);

    return setFocused;
};
