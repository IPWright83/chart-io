import { bar } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

/**
 * Handles the user interacting with a DataPoint on the Bar chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  yScale       The d3 scale for the x-axis
 * @param  theme        The theme for the chart
 * @param  grouped      Whether the data on the chart is grouped
 * @return              A function to set the focused datum
 */
export const useFocused = ({ yScale, theme, grouped }: Omit<bar.IBarFocusProps, "dispatch" | "focused">) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return bar.focus({ dispatch, yScale, focused, theme, grouped });
    }, [dispatch, focused, yScale, theme.series.selectedOpacity]);

    return setFocused;
};
