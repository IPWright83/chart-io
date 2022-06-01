/**
 * Creates a mock Redux store for testing with
 * @param  {Object} state     The initial state of the store
 * @return {Object}           A mock store
 */
export const createMockStore = (state) => {
    return {
        getState: () => state,
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    };
};
