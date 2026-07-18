import { d3 } from "@chart-io/core";
import type { IFocused, ITheme } from "@chart-io/core";

import { useEffect, useState } from "react";

export interface IPieFocusProps {
    /**
     * The slice that is currently focused
     */
    focused?: IFocused;
    /**
     * The theme for the chart
     */
    theme: ITheme;
}

/**
 * Helper function to highlight a selected slice on a Pie/Donut plot
 * @return              A function to clear up the highlight
 */
function focus({ focused, theme }: IPieFocusProps) {
    if (!focused) return;

    const selection = d3.select(focused.element);
    selection.style("opacity", theme.series.selectedOpacity);

    return () => {
        selection.style("opacity", theme.series.opacity);
    };
}

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to highlight it
 * @param  theme        The theme for the chart
 * @return              A function to set the focused slice
 */
export const useFocused = (theme: ITheme) => {
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return focus({ focused, theme });
    }, [focused, theme.series.selectedOpacity, theme.series.opacity]);

    return setFocused;
};
