import type { IData, ILegendItem, IMargin, IScale, ITheme } from "@Types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

import { themes } from "../../themes";

import type { IChartState } from "../types";
import { validateMargin } from "./validateMargin";

export const defaultChartState = {
    id: "",
    animationDuration: 1000,
    theme: themes.light,
    data: [],
    dimensions: {
        plotMargin: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30,
        },
    },
    /**
     * Scales has the following shape when populated
     * scales: {
     *     [key]: {
     *         scale,
     *         domain,
     *         zoomedDomain,
     *         range,
     *         brush: {
     *             range,
     *         }
     *     }
     * }
     */
    scales: {},
    legend: {
        items: [],
    },
    brush: {
        height: 0,
        width: 0,
    },
};

const chartSlice = createSlice({
    name: "chart",
    initialState: defaultChartState,
    reducers: {
        /**
         * Sets the dimensions of the chart in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing chart dimension information
         * @param action.payload.width       The width of the chart
         * @param action.payload.height      The height of the chart
         * @param action.payload.plotMargin  The margin for the plot
         */
        setDimensions: (state: IChartState, action: PayloadAction<{
            width: number,
            height: number,
            margin: IMargin,
        }>) => {
            if (!validateMargin(action.payload.margin)) {
                return;
            }

            // Optimisation
            if (
                state.dimensions.width === action.payload.width &&
                state.dimensions.height === action.payload.height &&
                state.dimensions.plotMargin.left === action.payload.margin.left &&
                state.dimensions.plotMargin.right === action.payload.margin.right &&
                state.dimensions.plotMargin.top === action.payload.margin.top &&
                state.dimensions.plotMargin.bottom === action.payload.margin.bottom
            ) {
                return;
            }

            state.dimensions.width = action.payload.width;
            state.dimensions.height = action.payload.height;
            state.dimensions.plotMargin = action.payload.margin;
        },
        /**
         * Sets the margin that should be applied to the brush in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing brush dimension information
         * @param action.payload.width       The width of the brush
         * @param action.payload.height      The height of the brush
         * @param action.payload.plotMargin  The margin for the brush
         */
        setBrushDimensions: (state: IChartState, action: PayloadAction<{
            width: number,
            height: number,
            margin: IMargin,
        }>) => {
            if (!validateMargin(action.payload.margin)) {
                return;
            }

            state.brush.width = action.payload.width;
            state.brush.height = action.payload.height;
            state.brush.margin = action.payload.margin;
        },

        /**
         * Sets the scale for this field in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing brush dimension information
         * @param action.payload.fields      The keys of the fields that should use the given scale
         * @param action.payload.scale       The scale that should be used for the fields
         */
        setScales: (state: IChartState, action: PayloadAction<{
            fields: string[],
            scale: IScale
        }>) => {
            if (!action.payload.scale) return;

            for (const field of action.payload.fields) {
                state.scales[field] = {
                    domain: action.payload.scale.domain(),
                    range: action.payload.scale.range(),
                    scale: action.payload.scale,
                }
            }
        },

        /**
         * Creates a range to use for Scales with a Brush enabled in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing brush range information
         * @param action.payload.field       The names of the field to set the scale for
         * @param action.payload.range       The new range to use for this scale
         */
        setBrushRange: (state: IChartState, action: PayloadAction<{ field: string, range: number[] }>) => {
            state.scales[action.payload.field] = state.scales[action.payload.field] ?? {
                scale: undefined,
                domain: undefined,
                zoomedDomain: undefined,
                range: undefined,
            };

            state.scales[action.payload.field].brush = {
                range: action.payload.range,
            }
        },

        /**
         * Zooms a particular scale to the given domain
         * @param state                      The current Redux store state
         * @param action                     The payload containing the zoom information
         * @param action.payload.field       The names of the field to zoom the scale for
         * @param action.payload.domain      The new domain for the scale
         */
        setScaleZoom: (state: IChartState, action: PayloadAction<{ field: string, domain: number[] | Date[] }>) => {
            if (!state.scales[action.payload.field]) {
                state.scales[action.payload.field] = {
                    scale: undefined,
                    domain: undefined,
                    zoomedDomain: undefined,
                    range: undefined,
                };
            }

            state.scales[action.payload.field].zoomedDomain = action.payload.domain;
        },

        /**
         * Sets a unique ID for the chart in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing the chart id information
         */
        setChartID: (state: IChartState, action: PayloadAction<string>) => {
            state.id = action.payload;
        },

        /**
         * Sets the duration for animations in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing the duration in miliseconds
         */
        setAnimationDuration: (state: IChartState, action: PayloadAction<number>) => {
            state.animationDuration = action.payload;
        },

        /**
         * Sets the data for the chart in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing the data for the chart
         */
        setChartData: (state: IChartState, action: PayloadAction<IData>) => {
            state.data = action.payload;
        },

        /**
         * Adds a Legend item to the chart
         * @param state                      The current Redux store state
         * @param action                     The payload containing the legend item
         */
        addLegendItem: (state: IChartState, action: PayloadAction<ILegendItem>) => {
            state.legend.items.push(action.payload);
        },

        /**
         * Removes a Legend item from the chart
         * @param state                      The current Redux store state
         * @param action                     The payload containing the legend item
         */
        removeLegendItem: (state: IChartState, action: PayloadAction<ILegendItem>) => {
            state.legend.items = state.legend.items.filter((t) => !isEqual(t, action.payload));
        },

        /**
         * Sets the theme for the chart in the Redux store
         * @param state                      The current Redux store state
         * @param action                     The payload containing the theme
         */
        setTheme: (state: IChartState, action: PayloadAction<ITheme | "light" | "dark">) => {
            if (action.payload === "light") {
                state.theme = themes.light;
            } else if (action.payload === "dark") {
                state.theme = themes.dark;
            } else {
                state.theme = action.payload;
            }
        },
    },
});


const chartActions = chartSlice.actions;

export { chartActions, chartSlice };
