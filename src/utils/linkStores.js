/**
 * Links 2 or more Redux stores together, piping events between them
 * @param  {Array}  stores          The set of stores to link
 * @param  {String} typeFilter      The event prefix that should be used (CHART or EVENT)
 */
export const linkStores = (stores = [], typeFilter = "EVENT") => {
    // Grab the dispatch function for each store
    const dispatches = [];

    /**
     * A custom dispatcher that will call all the other dispatches
     * @param  {Function} originalDispatch      The original dispatch function for the store that recieved the action
     * @return {Function}                       A new dispatch function
     */
    const dispatch = (originalDispatch) => (event) => {
        const type = event?.action.type;

        // If the filter matches then call the dispatch
        // function on each of the stores
        if (type.startsWith(typeFilter)) {
            dispatches.forEach((d) => d(event));
            return;
        }

        // Just call the dispatch function on the store
        originalDispatch(event);
    };

    /**
     * Setup the custom dispatch for each store
     * @param  {Object} store   The store to setup the dispatch on
     */
    const setupDispatch = (store) => {
        // This is an error case, and means the store hasn't been
        // wrapped in the correct middleware
        if (!store.liftedStore) {
            return;
        }

        if (store.liftedStore.chartItOverride) {
            throw new Error("This function can strictly only be called once during initialisation");
        }

        // Record the dispatch for later
        const _dispatch = store.liftedStore.dispatch;
        dispatches.push(_dispatch);

        // Swap out the dispatch for our custom one
        store.liftedStore.dispatch = dispatch(_dispatch);
        store.liftedStore.dispatch.chartItOverride = true;
    };

    stores.forEach((s) => setupDispatch(s));
};
