import { column } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  dispatch     The redux store dispatch function
 * @param  xScale       The d3 scale for the x-axis
 * @param  theme        The theme for the chart
 * @param  grouped      Whether the data on the chart is grouped
 * @return              A function to set the focused datum
 */
export const useFocused = ({ xScale, theme, grouped }: Omit<column.IColumnFocusProps, "dispatch" | "focused">) => {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return column.focus({ dispatch, xScale, focused, theme, grouped });
    }, [dispatch, focused, xScale, theme.series.selectedOpacity]);

    return setFocused;
};
