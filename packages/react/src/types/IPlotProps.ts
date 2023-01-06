import type { IColor } from "./IColor";

/**
 * PropTypes that are common broadly common for Props
 */
export interface IPlotProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: React.MutableRefObject<Element>;

    /**
     * The key of the field used for the x position
     */
    x: string;

    /**
     * The key of the field used for the y position
     */
    y: string;

    /**
     * The color to use for the points
     */
    color?: IColor;

    /**
     * Should the plot be interactive and be able to trigger markers & tooltips?
     */
    interactive?: boolean;

    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
}
