import type { IDatum } from "./IData";

/**
 * Represents a MouseEvent with just the x/y position we care about
 */
export interface IMouseEvent {
    offsetX: number;
    offsetY: number;
}

/**
 * A function that will be triggered whenever the mouse moves over an element for the first time
 */
export type IOnMouseOver = (datum: IDatum, element: Element, event: MouseEvent) => void;

/**
 * A function that will be triggered whenever the mouse moves out an element
 */
export type IOnMouseOut = (datum: IDatum, element: Element, event: MouseEvent) => void;

/**
 * A function that will be triggered whenever the mouse clicks on an element
 */
export type IOnClick = (datum: IDatum, element: Element, event: MouseEvent) => void;
