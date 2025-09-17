import type { IColor } from "@chart-io/core";

export interface ISeriesConfig {
    lines?: {
        /**
         * Custom colors that the series should use instead of the theme
         */
        colors?: IColor[];
        /**
         * Should these series be interactive
         */
        interactive?: boolean;
        /**
         * The set of y fields to use to access the data for each plot
         */
        ys: Array<string>;
    };
    areas?: {
        /**
         * Custom colors that the series should use instead of the theme
         */
        colors?: IColor[];
        /**
         * Should these series be interactive
         */
        interactive?: boolean;
        /**
         * Should the areas be stacked?
         */
        stacked?: boolean;
        /**
         * The set of y fields to use to access the data for each plot
         */
        ys: Array<string>;
    };
    scatters?: {
        /**
         * Custom colors that the series should use instead of the theme
         */
        colors?: IColor[];
        /**
         * Should these series be interactive
         */
        interactive?: boolean;
        /**
         * Override the radius of the points
         */
        radius?: number;
        /**
         * The set of y fields to use to access the data for each plot
         */
        ys: Array<string>;
    };
    columns?: {
        /**
         * Custom colors that the series should use instead of the theme
         */
        colors?: IColor[];
        /**
         * Should these series be interactive
         */
        interactive?: boolean;
        /**
         * Should the columns be stacked?
         */
        stacked?: boolean;
        /**
         * Should the columns be grouped?
         */
        grouped?: boolean;
        /**
         * The set of y fields to use to access the data for each plot
         */
        ys: Array<string>;
    };
    bars?: {
        /**
         * Custom colors that the series should use instead of the theme
         */
        colors?: IColor[];
        /**
         * Should these series be interactive
         */
        interactive?: boolean;
        /**
         * Should the bars be stacked?
         */
        stacked?: boolean;
        /**
         * Should the bars be grouped?
         */
        grouped?: boolean;
        /**
         * The set of x fields to use to access the data for each plot
         */
        xs: Array<string>;
    };
}
