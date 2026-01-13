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
        let type = event.type;

        // Check for being wrapped in Redux DevTools
        if (event.type === "PERFORM_ACTION") {
            type = event?.action.type;
        }

        // If the filter matches then call the dispatch
        // function on each of the stores
        if (type && type.startsWith(typeFilter)) {
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
        const _store = store.liftedStore ?? store;
        if (!_store) {
            return;
        }

        if (_store.chartItOverride) {
            throw new Error("This function can strictly only be called once during initialisation");
        }

        // Record the dispatch for later
        const _dispatch = _store.dispatch;
        dispatches.push(_dispatch);

        // Swap out the dispatch for our custom one
        _store.dispatch = dispatch(_dispatch);
        _store.chartItOverride = true;
    };

    stores.forEach((s) => setupDispatch(s));
};
