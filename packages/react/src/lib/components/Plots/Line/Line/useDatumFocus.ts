import { eventSelectors, IState, line } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface IDatumFocusProps extends Omit<line.ILineFocusProps, "layer" | "dispatch" | "eventMode" | "position"> {
    /**
     * The layer we're updating to from a React useRef
     */
    layer: React.MutableRefObject<Element>;
    /**
     * Whether the plot is interactive
     */
    interactive: boolean;
}

/**
 * Responds to events from an event layer to focus the nearest datum
 */
export function useDatumFocus({ interactive, layer, x, y, xScale, yScale, data, color }: IDatumFocusProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return line.focus({
                dispatch,
                x,
                y,
                color,
                xScale,
                yScale,
                position,
                data,
                eventMode,
                layer: layer.current,
            });
        }
    }, [xScale, yScale, x, y, position.x, position.y, interactive, color, data, dispatch, eventMode, layer]);
}
