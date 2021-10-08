import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

const chartSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  {Object} state The application state
     * @return {Object}       The state
     */
    store: (state) => state.chart || {},

    /**
     * Returns the data for the chart
     * @param  {Object} state The application state
     * @return {Object}       The chart data
     */
    data: (state) => chartSelectors.store(state).data || [],

    /**
     * Returns the duration to run animations for
     * @param  {Object} state The application state
     * @return {Number}       The duration in milliseconds
     */
    animationDuration: (state) => {
        const animationDuration = chartSelectors.store(state).animationDuration;
        const data = chartSelectors.data(state);

        // If we have a large dataset, then we're going to default
        // automatically to no animations
        if (data.length && data.length > PROGRESSIVE_RENDER_THRESHOLD) {
            return 0;
        }

        return animationDuration || 0;
    },

    /**
     * Represents the scales that the chart uses
     * @type {Object}
     */
    scales: {
        store: (state) => chartSelectors.store(state).scales || {},

        /**
         * Return a scale based on the orientation
         * @param  {Object} state           The application state
         * @param  {String} field           The field to get the scale of
         * @return {Function}               The d3.Scale function
         */
        getScale: (state, field) => chartSelectors.scales.store(state)[field],
    },

    /**
     * Returns dimension based information for the chart
     */
    dimensions: {
        store: (state) => chartSelectors.store(state).dimensions || {},

        /**
         * Returns the width of the chart
         * @param  {Object} state The application state
         * @return {Number}       The width
         */
        width: (state) => chartSelectors.dimensions.store(state).width || 0,

        /**
         * Returns the height of the chart
         * @param  {Object} state The application state
         * @return {Number}       The height
         */
        height: (state) => chartSelectors.dimensions.store(state).height || 0,

        /**
         * Returns the margin of the chart
         * @param  {Object} state The application state
         * @return {Object}       The margin
         */
        margin: (state) => chartSelectors.dimensions.store(state).margin || {},
    },

    /**
     * Returns the theme for the chart
     * @param {Object} state The application state
     * @return {Object} The theme object
     */
    theme: (state) => chartSelectors.store(state).theme,
};

export { chartSelectors };
