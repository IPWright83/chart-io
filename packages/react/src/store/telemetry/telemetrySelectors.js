const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const telemetrySelectors = {
    /**
     * Returns the store for the telemetry part of state
     * @param  {Object} state The application state
     * @return {Object}       The state
     */
    store: (state) => state.telemetry || EMPTY_OBJECT,

    /**
     * Returns the id of the chart
     * @param  {Object} state The application state
     * @return {Object}       The chart id
     */
    id: (state) => telemetrySelectors.store(state).id,

    /**
     * Returns the analytics for the chart
     * @param  {Object} state The application state
     * @return {Object}       The analytics to send
     */
    chartAnalytics: (state) => telemetrySelectors.store(state).chart,

    /**
     * Returns the analytics for the data
     * @param  {Object} state The application state
     * @return {Object}       The analytics to send
     */
    dataAnalytics: (state) => telemetrySelectors.store(state).data,
};

export { telemetrySelectors };
