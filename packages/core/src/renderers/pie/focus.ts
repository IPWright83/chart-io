import { d3 } from "../../d3";
import { IFocused, ITheme } from "../../types";

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
export function focus({ focused, theme }: IPieFocusProps) {
    if (!focused) return;

    const selection = d3.select(focused.element);
    selection.style("opacity", theme.series.selectedOpacity);

    return () => {
        selection.style("opacity", theme.series.opacity);
    };
}
