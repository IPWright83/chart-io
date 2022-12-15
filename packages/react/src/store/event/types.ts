import type { IMarker, IDropline, IColor, ITooltipItem, ICoordinate, ISimpleMouseEvent } from "../../types";

export interface MouseMoveAction {
  type: "EVENT.MOUSE_MOVE";
  payload: ISimpleMouseEvent;
}

export interface MouseEnterAction {
  type: "EVENT.MOUSE_ENTER";
  payload: ISimpleMouseEvent;
}

export interface MouseExitAction {
  type: "EVENT.MOUSE_EXIT";
  payload: ISimpleMouseEvent;
}

export interface AddDroplineAction {
  type: "EVENT.ADD_DROPLINE";
  payload: IDropline;
}

export interface RemoveDroplineAction {
  type: "EVENT.REMOVE_DROPLINE";
  payload: IDropline;
}

export interface AddMarkerAction {
  type: "EVENT.ADD_MARKER";
  payload: IMarker;
}

export interface RemoveMarkerAction {
  type: "EVENT.REMOVE_MARKER";
  payload: IMarker;
}

export interface SetTooltipBorderColorAction {
  type: "EVENT.SET_TOOLTIP_COLOR";
  payload: IColor | undefined;
}

export interface AddTooltipItemAction {
  type: "EVENT.ADD_TOOLTIP_ITEM";
  payload: ITooltipItem;
}

export interface RemoveTooltipItemAction {
  type: "EVENT.REMOVE_TOOLTIP_ITEM";
  payload: ITooltipItem;
}

export interface SetTooltipPositionAction {
  type: "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT";
  payload: ICoordinate;
}

export type EventAction =
  | MouseMoveAction
  | MouseEnterAction
  | MouseExitAction
  | AddDroplineAction
  | RemoveDroplineAction
  | AddMarkerAction
  | RemoveMarkerAction
  | SetTooltipBorderColorAction
  | AddTooltipItemAction
  | RemoveTooltipItemAction
  | SetTooltipPositionAction;
