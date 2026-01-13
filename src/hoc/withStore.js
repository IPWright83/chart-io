import React, { useMemo } from "react";
import { Provider } from "react-redux";

import { createStore } from "../store";

/**
 * Wraps a React component to add a redux store
 * @param  {ReactDOMComponent} WrappedComponent     The component to render
 * @return {ReactDOMComponent}                      The wrapped component
 */
const withStore =
    (WrappedComponent) =>
    /**
     * Wraps a component within a Redux store provider
     * @param  {...any}    options.props        All the props
     * @return {ReactDOMComponent}              The wrapped componet
     */
    ({ onStoreCreated, customReducers, ...props }) => {
        const store = useMemo(() => createStore(customReducers), [customReducers]);

        // If the consumer needs access to the store then fire
        // the callback
        if (onStoreCreated) {
            onStoreCreated(store);
        }

        return (
            <Provider store={store}>
                <WrappedComponent {...props} />
            </Provider>
        );
    };

export { withStore };
