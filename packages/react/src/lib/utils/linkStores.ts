import type { AnyAction, Store } from "redux";
import { logAndThrowError } from "./logger";

/**
 * Links 2 or more Redux stores together, piping events between them
 * @param  stores          The set of stores to link
 * @param  actionFilter    A regex to match against redux actions
 */
export function linkStores(stores: Store<any, AnyAction>[] = [], actionFilter = /EVENT\.MOUSE*/) {
    // Grab the dispatch function for each store
    const dispatches = [];

    /**
     * A custom dispatcher that will call all the other dispatches
     * @param  originalDispatch      The original dispatch function for the store that recieved the action
     * @return                       A new dispatch function
     */
    const dispatch = (originalDispatch) => (event) => {
        let type = event.type;

        // Check for being wrapped in Redux DevTools
        if (event.type === "PERFORM_ACTION") {
            type = event?.action.type;
        }

        // If the filter matches then call the dispatch
        // function on each of the stores
        if (type && type.match(actionFilter)) {
            dispatches.forEach((d) => d(event));
            return;
        }

        // Just call the dispatch function on the store
        originalDispatch(event);
    };

    /**
     * Setup the custom dispatch for each store
     * @param  store   The store to setup the dispatch on
     */
    const setupDispatch = (store) => {
        const _store = store.liftedStore ?? store;
        if (!_store) {
            // istanbul ignore next
            return;
        }

        if (_store.chartItOverride) {
            // prettier-ignore
            logAndThrowError("E008", "The linkStores() function can strictly only be called once during initialisation");
        }

        // Record the dispatch for later
        const _dispatch = _store.dispatch;
        dispatches.push(_dispatch);

        // Swap out the dispatch for our custom one
        _store.dispatch = dispatch(_dispatch);
        _store.chartItOverride = true;
    };

    stores.forEach((s) => setupDispatch(s));
}
