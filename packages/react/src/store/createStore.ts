import { applyMiddleware, combineReducers, createStore as create } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import ReduxThunk from "redux-thunk";

import { chartReducer } from "./chart";
import { eventReducer } from "./event";
import { telemetryReducer } from "./telemetry";

/**
 * Creates a Redux store
 * @param {Object} customReducers    A set of additional custom reducers to apply to the store
 * @return {Object} The redux store object
 */
export const createStore = (customReducers = {}) => {
    const reducer = combineReducers({
        ...customReducers,
        chart: chartReducer,
        event: eventReducer,
        telemetry: telemetryReducer,
    });

    const composeEnhancers = composeWithDevTools({});
    const store = create(reducer, composeEnhancers(applyMiddleware(ReduxThunk)));

    return store;
};
