import type { IData, ILegendItem, IMargin, IScale, ITheme, IOrientation, IScaleMode } from "@chart-it/types";
import { memoizeWithArgs } from "proxy-memoize";

import type {
    IChartScaleInfo,
    IChartState,
    IChartStateBrush,
    IChartStateDimensions,
    IChartStateLegend,
    IChartStateScales,
    IState,
} from "../types";
import { PROGRESSIVE_RENDER_THRESHOLD } from "../../constants";

const EMPTY_ARRAY = [];
const EMPTY_MARGIN = { left: 0, right: 0, top: 0, bottom: 0 };

// scales: {
//     [key]: {
//         domain,
//         orientation,
//         plot: {
//             domain,
//             range,
//             scale
//         },
//         axis: {
//             scale,
//         },
//         brush: {
//             range,
//             scale
//         },
//     }

interface IChartSelectors {
    /**
     * Returns the store for the chart part of state
     * @param  state The application state
     * @return       The state
     */
    store: (state: IState) => IChartState;
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

        /**
         * Allow getting multiple scales in a single call (to circumvent calling a hook in a loop)
         * @param  state               The application state
         * @param  fields              The set of fields to get the scales of
         * @return                     A mapping from fields to d3.Scale function
         */
        getScales: (state: IState, fields: string[], type: IScaleMode) => Record<string, IScale | undefined>;
    };
    dimensions: {
        store: (state: IState) => IChartStateDimensions;
        width: (state: IState) => number;
        height: (state: IState) => number;
        margin: (state: IState) => IMargin;
    };
    legend: {
        store: (state: IState) => IChartStateLegend;
        isVisible: (state: IState) => boolean;
        items: (state: IState) => ILegendItem[];
    };
    brush: {
        store: (state: IState) => IChartStateBrush;
        isVisible: (state: IState) => boolean;
        getRangeForScale: (state: IState, field: string) => number[] | undefined;
        height: (state: IState) => number;
        width: (state: IState) => number;
    };
    theme: (state: IState) => ITheme;
}

export const chartSelectors: IChartSelectors = {
    // @inheritDoc
    store: (state: IState): IChartState => state.chart,

    // @inheritDoc
    data: (state: IState): IData => chartSelectors.store(state).data || EMPTY_ARRAY,

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
        range: (state: IState, field: string, type: IScaleMode) => {
            if (type === "brush") {
                return chartSelectors.scales.store(state, field)?.brush?.range ?? [];
            }

            return chartSelectors.scales.store(state, field).range;
        },

        // @inheritDoc
        getScale: memoizeWithArgs(
            (state: IState, field: string, type: IScaleMode) => {
                const scale = chartSelectors.scales.store(state, field)?.scale;
                // prettier-ignore
                if (scale) {
                    switch (type) {
                        case "brush": {
                            const domain = chartSelectors.scales.domain(state, field);
                            const range = chartSelectors.scales.range(state, field, "brush");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        case "axis": {
                            // Prefer scales defined by an axis, but if non avaliable use plot scales
                            // Normally this happens if someone defines a custom <Scale> and <Axis>
                            const domain = chartSelectors.scales.zoomedDomain(state, field) ?? chartSelectors.scales.zoomedDomain(state, field);
                            const range = chartSelectors.scales.range(state, field, "axis") ?? chartSelectors.scales.range(state, field, "plot");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        case "plot": {
                            // Prefer custom defined scales for plots, but default to ones automatically
                            // create by an <Axis> if non are avilable
                            const domain = chartSelectors.scales.zoomedDomain(state, field) ?? chartSelectors.scales.zoomedDomain(state, field);
                            const range = chartSelectors.scales.range(state, field, "plot") ?? chartSelectors.scales.range(state, field, "axis");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        default:
                            throw new Error(`Unknown scaleType: ${type}`);
                    }
                }
            },
            { size: 50 }
        ),

        // @inheritDoc
        getScales: (state: IState, fields: string[], type: IScaleMode): Record<string, IScale | undefined> =>
            fields.reduce((result, field) => {
                result[field] = chartSelectors.scales.getScale(state, field, type);
                return result;
            }, {}),
    },

    /**
     * Returns dimension based information for the chart
     */
    dimensions: {
        store: (state: IState): IChartStateDimensions => chartSelectors.store(state).dimensions,

        /**
         * Returns the width of the chart
         * @param  state The application state
         * @return       The width
         */
        width: (state: IState): number =>
            chartSelectors.dimensions.store(state).width - chartSelectors.brush.store(state).width || 0,

        /**
         * Returns the height of the chart
         * @param  state The application state
         * @return       The height
         */
        height: (state: IState): number =>
            chartSelectors.dimensions.store(state).height - chartSelectors.brush.height(state) || 0,

        /**
         * Returns the margin of the chart
         * @param  state The application state
         * @return       The margin
         */
        margin: (state: IState): IMargin => chartSelectors.dimensions.store(state).margin || EMPTY_MARGIN,
    },

    brush: {
        store: (state: IState): IChartStateBrush => chartSelectors.store(state).brush,

        /**
         * Whether the brush is visible or not
         * @param  state The application state
         * @return       True if the brush is visible
         */
        isVisible: (state: IState): boolean => !!chartSelectors.brush.store(state).visible,

        /**
         * Obtain an overriden range for a Brush scale
         * @param  state     The application state
         * @param  field     The field to get the range for
         * @return           The pixel range to use for the scale when brushing
         */
        getRangeForScale: (state: IState, field: string): number[] | undefined =>
            chartSelectors.store(state).brush.ranges[field],

        height: (state: IState): number =>
            chartSelectors.brush.isVisible(state) ? chartSelectors.brush.store(state).height : 0,
        width: (state: IState): number =>
            chartSelectors.brush.isVisible(state) ? chartSelectors.brush.store(state).width : 0,
    },

    /**
     * Returns legend information for the chart
     */
    legend: {
        store: (state: IState): IChartStateLegend => chartSelectors.store(state).legend,

        /**
         * Should the legend be visible?
         * @param  state     The application state
         * @return           True if the legend should be visible
         */
        isVisible: (state: IState): boolean => chartSelectors.legend.items(state).length > 1,

        /**
         * Returns the set of items required to be in the legend
         * @param  state     The application state
         * @return           The items for the legend to render
         */
        items: (state: IState): ILegendItem[] => chartSelectors.legend.store(state).items || EMPTY_ARRAY,
    },

    /**
     * Returns the theme for the chart
     * @param  state The application state
     * @return The theme object
     */
    theme: (state: IState): ITheme => chartSelectors.store(state).theme,
};
