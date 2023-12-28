import { scatter } from "@chart-io/core";

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

/**
 * Handles the user interacting with a DataPoint on the Scatter chart
 * @param  dispatch     The redux store dispatch function
 * @param  xScale       The d3 scale for the x-axis
 * @param  yScale       The d3 scale for the y-axis
 * @return              A function to set the focused datum
 */
export function useFocused({ xScale, yScale }: Omit<scatter.IScatterFocusProps, "focused" | "dispatch">) {
    const { dispatch } = useStore();
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return scatter.focus({ dispatch, xScale, yScale, focused });
    }, [dispatch, xScale, yScale, focused]);

    return setFocused;
}
