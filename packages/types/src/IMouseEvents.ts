/**
 * A function that will be triggered whenever the mouse moves over an element for the first time
 */
export type IOnMouseOver = (datum: any, element: Element, event: MouseEvent) => void;

/**
 * A function that will be triggered whenever the mouse moves out an element
 */
export type IOnMouseOut = (datum: any, element: Element, event: MouseEvent) => void;

/**
 * A function that will be triggered whenever the mouse clicks on an element
 */
export type IOnClick = (datum: any, element: Element, event: MouseEvent) => void;
