import { eventSelectors, IState, line } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import { useEffect } from "react";

interface ITooltipProps extends Omit<line.ILineTooltipProps, "layer" | "dispatch" | "eventMode" | "position"> {
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
 * Responds to events from an event layer to show Tooltips
 */
export function useTooltip({ layer, interactive, x, y, xScale, yScale, data, color }: ITooltipProps) {
    const { dispatch } = useStore();
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));

    /* If possible respond to global mouse events for tooltips etc */
    useEffect(() => {
        if (interactive) {
            return line.tooltip({
                dispatch,
                x,
                y,
                color,
                xScale,
                yScale,
                position,
                data,
                layer: layer.current,
                eventMode,
            });
        }
    }, [dispatch, eventMode, position.x, position.y, xScale, yScale, x, y, data, layer, color]);
}
