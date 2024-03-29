import type { IOnClick, IOnMouseOut, IOnMouseOver } from "./IMouseEvents";
import type { IPlotProps } from "./IPlotProps";

/**
 * PropTypes that are common broadly common for Props
 */
export interface IEventPlotProps extends IPlotProps {
    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default `() => {}`
     */
    onMouseOver?: IOnMouseOver;

    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default `() => {}`
     */
    onMouseOut?: IOnMouseOut;

    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default `() => {}`
     */
    onClick?: IOnClick;
}
