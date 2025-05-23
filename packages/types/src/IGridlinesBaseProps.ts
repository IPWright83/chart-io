import type { IPosition } from "./IPosition";
import type { IScale } from "./IScale";

export interface IGridlinesBaseProps {
    /**
     * The position of the axis [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * The D3 scale object used for the axis
     */
    scale: IScale;
    /**
     * Internal parameter - the SVG useRef layer
     */
    layer: any;
    /**
     * https://github.com/d3/d3-axis#axis_ticks
     */
    ticks: any;
    /**
     * https://github.com/d3/d3-axis#axis_tickPadding
     */
    tickPadding: number;
    /**
     * https://github.com/d3/d3-axis#axis_tickValues
     */
    tickValues?: string[];
}
