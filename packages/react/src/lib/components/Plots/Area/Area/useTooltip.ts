import { area, eventSelectors, IState } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumTooltipProps extends Omit<area.IAreaTooltipProps, "dispatch" | "eventMode" | "position"> {
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
}

/**
 * Responds to events from an event layer to show Tooltips
 */
export function useTooltip({ x, y, xScale, yScale, data, color, interactive }: IDatumTooltipProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return area.tooltip({ x, y, xScale, yScale, data, color, dispatch, eventMode, position });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, y, data, color]);
}
