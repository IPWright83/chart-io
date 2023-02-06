import type { IDropline, IMarker, IColor, ITooltipItem, IMouseEventType, ICoordinate } from "@d3-chart/types";

import type { IState, IEventState, IEventStateTooltip } from "../types";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

interface IEventSelectors {
    store: (state: IState) => IEventState;
    droplines: (state: IState) => IDropline[];
    markers: (state: IState) => IMarker[];
    tooltip: {
        store: (state: IState) => IEventStateTooltip;
        show: (state: IState) => boolean;
        color: (state: IState) => IColor;
        items: (state: IState) => ITooltipItem[];
        position: (state: IState) => ICoordinate | undefined;
    };
    mode: (state: IState) => IMouseEventType;
    position: (state: IState) => ICoordinate | undefined;
}

export const eventSelectors: IEventSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: IState): IEventState => state.event,

    /**
     * Returns the set of droplines
     * @param  state   The application state
     * @return         The droplines
     */
    droplines: (state: IState): IDropline[] => eventSelectors.store(state).droplines,

    /**
     * Returns the set of markers
     * @param  state   The application state
     * @return         The markers
     */
    markers: (state: IState): IMarker[] => eventSelectors.store(state).markers,

    tooltip: {
        /**
         * Returns the tooltip part of the sub-state tree
         * @param  state   The application state
         * @return         The sub-state for the tooltip
         */
        store: (state: IState): IEventStateTooltip => eventSelectors.store(state).tooltip,

        /**
         * Should the tooltip currently be shown?
         * @param  state   The application state
         * @return        True if the tooltip should be shown
         */
        show: (state: IState): boolean => eventSelectors.tooltip.items(state).length > 0,

        /**
         * The colour that the tooltip should take
         * @param  state   The application state
         * @return         The colour of the tooltip item
         */
        color: (state: IState): IColor => eventSelectors.tooltip.store(state).color,

        /**
         * The set of tooltip tiems
         * @param  state   The application state
         * @return          The array of tooltip items
         */
        items: (state: IState): ITooltipItem[] => eventSelectors.tooltip.store(state).items || EMPTY_ARRAY,

        /**
         * A moust event that triggered
         * @param  state   The application state
         * @return         The mouse event that triggered the tooltip
         */
        position: (state: IState): ICoordinate | undefined => eventSelectors.tooltip.store(state).position,
    },

    /**
     * The current mode for the chart events. This will depend on the last
     * event fired. If the cursor isn't over the chart then this should be "NONE"
     * otherwise it will be either "ENTER" for the first event, or "MOVE" for all future
     * events
     * @param  state The application state
     * @return       One of "NONE", "MOVE" or "ENTER"
     */
    mode: (state: IState): IMouseEventType => {
        const { mouse } = eventSelectors.store(state);
        if (!mouse) {
            return "NONE";
        }

        return mouse.mode;
    },

    /**
     * The current position of the mouse events
     * @param  {Object} state The application state
     * @return {Object}       An object with { x, y } positions or null
     */
    position: (state: IState): ICoordinate | undefined => {
        const { mouse } = eventSelectors.store(state);
        return mouse;
    },
};
