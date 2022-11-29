import { createSelector } from "reselect";

import { Dropline, Marker, Color, TooltipItem, MouseMode, Coordinate } from "../../types";
import { Store, EventStore, EventStoreTooltip } from "../types";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const eventSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: Store): EventStore => state.event,

    /**
     * Returns the set of droplines
     * @param  state   The application state
     * @return         The droplines
     */
    droplines: (state: Store): Dropline[] => eventSelectors.store(state).droplines,

    /**
     * Returns the set of markers
     * @param  state   The application state
     * @return         The markers
     */
    markers: (state: Store): Marker[] => eventSelectors.store(state).markers,

    tooltip: {
        /**
         * Returns the tooltip part of the sub-state tree
         * @param  state   The application state
         * @return         The sub-state for the tooltip
         */
        store: (state: Store): EventStoreTooltip => eventSelectors.store(state).tooltip,

        /**
         * Should the tooltip currently be shown?
         * @param  state   The application state
         * @return        True if the tooltip should be shown
         */
        show: (state: Store): boolean => eventSelectors.tooltip.items(state).length > 0,

        /**
         * The colour that the tooltip should take
         * @param  state   The application state
         * @return         The colour of the tooltip item
         */
        color: (state: Store): Color => eventSelectors.tooltip.store(state).color /*?.toString()*/,

        /**
         * The set of tooltip tiems
         * @param  state   The application state
         * @return          The array of tooltip items
         */
        items: (state: Store): TooltipItem[] => eventSelectors.tooltip.store(state).items || EMPTY_ARRAY,

        /**
         * A moust event that triggered
         * @param  state   The application state
         * @return         The mouse event that triggered the tooltip
         */
        position: (state: Store): Coordinate | {} => eventSelectors.tooltip.store(state).position || EMPTY_OBJECT,
    },

    /**
     * The current mode for the chart events. This will depend on the last
     * event fired. If the cursor isn't over the chart then this should be "NONE"
     * otherwise it will be either "ENTER" for the first event, or "MOVE" for all future
     * events
     * @param  state The application state
     * @return       One of "NONE", "MOVE" or "ENTER"
     */
    mode: (state: Store): MouseMode => {
        const { mouse } = eventSelectors.store(state);
        if (!mouse) {
            return "NONE";
        }

        return mouse.mode;
    },
};

/**
 * The current position of the mouse events
 * @param  {Object} state The application state
 * @return {Object}       An object with { x, y } positions or null
 */
eventSelectors.position = createSelector(eventSelectors.store, (event) => {
    const { mouse } = event;
    if (!mouse) {
        return EMPTY_OBJECT;
    }

    return { x: mouse.x, y: mouse.y };
});

export { eventSelectors };
