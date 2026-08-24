import type { IDatum } from "./IData";

// Duplicated from `IState.IDispatch` rather than imported, to avoid `types/` depending on `store/`
type IContextMenuDispatch = (action: any) => void;

/**
 * What a `<ContextMenu>` was opened on - the chart background, or a specific datum (e.g. a bar,
 * a point, a node)
 */
export type IContextMenuTargetType = "background" | "datum";

/**
 * The context a `<ContextMenu>` was opened with, passed through to each item's `onSelect`
 */
export interface IContextMenuContext {
    /** Whether the menu was opened on the chart background or a specific datum */
    type: IContextMenuTargetType;

    /** The datum the menu was opened on, when `type` is `"datum"` */
    datum?: IDatum;
}

/**
 * A single, pluggable action shown as a segment of a `<ContextMenu>`
 */
export interface IContextMenuItem {
    /** A unique identifier for this item */
    id: string;

    /** The label shown in a tooltip when hovering the segment, and used for accessibility */
    label: string;

    /**
     * The icon rendered in the middle of the segment, as raw SVG markup (e.g. `<path d="..."/>`) -
     * sized automatically to fit. See `contextMenuIcons` for a ready-made set
     */
    icon: string;

    /**
     * Renders the segment in a disabled state and prevents it from being selected. Useful for
     * actions that aren't currently applicable (e.g. "Reset zoom" while nothing is zoomed in)
     * rather than removing the item outright, which would reflow the rest of the ring
     * @default false
     */
    disabled?: boolean;

    /**
     * Called when this item is selected (clicked). Receives the store's `dispatch` function so the
     * action can update the store, along with the context the menu was opened with
     * @param  dispatch     The Redux store's dispatch function
     * @param  context      The context the menu was opened with
     */
    onSelect: (dispatch: IContextMenuDispatch, context?: IContextMenuContext) => void;
}
