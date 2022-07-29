import { uuidv4 } from "../../utils";

const defaultState = {
    id: uuidv4(),
};

/**
 * Defines a reducer to handle the telemtry information
 * @param  {Object} state   The current state
 * @param  {Object} action  The current action being triggerered
 * @return {Object}         The new state
 */
const telemetryReducer = (state = defaultState, action) => {
    const payload = action.payload || {};

    switch (action.type) {
        case "TELEMETRY.SET_CHART_ANALYTICS":
            return {
                ...state,
                chart: payload,
            };

        case "TELEMETRY.SET_DATA_ANALYTICS":
            return {
                ...state,
                data: payload,
            };

        default:
            return state;
    }
};

export { telemetryReducer };
