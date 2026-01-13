import type { IColor } from "./IColor";
import type { IScaleMode } from "./IScaleMode";

/**
 * PropTypes that are common broadly common for Props
 */
export interface IPlotProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
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
     * Should we supress clipping for this plot.
     */
    noClip?: boolean;

    /**
     * The color to use for the points
     */
    color?: IColor;

    /**
     * Should the plot be interactive and be able to trigger markers & tooltips?
     */
    interactive?: boolean;

    /**
     * Should this series feature in the Legend?
     */
    showInLegend?: boolean;

    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;

    /**
     * An internal setting, to prefer using a brush scale. This is set automatically
     * on cloned plots by the <Brush /> components. You should not need to use it directly
     */
    scaleMode?: IScaleMode;
}
