import { createSelector } from "reselect";

import type { IDropline, IMarker, IColor, ITooltipItem, IMouseMode, ICoordinate } from "../../types";
import type { IStore, IEventStore, IEventStoreTooltip } from "../types";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

interface EventSelectors {
    store: (state: IStore) => IEventStore;
    droplines: (state: IStore) => IDropline[];
    markers: (state: IStore) => IMarker[];
    tooltip: {
        store: (state: IStore) => IEventStoreTooltip;
        show: (state: IStore) => boolean;
        color: (state: IStore) => IColor;
        items: (state: IStore) => ITooltipItem[];
        position: (state: IStore) => ICoordinate | {};
    };
    mode: (state: IStore) => IMouseMode;
    position: (state: IStore) => ICoordinate | {};
}

const _eventSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: IStore): IEventStore => state.event,

    /**
     * Returns the set of droplines
     * @param  state   The application state
     * @return         The droplines
     */
    droplines: (state: IStore): IDropline[] => _eventSelectors.store(state).droplines,

    /**
     * Returns the set of markers
     * @param  state   The application state
     * @return         The markers
     */
    markers: (state: IStore): IMarker[] => _eventSelectors.store(state).markers,

    tooltip: {
        /**
         * Returns the tooltip part of the sub-state tree
         * @param  state   The application state
         * @return         The sub-state for the tooltip
         */
        store: (state: IStore): IEventStoreTooltip => _eventSelectors.store(state).tooltip,

        /**
         * Should the tooltip currently be shown?
         * @param  state   The application state
         * @return        True if the tooltip should be shown
         */
        show: (state: IStore): boolean => _eventSelectors.tooltip.items(state).length > 0,

        /**
         * The colour that the tooltip should take
         * @param  state   The application state
         * @return         The colour of the tooltip item
         */
        color: (state: IStore): IColor => _eventSelectors.tooltip.store(state).color /*?.toString()*/,

        /**
         * The set of tooltip tiems
         * @param  state   The application state
         * @return          The array of tooltip items
         */
        items: (state: IStore): ITooltipItem[] => _eventSelectors.tooltip.store(state).items || EMPTY_ARRAY,

        /**
         * A moust event that triggered
         * @param  state   The application state
         * @return         The mouse event that triggered the tooltip
         */
        position: (state: IStore): ICoordinate | undefined => _eventSelectors.tooltip.store(state).position,
    },

    /**
     * The current mode for the chart events. This will depend on the last
     * event fired. If the cursor isn't over the chart then this should be "NONE"
     * otherwise it will be either "ENTER" for the first event, or "MOVE" for all future
     * events
     * @param  state The application state
     * @return       One of "NONE", "MOVE" or "ENTER"
     */
    mode: (state: IStore): IMouseMode => {
        const { mouse } = _eventSelectors.store(state);
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
const position = createSelector(_eventSelectors.store, (event: IEventStore): ICoordinate | undefined => {
    if (!event || !event.mouse) {
        return;
    }

    return { x: event.mouse.x, y: event.mouse.y };
});

export const eventSelectors = {
    ..._eventSelectors,
    position,
};
