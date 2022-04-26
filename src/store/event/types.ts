import { IMarker, IDropline } from "../../types";

export interface IMouseMoveAction {
  type: "EVENT.MOUSE_MOVE";
  payload: MouseEvent;
}

export interface IMouseEnterAction {
  type: "EVENT.MOUSE_ENTER";
  payload: MouseEvent;
}

export interface IMouseExitAction {
  type: "EVENT.MOUSE_EXIT";
  payload: MouseEvent;
}

export interface IAddDroplineAction {
  type: "EVENT.ADD_DROPLINE";
  payload: IDropline;
}

export interface IRemoveDroplineAction {
  type: "EVENT.REMOVE_DROPLINE";
  payload: IDropline;
}

export interface IAddMarkerAction {
  type: "EVENT.ADD_MARKER";
  payload: IMarker;
}

export interface IRemoveMarkerAction {
  type: "EVENT.REMOVE_MARKER";
  payload: IMarker;
}

export type IEventAction =
  | IMouseMoveAction
  | IMouseEnterAction
  | IMouseExitAction
  | IAddDroplineAction
  | IRemoveDroplineAction
  | IAddMarkerAction
  | IRemoveMarkerAction;
