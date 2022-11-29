import * as d3 from "d3";
import { createSelector } from "reselect";

import type { Data, Margin, Theme } from "../../types";
import type { Store, ChartStore, ChartStoreDimensions, ChartStoreScales } from "../types";
import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];
const EMPTY_MARGIN = { left: 0, right: 0, top: 0, bottom: 0 };

const chartSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: Store): ChartStore => state.chart,

    /**
     * Returns the data for the chart
     * @param  state The application state
     * @return       The chart data
     */
    data: (state: Store): Data => chartSelectors.store(state).data || EMPTY_ARRAY,

    /**
     * Returns the duration to run animations for
     * @param  state The application state
     * @return       The duration in milliseconds
     */
    animationDuration: (state: Store): number => {
        const animationDuration = chartSelectors.store(state).animationDuration;
        const data = chartSelectors.data(state);

        // If we have a large dataset, then we're going to default
        // automatically to no animations
        if (data.length && data.length > PROGRESSIVE_RENDER_THRESHOLD) {
            return 0;
        }

        return animationDuration || 0;
    },

    /**
     * Represents the scales that the chart uses
     * @type {Object}
     */
    scales: {
        store: (state: Store): ChartStoreScales => chartSelectors.store(state).scales,

        /**
         * Return a scale based on the field
         * @param  state           The application state
         * @param  field           The field to get the scale of
         * @return                 The d3.Scale function
         */
        getScale: (state: Store, field: string): d3.AxisScale<d3.AxisDomain> | undefined => {
            const store = chartSelectors.store(state);

            // Manually defined scales take precent
            const scales = store.scales;
            if (scales[field]) {
                return scales[field];
            }

            // Automatic scales generated by axis are the fallback
            const axisScales = store.axisScales;
            if (axisScales[field]) {
                return axisScales[field];
            }

            return undefined;
        },

        /**
         * Return a scale based on the field, preferring an Axis scale
         * @param  state           The application state
         * @param  field           The field to get the scale of
         * @return                 The d3.Scale function
         */
        getAxisScale: (state: Store, field: string): d3.AxisScale<d3.AxisDomain> | undefined => {
            const store = chartSelectors.store(state);

            // Axis scale takes precedent
            const axisScales = store.axisScales || {};
            if (axisScales[field]) {
                return axisScales[field];
            }

            // Manually defined scales take precent
            const scales = store.scales || {};
            if (scales[field]) {
                return scales[field];
            }

            return undefined;
        },
    },

    /**
     * Returns dimension based information for the chart
     */
    dimensions: {
        store: (state: Store): ChartStoreDimensions => chartSelectors.store(state).dimensions,

        /**
         * Returns the width of the chart
         * @param  state The application state
         * @return       The width
         */
        width: (state: Store): number => chartSelectors.dimensions.store(state).width || 0,

        /**
         * Returns the height of the chart
         * @param  state The application state
         * @return       The height
         */
        height: (state: Store): number => chartSelectors.dimensions.store(state).height || 0,

        /**
         * Returns the margin of the chart
         * @param  state The application state
         * @return       The margin
         */
        margin: (state: Store): Margin => chartSelectors.dimensions.store(state).margin || EMPTY_MARGIN,
    },

    /**
     * Returns the theme for the chart
     * @param  state The application state
     * @return The theme object
     */
    theme: (state: Store): Theme => chartSelectors.store(state).theme,
};

/**
 * Returns the margin of the chart
 * @param  {Object} state The application state
 * @return {Object}       The margin
 */
chartSelectors.dimensions.margin = createSelector(chartSelectors.dimensions.store, (dimensions) => {
    return dimensions?.margin || EMPTY_MARGIN;
});

export { chartSelectors };
