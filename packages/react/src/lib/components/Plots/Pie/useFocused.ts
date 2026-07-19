import { d3 } from "@chart-io/core";
import type { IFocused, ITheme } from "@chart-io/core";

import { useEffect, useState } from "react";

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to highlight it
 * @param  theme        The theme for the chart
 * @return              A function to set the focused slice
 */
export const useFocused = (theme: ITheme) => {
    const [focused, setFocused] = useState<IFocused>(null);

    useEffect(() => {
        if (!focused) return;

        const selection = d3.select(focused.element);
        selection.style("opacity", theme.series.selectedOpacity);

        return () => {
            selection.style("opacity", theme.series.opacity);
        };
    }, [focused, theme.series.selectedOpacity, theme.series.opacity]);

    return setFocused;
};
