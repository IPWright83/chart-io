import { memoizeWithArgs } from "proxy-memoize";

import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";
import type { IData, ILegendItem, IMargin, IScale, IScaleMode, ITheme } from "../../types";
import type {
    IChartScaleInfo,
    IChartState,
    IChartStateBrush,
    IChartStateDimensions,
    IChartStateLegend,
    IState,
} from "../types";

const EMPTY_ARRAY = [];
const EMPTY_MARGIN = { left: 0, right: 0, top: 0, bottom: 0 };

interface IChartSelectors {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: IState) => IChartState;

    /**
     * Returns the ID of the chart
     * @param  state The application state
     * @return       The ID
     */
    id: (state: IState) => string;

    /**
     * Returns a clip path ID for the plot area
     * @param  state The application state
     * @return        The clip path ID
     */
    plotClipPath: (state: IState) => string;

    /**
     * Returns the data for the chart
     * @param  state The application state
     * @return       The chart data
     */
    data: (state: IState) => IData;
    /**
     * Returns the duration to run animations for
     * @param  state The application state
     * @return       The duration in milliseconds
     */
    animationDuration: (state: IState) => number;

    /**
     * Represents the scales that the chart uses
     */
    scales: {
        /**
         * Represents the scales portion of the store
         * @param  state     The application state
         * @param  field     The name of the field to get the store for
         * @type {Object}
         */
        store: (state: IState, field: string) => IChartScaleInfo;

        /**
         * General helper for getting a domain for a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the domain for
         * @return           The domain that can be used with the D3 scale for the plot
         */
        domain: (state: IState, field: string) => any;

        /**
         * General helper for getting a zoomed in domain for a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the domain for
         * @return           The domain that can be used with the D3 scale for the plot
         */
        zoomedDomain: (state: IState, field: string) => any;

        /**
         * General helper for getting a range for a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the range for
         * @param  type      Whether we want the range for the plot, axis or brush
         * @return           The range that can be used with the D3 scale for the plot
         */
        range: (state: IState, field: string, type: IScaleMode) => any;

        /**
         * Selector to retrieve a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the range for
         * @param  type      Whether we want a scale for the plot, axis or brush
         * @return           The d3.scale
         */
        getScale: (state: IState, field: string, type: IScaleMode) => IScale;
    };
    /**
     * Returns dimension based information for the chart
     */
    dimensions: {
        /**
         * Represents the dimensions portion of the store
         * @param  state     The application state
         */
        store: (state: IState) => IChartStateDimensions;

        /**
         * Returns the overall width of the chart
         * @param  state The application state
         * @return       The width
         */
        width: (state: IState) => number;

        /**
         * Returns the height of the chart
         * @param  state The application state
         * @return       The height
         */
        height: (state: IState) => number;

        plot: {
            /**
             * Returns the margin of the plot
             * @param  state The application state
             * @return       The margin
             */
            margin: (state: IState) => IMargin;

            /**
             * The width of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The width
             */
            width: (state: IState) => number;

            /**
             * The height of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The height
             */
            height: (state: IState) => number;

            /**
             * The top of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The top
             */
            top: (state: IState) => number;

            /**
             * The bottom of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The bottom
             */
            bottom: (state: IState) => number;

            /**
             * The left of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The left
             */
            left: (state: IState) => number;

            /**
             * The right of the actual plot area, taking margins into account
             * @param  state The application state
             * @return       The right
             */
            right: (state: IState) => number;
        };
    };
    /**
     * Legend information for the chart
     */
    legend: {
        /**
         * Represents the legend portion of the store
         * @param  state     The application state
         */
        store: (state: IState) => IChartStateLegend;

        /**
         * Should the legend be visible?
         * @param  state     The application state
         * @return           True if the legend should be visible
         */
        isVisible: (state: IState) => boolean;

        /**
         * Returns the set of items required to be in the legend
         * @param  state     The application state
         * @return           The items for the legend to render
         */
        items: (state: IState) => ILegendItem[];
    };
    /**
     * Brush information for the chart
     */
    brush: {
        /**
         * Represents the dimensions portion of the store
         * @param  state     The application state
         */
        store: (state: IState) => IChartStateBrush;

        /**
         * Returns the reserved height for the brush
         * @param  state     The application state
         */
        height: (state: IState) => number;
        /**
         * Returns the reserved width for the brush
         * @param  state     The application state
         */
        width: (state: IState) => number;

        /**
         * Returns the margin around the brush
         * @param  state The application state
         * @return       The margin
         */
        margin: (state: IState) => IMargin;

        /**
         * Returns whether the brush is visible or not
         * @param  state The application state
         * @return       True if the brush is visible
         */
        isVisible: (state: IState) => boolean;
    };

    /**
     * Returns the theme for the chart
     * @param  state The application state
     * @return The theme object
     */
    theme: (state: IState) => ITheme;
}

