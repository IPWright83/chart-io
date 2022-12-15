import type { IColor } from "./IColor";

/**
 * PropTypes that are common broadly common for Props
 * @type {Object}
 */
export interface IPlotsProps {
    /**
     * The key of the field used for the x position
     */
    x: string;

    /**
     * The set of y fields to use to access the data for each plot
     */
    ys: Array<string>;

    /**
     * The set of colors to use for the different plot
     */
    colors?: Array<IColor>;

    /**
     * Should the plot be interactive and be able to trigger markers & tooltips?
     */
    interactive?: boolean;

    /**
     * Should this plot use an HTML Canvas instead of SVG?
     */
    useCanvas?: boolean;
}
