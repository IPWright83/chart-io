import { applyMiddleware, combineReducers, createStore as create } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import ReduxThunk from "redux-thunk";

import { chartReducer } from "./chart";
import { eventReducer } from "./event";
import { telemetryReducer } from "./telemetry";

/**
 * Creates a Redux store
 * @param customReducers       A set of additional custom reducers to apply to the store
 * @return                     The redux store object
 */
const createStore = (customReducers = {}) => {
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

export { createStore };
