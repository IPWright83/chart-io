/**
 * Creates a mock Redux store for testing with
 * @param  {Object} state     The initial state of the store
 * @return {Object}           A mock store
 */
export const createMockStore = ({ chartState }) => {
    return {
        getState: () => ({
            chart: chartState,
        }),
        dispatch: () => {},
        subscribe: () => {},
    };
};
