import type { Marker, Dropline, Color, TooltipItem, SimpleMouseEvent } from "../../types";

import {
    MouseMoveAction,
    MouseEnterAction,
    MouseExitAction,
    AddDroplineAction,
    RemoveDroplineAction,
    AddMarkerAction,
    RemoveMarkerAction,
    SetTooltipBorderColorAction,
    AddTooltipItemAction,
    RemoveTooltipItemAction,
    SetTooltipPositionAction,
} from "./types";

/**
 * Sets the mouse move event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseMove = (mouseEventArgs: SimpleMouseEvent): MouseMoveAction => ({
    type: "EVENT.MOUSE_MOVE",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse enter event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseEnter = (mouseEventArgs: SimpleMouseEvent): MouseEnterAction => ({
    type: "EVENT.MOUSE_ENTER",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse exit event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseExit = (mouseEventArgs: SimpleMouseEvent): MouseExitAction => ({
    type: "EVENT.MOUSE_EXIT",
    payload: mouseEventArgs,
});

/**
 * Adds a dropline to the store
 * @param  dropline    The dropline to add
 * @return             A redux store action
 */
const addDropline = (dropline: Dropline): AddDroplineAction => ({
    type: "EVENT.ADD_DROPLINE",
    payload: dropline,
});

/**
 * Removes a dropline from the store
 * @param  dropline    The dropline to remove
 * @return             A redux store action
 */
const removeDropline = (dropline: Dropline): RemoveDroplineAction => ({
    type: "EVENT.REMOVE_DROPLINE",
    payload: dropline,
});

/**
 * Adds a marker to the store
 * @param  marker      The marker to add
 * @return             A redux store action
 */
const addMarker = (marker: Marker): AddMarkerAction => ({
    type: "EVENT.ADD_MARKER",
    payload: marker,
});

/**
 * Removes a marker from the store
 * @param  marker      The marker to remove
 * @return             A redux store action
 */
const removeMarker = (marker: Marker): RemoveMarkerAction => ({
    type: "EVENT.REMOVE_MARKER",
    payload: marker,
});

/**
 * Sets the color of the tooltip border
 * @param {String} color        The hex color to use for the tooltip border
 * @return {Object}             A redux store action
 */
const setTooltipBorderColor = (color: Color): SetTooltipBorderColorAction => ({
    type: "EVENT.SET_TOOLTIP_COLOR",
    payload: color,
});

/**
 * Adds a tooltip item to the list of entries the tooltip should display
 * @param  {Object} tooltipItem     The tooltip item to add
 * @return {Object}                 A redux store action
 */
const addTooltipItem = (tooltipItem: TooltipItem): AddTooltipItemAction => ({
    type: "EVENT.ADD_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Removes a tooltip item to the list of entries the tooltip should display
 * @param  {Object} tooltipItem     The tooltip item to add
 * @return {Object}                 A redux store action
 */
const removeTooltipItem = (tooltipItem: TooltipItem): RemoveTooltipItemAction => ({
    type: "EVENT.REMOVE_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Updates the position of the tooltip based on the given mouse event
 * @param {Number} x        The mouse x location
 * @param {Number} y        The mouse y location
 * @return {Object}         A redux store action
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
