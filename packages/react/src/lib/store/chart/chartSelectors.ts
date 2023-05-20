import { memoizeWithArgs } from "proxy-memoize";
import type { IData, ILegendItem, IMargin, IScale, ITheme, IOrientation } from "@chart-it/types";

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

type IScaleType = "plot" | "axis" | "brush";

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
         * @param  type      Whether we want the domain for the plot, axis or brush
         * @return           The domain that can be used with the D3 scale for the plot
         */
        domain: (state: IState, field: string, type: IScaleType) => any;

        /**
         * General helper for getting a range for a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the range for
         * @param  type      Whether we want the range for the plot, axis or brush
         * @return           The range that can be used with the D3 scale for the plot
         */
        range: (state: IState, field: string, type: IScaleType) => any;

        /**
         * Selector to retrieve a scale
         * @param  state     The application state
         * @param  field     The name of the field to get the range for
         * @param  type      Whether we want a scale for the plot, axis or brush
         * @return           The d3.scale
         */
        getScale: (state: IState, field: string, type: IScaleType) => IScale;

        // /**
        //  * Returns the orientation of a particular scale
        //  * @return           The orientation of the scale
        //  */
        // orientation: (state: IState, field: string) => IOrientation;

        /**
         * Represents scale information for plots
         */
        plot: {
            /**
             * Returns the domain for the plot. This may be a restricted domain
             * due to a chart being zoomed in. It will be a D3 scale which could be one of
             * a number of types such as `number[]` or `date[]` or Domain[]
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The domain that can be used with the D3 scale for the plot
             */
            domain: (state: IState, field: string) => any;
            /**
             * Returns the range for the scale.
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The range that can be used with the D3 scale
             */
            range: (state: IState, field: string) => any;
            /**
             * The scale to be used for plots. This will take zooming into account
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           A D3 scale function
             */
            scale: (state: IState, field: string) => IScale | undefined;
        };
        axis: {
            /**
             * Returns the domain for the axis. This may be a restricted domain
             * due to a chart being zoomed in. It will be a D3 scale which could be one of
             * a number of types such as `number[]` or `date[]` or Domain[]
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The domain that can be used with the D3 scale for the plot
             */
            domain: (state: IState, field: string) => any;
            /**
             * Returns the range for the scale.
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The range that can be used with the D3 scale
             */
            range: (state: IState, field: string) => any;
            /**
             * The scale to be used for the axis (may contain custom formatting)
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           A D3 scale function
             */
            scale: (state: IState, field: string) => IScale | undefined;
        };
        brush: {
            /**
             * Returns the domain for the brush. This may be a restricted domain
             * due to a chart being zoomed in. It will be a D3 scale which could be one of
             * a number of types such as `number[]` or `date[]` or Domain[]
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The domain that can be used with the D3 scale for the plot
             */
            domain: (state: IState, field: string) => any;
            /**
             * Returns the range for a brush scale. Typcailly this will be reduced
             * in size to fit into a smaller space
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           The range that can be used with the D3 scale
             */
            range: (state: IState, field: string) => any;
            /**
             * The scale to be used for plots
             * @param  state     The application state
             * @param  field     The name of the field to get the domain for
             * @return           A D3 scale function
             */
            scale: (state: IState, field: string) => IScale | undefined;
        };

        // getScales: (state: IState, fields: string[]) => Record<string, IScale | undefined>;
        // getScale: (state: IState, field: string, useBrushScale: boolean) => IScale | undefined;
        // getAxisScale: (state: IState, field: string) => IScale | undefined;
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
        domain: (state: IState, field: string, type: IScaleType) => {
            const scaleInfo = chartSelectors.scales.store(state, field);
            const { domain, zoomedDomain } = scaleInfo?.[type] ?? {};

            return zoomedDomain ?? domain;
        },

        // @inheritDoc
        range: (state: IState, field: string, type: IScaleType) => {
            const scaleInfo = chartSelectors.scales.store(state, field);
            const { range } = scaleInfo?.[type] ?? {};

            return range;
        },

        // @inheritDoc
        getScale: memoizeWithArgs(
            (state: IState, field: string, type: IScaleType) => {
                const scale = chartSelectors.scales.store(state, field)?.scale;
                // prettier-ignore
                if (scale) {
                    switch (type) {
                        case "brush": {
                            const domain = chartSelectors.scales.domain(state, field, "brush");
                            const range = chartSelectors.scales.range(state, field, "brush");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        case "axis": {
                            // Prefer scales defined by an axis, but if non avaliable use plot scales
                            // Normally this happens if someone defines a custom <Scale> and <Axis>
                            const domain = chartSelectors.scales.domain(state, field, "axis") ?? chartSelectors.scales.domain(state, field, "plot");
                            const range = chartSelectors.scales.range(state, field, "axis") ?? chartSelectors.scales.range(state, field, "plot");
                            return (scale.domain(domain) as IScale).range(range) as IScale;
                        }

                        case "plot": {
                            // Prefer custom defined scales for plots, but default to ones automatically
                            // create by an <Axis> if non are avilable
                            const domain = chartSelectors.scales.domain(state, field, "plot") ?? chartSelectors.scales.domain(state, field, "axis");
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

        // // @inheritDoc
        // orientation: (state: IState, field: string) => chartSelectors.scales.store(state, field)?.orientation,

        // @inheritDoc
        plot: {
            // @inheritDoc
            domain: (state: IState, field: string) => chartSelectors.scales.domain(state, field, "plot"),

            // @inheritDoc
            range: (state: IState, field: string) => chartSelectors.scales.range(state, field, "plot"),

            // @inheritDoc
            // prettier-ignore
            scale: memoizeWithArgs((state: IState, field: string) => {
                console.log("Getting scale", field);
                const scale = chartSelectors.scales.store(state, field)?.scale;
                //const { scale } = chartSelectors.scales.store(state, field);
                if (scale) {
                    const domain = chartSelectors.scales.plot.domain(state, field) ?? chartSelectors.scales.axis.domain(state, field);
                    const range = chartSelectors.scales.plot.range(state, field) ?? chartSelectors.scales.axis.range(state, field);

                    return (scale.domain(domain) as IScale).range(range) as IScale;
                }
            }, { size: 50 }),
        },

        // @inheritDoc
        axis: {
            // @inheritDoc
            domain: (state: IState, field: string) => chartSelectors.scales.domain(state, field, "axis"),

            // @inheritDoc
            range: (state: IState, field: string) => chartSelectors.scales.range(state, field, "axis"),

            // @inheritDoc
            // prettier-ignore
            scale: memoizeWithArgs((state: IState, field: string) => {
                const scale = chartSelectors.scales.store(state, field)?.scale;
                if (scale) {
                    // Return any scales configured by an axis first
                    const domain = chartSelectors.scales.axis.domain(state, field) ?? chartSelectors.scales.plot.domain(state, field);
                    const range = chartSelectors.scales.axis.range(state, field) ?? chartSelectors.scales.plot.range(state, field);

                    return (scale.domain(domain) as IScale).range(range) as IScale;
                }
            }, { size: 50 }),
        },

        // @inheritDoc
        brush: {
            // @inheritDoc
            domain: (state: IState, field: string) => chartSelectors.scales.domain(state, field, "brush"),

            // @inheritDoc
            range: (state: IState, field: string) => chartSelectors.scales.range(state, field, "brush"),

            // @inheritDoc
            scale: memoizeWithArgs(
                (state: IState, field: string) => {
                    const scale = chartSelectors.scales.store(state, field)?.scale;
                    if (scale) {
                        const domain = chartSelectors.scales.brush.domain(state, field);
                        const range = chartSelectors.scales.brush.range(state, field);

                        return (scale.domain(domain) as IScale).range(range) as IScale;
                    }
                },
                { size: 50 }
            ),
        },

        /**
         * Allow getting multiple scales in a single call (to circumvent calling a hook in a loop)
         * @param  state               The application state
         * @param  fields              The set of fields to get the scales of
         * @return                     A mapping from fields to d3.Scale function
         */
        getScales: (state: IState, fields: string[]): Record<string, IScale | undefined> =>
            fields.reduce((result, field) => {
                result[field] = chartSelectors.scales.getScale(state, field, false);
                return result;
            }, {}),

        /**
         * Return a scale based on the field
         * @param  state               The application state
         * @param  field               The field to get the scale of
         * @param  useBrushScale       Should a brush scale be preferred?
         * @return                     The d3.Scale function
         */

        // This needs memoising as it's causing an infinite render loop

        // getScale: memoizeWithArgs((state: IState, field: string, useBrushScale: boolean): IScale | undefined => {
        //     //const store = chartSelectors.store(state);

        //     const store = state.chart;

        //     // When dealing with brushing, we render smaller versions of the
        //     // plots. To do this we need to use special scales created by
        //     // the brushes. So any plot within a brush should be preferring
        //     // a brush scale.
        //     //
        //     // We expect one scale to be smaller due to the brushes compact
        //     // nature, while the other scale we expect the range[] to remain
        //     // static even when zooming
        //     if (useBrushScale) {
        //         const brushRange = chartSelectors.brush.getRangeForScale(state, field);
        //         if (brushRange) {
        //             // Now go get the original scale and create a clone of it
        //             const scale = chartSelectors.scales.getScale(state, field, false);
        //             if (scale) {
        //                 return scale.copy().range(brushRange) as IScale;
        //             }
        //         }
        //     }

        //     // Manually defined scales take precent
        //     const scales = store.scales || {};
        //     if (scales[field]) {
        //         return scales[field];
        //     }

        //     // Automatic scales generated by axis are the fallback
        //     const axisScales = store.axisScales || {};
        //     if (axisScales[field]) {
        //         return axisScales[field];
        //     }

        //     return undefined;
        // }),

        /**
         * Return a scale based on the field, preferring an Axis scale
         * @param  state           The application state
         * @param  field           The field to get the scale of
         * @return                 The d3.Scale function
         */
        getAxisScale: (state: IState, field: string): IScale | undefined => {
            const store = chartSelectors.store(state);

            // Axis scale takes precedent
            const axisScales = store.axisScales || {};
            if (axisScales[field]) {
                return axisScales[field];
            }

            // Manually defined scales
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

        // plot: {
        //     /**
        //      * Returns the width of the plot area of the chart
        //      * @param  state The application state
        //      * @return       The width
        //      */
        //     width: (state: IState): number => chartSelectors.dimensions.store(state).width || 0,

        //     /**
        //      * Returns the height of the plot area of the chart
        //      * @param  state The application state
        //      * @return       The height
        //      */
        //     height: (state: IState): number => chartSelectors.dimensions.store(state).height || 0,
        // },

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
