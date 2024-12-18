import type { IPosition } from "./IPosition";

export interface ITitleProps {
    /**
     * The position of the title [top, bottom, left, right]
     */
    position: IPosition;
    /**
     * A title for the Axis
     */
    title?: string;
}
