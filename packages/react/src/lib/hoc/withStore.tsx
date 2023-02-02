/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { Provider } from "react-redux";

import { createStore } from "../store";

/**
 * Wraps a React component to add a redux store
 * @param  WrappedComponent     The component to render
 * @return                      The wrapped component
 */
const withStore =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
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

        // https://stackoverflow.com/a/54583335/21061
        return (
            <Provider store={store}>
                <WrappedComponent {...(props as P)} />
            </Provider>
        );
    };

export { withStore };
