import type { IColor, IDropline, IMarker, IMouseEvent, ITooltipItem } from "@chart-io/types";

import type {
    AddDroplineAction,
    AddMarkerAction,
    AddTooltipItemAction,
    MouseEnterAction,
    MouseExitAction,
    MouseMoveAction,
    RemoveDroplineAction,
    RemoveMarkerAction,
    RemoveTooltipItemAction,
    SetTooltipBorderColorAction,
    SetTooltipPositionAction,
} from "./types";

/**
 * Sets the mouse move event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseMove = (mouseEventArgs: IMouseEvent): MouseMoveAction => ({
    type: "EVENT.MOUSE_MOVE",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse enter event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseEnter = (mouseEventArgs: IMouseEvent): MouseEnterAction => ({
    type: "EVENT.MOUSE_ENTER",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse exit event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseExit = (mouseEventArgs: IMouseEvent): MouseExitAction => ({
    type: "EVENT.MOUSE_EXIT",
    payload: mouseEventArgs,
});

/**
 * Adds a dropline to the store
 * @param  dropline    The dropline to add
 * @return             A redux store action
 */
const addDropline = (dropline: IDropline): AddDroplineAction => ({
    type: "EVENT.ADD_DROPLINE",
    payload: dropline,
});

/**
 * Removes a dropline from the store
 * @param  dropline    The dropline to remove
 * @return             A redux store action
 */
const removeDropline = (dropline: IDropline): RemoveDroplineAction => ({
    type: "EVENT.REMOVE_DROPLINE",
    payload: dropline,
});

/**
 * Adds a marker to the store
 * @param  marker      The marker to add
 * @return             A redux store action
 */
const addMarker = (marker: IMarker): AddMarkerAction => ({
    type: "EVENT.ADD_MARKER",
    payload: marker,
});

/**
 * Removes a marker from the store
 * @param  marker      The marker to remove
 * @return             A redux store action
 */
const removeMarker = (marker: IMarker): RemoveMarkerAction => ({
    type: "EVENT.REMOVE_MARKER",
    payload: marker,
});

/**
 * Sets the color of the tooltip border
 * @param  color        The hex color to use for the tooltip border
 * @return              A redux store action
 */
const setTooltipBorderColor = (color: IColor | undefined): SetTooltipBorderColorAction => ({
    type: "EVENT.SET_TOOLTIP_COLOR",
    payload: color,
});

/**
 * Adds a tooltip item to the list of entries the tooltip should display
 * @param  tooltipItem     The tooltip item to add
 * @return                 A redux store action
 */
const addTooltipItem = (tooltipItem: ITooltipItem): AddTooltipItemAction => ({
    type: "EVENT.ADD_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Removes a tooltip item to the list of entries the tooltip should display
 * @param  tooltipItem     The tooltip item to add
 * @return                 A redux store action
 */
const removeTooltipItem = (tooltipItem: ITooltipItem): RemoveTooltipItemAction => ({
    type: "EVENT.REMOVE_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Updates the position of the tooltip based on the given mouse event
 * @param  x        The mouse x location
 * @param  y        The mouse y location
 * @return          A redux store action
 */
const setPositionEvent = (x: number, y: number): SetTooltipPositionAction => ({
    type: "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
    payload: { x, y },
});

const eventActions = {
    mouseMove,
    mouseExit,
    mouseEnter,
    addDropline,
    removeDropline,
    addMarker,
    removeMarker,
    setTooltipBorderColor,
    addTooltipItem,
    removeTooltipItem,
    setPositionEvent,
};

export { eventActions };
