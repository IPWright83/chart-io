import React, { useMemo } from "react";
import type { AnyAction } from "redux";
import { Provider } from "react-redux";

import { createStore, IStore } from "../store";

export type IOnStoreCreated = (store: IStore) => void;

export type ICustomReducers = Record<string, <T>(state: T, action: AnyAction) => T>;

export interface IWithStoreProps {
    /**
     * Callback triggered when the Redux store is first created
     * @param  store          The Redux store that has been created
     */
    onStoreCreated?: IOnStoreCreated;
    /**
     * A set of custom reducers that can be registered into Redux
     * @example
     * const customReducer = (state: ICustomState, action: ICustomAction): ICustomState => {
     *     switch(action.type) {
     *        case "Add":
     *            return { ...state, count: state.count + 1 };
     *        case "Subtract":
     *            return { ...state, count: state.count - 1 };
     *        default:
     *            return state;
     *     }
     * }
     */
    customReducers?: ICustomReducers;
}

/**
 * Wraps a React component to add a redux store
 * @param  WrappedComponent     The component to render
 * @return                      The wrapped component
 */
const withStore = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    /**
     * Wraps a component within a Redux store provider
     * @param  {...any}    options.props        All the props
     * @return {ReactDOMComponent}              The wrapped componet
     */
    function withStore({ onStoreCreated, customReducers, ...props }: IWithStoreProps) {
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
