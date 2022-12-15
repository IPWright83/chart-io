import type { IPlotProps } from "./IPlotProps";

/**
 * PropTypes that are common broadly common for Props
 */
export interface IEventPlotProps extends IPlotProps {
    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default `() => {}`
     */
    onMouseOver: (datum: any, element: HTMLElement, event: MouseEvent) => void;

    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default `() => {}`
     */
    onMouseOut: (datum: any, element: HTMLElement, event: MouseEvent) => void;

    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default `() => {}`
     */
    onClick: (datum: any, element: HTMLElement, event: MouseEvent) => void;
}
