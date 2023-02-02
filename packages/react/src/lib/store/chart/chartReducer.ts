import { themes } from "../../themes";

import type { ChartAction } from "./types";
import type { IChartState } from "../types";

export const defaultChartState = {
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
    axisScales: {},
};

/**
 * Defines a reducer to handle the chart settings being set
 * @param  state   The current state
 * @param  action  The current action being triggerered
 * @return          The new state
 */
const chartReducer = (state: IChartState = defaultChartState, action: ChartAction): IChartState => {
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
            if (action.payload.fromAxis) {
                return {
                    ...state,
                    axisScales: {
                        ...state.axisScales,
                        ...action.payload.fields.reduce((result, field) => {
                            return { ...result, [field]: action.payload.scale };
                        }, {}),
                    },
                };
            }

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
