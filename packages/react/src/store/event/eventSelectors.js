import { createSelector } from "reselect";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const eventSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  {Object} state The application state
     * @return {Object}       The state
     */
    store: (state) => state.event || EMPTY_OBJECT,

    /**
     * Returns the set of droplines
     * @param  {Object} state   The application state
     * @return {Array<Object>}  The droplines
     */
    droplines: (state) => eventSelectors.store(state).droplines || EMPTY_ARRAY,

    /**
     * Returns the set of markers
     * @param  {Object} state   The application state
     * @return {Array<Object>}  The markers
     */
    markers: (state) => eventSelectors.store(state).markers || EMPTY_ARRAY,

    tooltip: {
        /**
         * Returns the tooltip part of the sub-state tree
         * @param  {Object} state   The application state
         * @return {Object}         The sub-state for the tooltip
         */
        store: (state) => eventSelectors.store(state).tooltip || EMPTY_OBJECT,

        /**
         * Should the tooltip currently be shown?
         * @param  {Object} state   The application state
         * @return {Boolean}        True if the tooltip should be shown
         */
        show: (state) => eventSelectors.tooltip.items(state).length > 0,

        /**
         * The colour that the tooltip should take
         * @param  {Object} state   The application state
         * @return {String}         The colour of the tooltip item
         */
        color: (state) => eventSelectors.tooltip.store(state).color,

        /**
         * The set of tooltip tiems
         * @param  {Object} state   The application state
         * @return {Array}          The array of tooltip items
         */
        items: (state) => eventSelectors.tooltip.store(state).tooltipItems || EMPTY_ARRAY,

        /**
         * A moust event that triggered
         * @param  {Object} state   The application state
         * @return {MouseEvent}     The mouse event that triggered the tooltip
         */
        position: (state) => eventSelectors.tooltip.store(state).position || EMPTY_OBJECT,
    },

    /**
     * The current mode for the chart events. This will depend on the last
     * event fired. If the cursor isn't over the chart then this should be "NONE"
     * otherwise it will be either "ENTER" for the first event, or "MOVE" for all future
     * events
     * @param  {Object} state The application state
     * @return {String}       One of "NONE", "MOVE" or "ENTER"
     */
    mode: (state) => {
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
