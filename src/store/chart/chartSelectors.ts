import { IData, IMargin, ITheme } from "../../types";
import { IStore, IChartStore, IChartStore_Dimensions, IChartStore_Scales } from "../types";

import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

const chartSelectors = {
    /**
     * Returns the store for the chart part of state
     * @param  state    The application state
     * @return          The state
     */
    store: (state: IStore): IChartStore => state.chart,

    /**
     * Returns the data for the chart
     * @param  state The application state
     * @return       The chart data
     */
    data: (state: IStore): IData => chartSelectors.store(state)?.data || [],

    /**
     * Returns the duration to run animations for
     * @param  state    The application state
     * @return          The duration in milliseconds
     */
    animationDuration: (state: IStore): number => {
        const animationDuration = chartSelectors.store(state)?.animationDuration;
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
     */
    scales: {
        store: (state: IStore): IChartStore_Scales => chartSelectors.store(state).scales || {},

        /**
         * Return a scale based on the orientation
         * @param  state           The application state
         * @param  field           The field to get the scale of
         * @return                 The d3.Scale function
         */
        getScale: (state: IStore, field: string): d3.AxisScale<d3.AxisDomain> => chartSelectors.scales.store(state)[field],
    },

    /**
     * Returns dimension based information for the chart
     */
    dimensions: {
        store: (state: IStore): IChartStore_Dimensions => chartSelectors.store(state)?.dimensions,

        /**
         * Returns the width of the chart
         * @param  state        The application state
         * @return              The width
         */
        width: (state: IStore): number => chartSelectors.dimensions.store(state)?.width || 0,

        /**
         * Returns the height of the chart
         * @param  state        The application state
         * @return              The height
         */
        height: (state: IStore): number => chartSelectors.dimensions.store(state)?.height || 0,

        /**
         * Returns the margin of the chart
         * @param  state         The application state
         * @return               The margin
         */
        margin: (state: IStore): IMargin =>
            chartSelectors.dimensions.store(state)?.margin || {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
    },

    /**
     * Returns the theme for the chart
     * @param {Object} state The application state
     * @return {Object} The theme object
     */
    theme: (state: IStore): ITheme => chartSelectors.store(state).theme,
};

export { chartSelectors };
