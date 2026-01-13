import { themes } from "../../themes";

const defaultState = {
    animationDuration: 1000,
    theme: themes.light,
};

/**
 * Defines a reducer to handle the chart settings being set
 * @param  {Object} state   The current state
 * @param  {Object} action  The current action being triggerered
 * @return {Object}         The new state
 */
const chartReducer = (state = defaultState, action) => {
    const payload = action.payload || {};

    switch (action.type) {
        case "CHART.SET_DIMENSIONS":
            return {
                ...state,
                dimensions: {
                    width: payload.width,
                    height: payload.height,
                    margin: payload.margin,
                },
            };

        case "CHART.SET_SCALES":
            if (payload.fromAxis) {
                return {
                    ...state,
                    axisScales: {
                        ...state.axisScales,
                        ...payload.fields.reduce((result, field) => {
                            return { ...result, [field]: payload.scale };
                        }, {}),
                    }
                }
            }
            
            return {
                ...state,
                scales: {
                    ...state.scales,
                    ...payload.fields.reduce((result, field) => {
                        return { ...result, [field]: payload.scale };
                    }, {}),
                },
            };

        case "CHART.SET_ANIMATION_DURATION":
            return {
                ...state,
                animationDuration: payload,
            };

        case "CHART.SET_THEME":
            return {
                ...state,
                theme: payload,
            };

        case "CHART.SET_DATA":
            return { ...state, data: payload };

        default:
            return state;
    }
};

export { chartReducer };
