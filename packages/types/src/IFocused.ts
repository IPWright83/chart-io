import type { IDatum } from "./IData";
import type { IMouseEvent } from "./IMouseEvents";

/**
 * Represents a Focused data point
 */
export interface IFocused {
    /**
     * The element that represents the datum
     */
    element: Element;
    /**
     * The mouse event that triggered the focus
     */
    event: IMouseEvent;
    /**
     * The datum being focused
     */
    datum: IDatum;
}
