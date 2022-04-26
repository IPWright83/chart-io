import { IMarker, IDropline } from "../../types";

import {
    IMouseMoveAction,
    IMouseEnterAction,
    IMouseExitAction,
    IAddDroplineAction,
    IRemoveDroplineAction,
    IAddMarkerAction,
    IRemoveMarkerAction,
} from "./types";

/**
 * Sets the mouse move event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseMove = (mouseEventArgs: MouseEvent): IMouseMoveAction => ({
    type: "EVENT.MOUSE_MOVE",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse enter event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseEnter = (mouseEventArgs: MouseEvent): IMouseEnterAction => ({
    type: "EVENT.MOUSE_ENTER",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse exit event as being active in the store
 * @param  mouseEventArgs  The event arguments from the mouse event
 * @return                 A redux store action
 */
const mouseExit = (mouseEventArgs: MouseEvent): IMouseExitAction => ({
    type: "EVENT.MOUSE_EXIT",
    payload: mouseEventArgs,
});

/**
 * Adds a dropline to the store
 * @param  dropline    The dropline to add
 * @return             A redux store action
 */
const addDropline = (dropline: IDropline): IAddDroplineAction => ({
    type: "EVENT.ADD_DROPLINE",
    payload: dropline,
});

/**
 * Removes a dropline from the store
 * @param  dropline    The dropline to remove
 * @return             A redux store action
 */
const removeDropline = (dropline: IDropline): IRemoveDroplineAction => ({
    type: "EVENT.REMOVE_DROPLINE",
    payload: dropline,
});

/**
 * Adds a marker to the store
 * @param  marker      The marker to add
 * @return             A redux store action
 */
const addMarker = (marker: IMarker): IAddMarkerAction => ({
    type: "EVENT.ADD_MARKER",
    payload: marker,
});

/**
 * Removes a marker from the store
 * @param  marker      The marker to remove
 * @return             A redux store action
 */
const removeMarker = (marker: IMarker): IRemoveMarkerAction => ({
    type: "EVENT.REMOVE_MARKER",
    payload: marker,
});

const eventActions = {
    mouseMove,
    mouseExit,
    mouseEnter,
    addDropline,
    removeDropline,
    addMarker,
    removeMarker,
};

export { eventActions };
