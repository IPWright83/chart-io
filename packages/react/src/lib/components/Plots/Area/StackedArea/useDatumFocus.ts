import { area, eventSelectors, IState } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumsFocusProps extends Omit<area.IStackedAreaFocusProps, "dispatch" | "eventMode" | "position"> {
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
}

/**
 * Responds to events from an event layer to focus the nearest datum
 */
export function useDatumFocus({ interactive, x, ys, xScale, yScale, data, colors }: IDatumsFocusProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        /* If possible respond to global mouse events for tooltips etc */
        if (interactive) {
            return area.stacked.focus({
                dispatch,
                x,
                ys,
                colors,
                xScale,
                yScale,
                position,
                data,
                eventMode,
            });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, ys, data, colors]);
}
