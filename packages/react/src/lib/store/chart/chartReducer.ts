import { isEqual } from "lodash";

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
    legend: {
        items: [],
    },
    brush: {
        ranges: {},
        visible: true,
        height: 100,
        width: 0,
    },
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
            // Optimisation
            if (
                state.dimensions.width === action.payload.width &&
                state.dimensions.height === action.payload.height &&
                state.dimensions.margin.left === action.payload.margin.left &&
                state.dimensions.margin.right === action.payload.margin.right &&
                state.dimensions.margin.top === action.payload.margin.top &&
                state.dimensions.margin.bottom === action.payload.margin.bottom
            ) {
                return state;
            }

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
                    scales: {
                        ...state.scales,
                        ...action.payload.fields.reduce((result, field) => {
                            return {
                                ...result,
                                [field]: {
                                    ...(state.scales[field] ?? {}),
                                    domain: action.payload.scale.domain(),
                                    range: action.payload.scale.range(),
                                    scale: action.payload.scale,
                                },
                            };
                        }, {}),
                    },
                };
            }

            return {
                ...state,
                scales: {
                    ...state.scales,
                    ...action.payload.fields.reduce((result, field) => {
                        return {
                            ...result,
                            [field]: {
                                ...(state.scales[field] ?? {}),
                                scale: action.payload.scale,
                                domain: action.payload.scale.domain(),
                                range: action.payload.scale.range(),
                            },
                        };
                    }, {}),
                },
            };

        case "CHART.SET_BRUSH_RANGE":
            return {
                ...state,
                scales: {
                    ...state.scales,
                    [action.payload.field]: {
                        ...(state.scales[action.payload.field] ?? {
                            scale: undefined,
                            domain: undefined,
                            zoomedDomain: undefined,
                            range: undefined,
                        }),
                        brush: {
                            range: action.payload.range,
                        },
                    },
                },
            };

        case "CHART.SET_SCALE_ZOOM":
            return {
                ...state,
                scales: {
                    ...state.scales,
                    [action.payload.field]: {
                        ...(state.scales[action.payload.field] ?? {
                            scale: undefined,
                            domain: undefined,
                            range: undefined,
                            brush: undefined,
                        }),
                        zoomedDomain: action.payload.domain,
                    },
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

        case "CHART.ADD_LEGEND_ITEM":
            return {
                ...state,
                legend: {
                    ...state.legend,
                    items: [...state.legend.items, action.payload],
                },
            };

        case "CHART.REMOVE_LEGEND_ITEM":
            return {
                ...state,
                legend: {
                    ...state.legend,
                    items: state.legend.items.filter((t) => !isEqual(t, action.payload)),
                },
            };

        default:
            return state;
    }
};

export { chartReducer };
