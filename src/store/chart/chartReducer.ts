import { IChartStore } from "../types";
import { IChartAction } from "./types";

import { themes } from "../../themes";

const defaultState = {
    animationDuration: 1000,
    theme: themes.light,
    data: [],
    dimensions: {
        margin: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30,
        },
    },
    scales: {},
};

/**
 * Defines a reducer to handle the chart settings being set
 * @param  state   The current state
 * @param  action  The current action being triggerered
 * @return         The new state
 */
const chartReducer = (state: IChartStore = defaultState, action: IChartAction): IChartStore => {
    switch (action.type) {
        case "CHART.SET_DIMENSIONS":
            return {
                ...state,
                dimensions: {
                    width: action.payload.width,
                    height: action.payload.height,
                    margin: action.payload.margin,
                },
            };

        case "CHART.SET_SCALES":
            return {
                ...state,
                scales: {
                    ...state.scales,
                    ...action.payload.fields.reduce((result, field) => {
                        return { ...result, [field]: action.payload.scale };
                    }, {}),
                },
            };

        case "CHART.SET_ANIMATION_DURATION":
            return {
                ...state,
                animationDuration: action.payload,
            };

        case "CHART.SET_THEME":
            return {
                ...state,
                theme: action.payload,
            };

        case "CHART.SET_DATA":
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export { chartReducer };
