import type { ITheme } from "@chart-io/core";
import { pie } from "@chart-io/core";

import { useEffect, useState } from "react";

/**
 * Handles the user interacting with a slice on a Pie/Donut/StackedDonut plot and the need to highlight it
 * @param  theme        The theme for the chart
 * @return              A function to set the focused slice
 */
export const useFocused = (theme: ITheme) => {
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        return pie.focus({ focused, theme });
    }, [focused, theme.series.selectedOpacity, theme.series.opacity]);

    return setFocused;
};