export const chartSelectors: IChartSelectors = {
    // @inheritDoc
    store: (state: IState): IChartState => state.chart,

    // @inheritDoc
    id: (state: IState): string => chartSelectors.store(state).id,

    // @inheritDoc
    data: (state: IState): IData => chartSelectors.store(state).data || EMPTY_ARRAY,

    // @inheritDoc
    plotClipPath: (state: IState): string => `clip-path-${chartSelectors.id(state)}`,

    // @inheritDoc
    animationDuration: (state: IState): number => {
        const animationDuration = chartSelectors.store(state).animationDuration;
        const data = chartSelectors.data(state);

        // If we have a large dataset, then we're going to default
        // automatically to no animations
        if (data.length && data.length > PROGRESSIVE_RENDER_THRESHOLD) {
            return 0;
        }

        return animationDuration || 0;
    },

    // @inheritDoc
    scales: {
        // @inheritDoc
        store: (state: IState, field: string): IChartScaleInfo => chartSelectors.store(state).scales[field],

        // @inheritDoc
        domain: (state: IState, field: string) => chartSelectors.scales.store(state, field).domain,

        // @inheritDoc
        zoomedDomain: (state: IState, field: string) =>
            chartSelectors.scales.store(state, field).zoomedDomain ?? chartSelectors.scales.domain(state, field),

        // @inheritDoc
        range: (state: IState, field: string, type: IScaleMode = "plot") => {
            if (type === "brush") {
                // This allows us to reduce the size of a scale to fit within the brush space
                const range = chartSelectors.scales.store(state, field)?.brush?.range;
                if (range) {
                    return range;
                }
            }

            return chartSelectors.scales.store(state, field).range;
        },

        // @inheritDoc
        getScale: memoizeWithArgs(
            (state: IState, field: string, type: IScaleMode = "plot") => {
                const scale = chartSelectors.scales.store(state, field)?.scale?.copy();
                // prettier-ignore
                if (scale) {
                    switch (type) {
                        case "brush": {
                            const domain = chartSelectors.scales.domain(state, field);
                            const range = chartSelectors.scales.range(state, field, "brush");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        case "plot": {
                            // Prefer scales defined by an axis, but if non avaliable use plot scales
                            // Normally this happens if someone defines a custom <Scale> and <Axis>
                            const domain = chartSelectors.scales.zoomedDomain(state, field);
                            const range = chartSelectors.scales.range(state, field, "plot");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        default:
                            throw new Error(`Unknown scaleMode: ${type}`);
                    }
                }
            },
            { size: 50 }
        ),
    },

    // @inheritDoc
    dimensions: {
        // @inheritDoc
        store: (state) => chartSelectors.store(state).dimensions,

        // @inheritDoc
        width: (state) => chartSelectors.dimensions.store(state).width || 0,

        // @inheritDoc
        height: (state) => chartSelectors.dimensions.store(state).height || 0,

        // @inheritDoc
        plot: {
            // @inheritDoc
            margin: (state) => chartSelectors.dimensions.store(state).plotMargin || EMPTY_MARGIN,

            // @inheritDoc
            left: (state) => chartSelectors.dimensions.plot.margin(state).left,

            // @inheritDoc
            right: (state) => {
                const { left } = chartSelectors.dimensions.plot.margin(state);
                const plotWidth = chartSelectors.dimensions.plot.width(state);
                return plotWidth + left;
            },

            // @inheritDoc
            top: (state) => chartSelectors.dimensions.plot.margin(state).top,

            // @inheritDoc
            bottom: (state) => {
                const plotHeight = chartSelectors.dimensions.plot.height(state);
                const { top } = chartSelectors.dimensions.plot.margin(state);
                return plotHeight + top;
            },

            // @inheritDoc
            width: (state) => {
                const width = chartSelectors.dimensions.width(state);
                const { left, right } = chartSelectors.dimensions.plot.margin(state);
                return Math.max(0, width - left - right);
            },

            // @inheritDoc
            height: (state) => {
                const height = chartSelectors.dimensions.height(state);
                const { top, bottom } = chartSelectors.dimensions.plot.margin(state);
                const calculatedHeight = height - bottom - top;

                if (chartSelectors.brush.isVisible(state)) {
                    const brushHeight = chartSelectors.brush.height(state);
                    const { top, bottom } = chartSelectors.brush.margin(state);

                    return Math.max(0, calculatedHeight - brushHeight - top - bottom);
                }

                return Math.max(0, calculatedHeight);
            },
        },
    },

    // @inheritDoc
    brush: {
        // @inheritDoc
        store: (state) => chartSelectors.store(state).brush,

        // @inheritDoc
        height: (state) => chartSelectors.brush.store(state).height,

        // @inheritDoc
        width: (state) => chartSelectors.brush.store(state).width,

        // @inheritDoc
        margin: (state) => chartSelectors.brush.store(state).margin,

        // @inheritDoc
        isVisible: (state) => chartSelectors.brush.width(state) > 0 || chartSelectors.brush.height(state) > 0,
    },

    // @inheritDoc
    legend: {
        // @inheritDoc
        store: (state) => chartSelectors.store(state).legend,

        // @inheritDoc
        isVisible: (state) => chartSelectors.legend.items(state).length > 1,

        // @inheritDoc
        items: (state) => chartSelectors.legend.store(state).items || EMPTY_ARRAY,
    },

    // @inheritDoc
    theme: (state) => chartSelectors.store(state).theme,
};
