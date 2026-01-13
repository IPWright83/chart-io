import { IData, IOnClick, IOnMouseOut, IOnMouseOver, IScale, ITheme } from "@chart-io/types";

export interface IRenderProps {
    /**
     * The time in milliseconds to spend animating data transitions
     */
    animationDuration: number;
    /**
     * Should the plot be interactive and be able to trigger markers & tooltips?
     */
    interactive: boolean;
    /**
     * The layer that the chart should be rendering to. Usually an SVGElement or
     * a Faux DOM element
     */
    layer?: Element;
    /**
     * The data for the chart
     */
    data: IData;
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
    /**
     * The theme for the chart
     */
    theme: ITheme;
    /**
     * The key of the field used for the x position
     */
    x: string;
    /**
     * The key of the field used for the y position
     */
    y: string;
    /**
     * The scale to use for the XAxis
     */
    xScale: IScale;
    /**
     * The scale to use for the YAxis
     */
    yScale: IScale;
}
