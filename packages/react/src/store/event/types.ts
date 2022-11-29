import { Marker, Dropline, Color, TooltipItem, Coordinate } from "../../types";

export interface MouseMoveAction {
  type: "EVENT.MOUSE_MOVE";
  payload: MouseEvent;
}

export interface MouseEnterAction {
  type: "EVENT.MOUSE_ENTER";
  payload: MouseEvent;
}

export interface MouseExitAction {
  type: "EVENT.MOUSE_EXIT";
  payload: MouseEvent;
}

export interface AddDroplineAction {
  type: "EVENT.ADD_DROPLINE";
  payload: Dropline;
}

export interface RemoveDroplineAction {
  type: "EVENT.REMOVE_DROPLINE";
  payload: Dropline;
}

export interface AddMarkerAction {
  type: "EVENT.ADD_MARKER";
  payload: Marker;
}

export interface RemoveMarkerAction {
  type: "EVENT.REMOVE_MARKER";
  payload: Marker;
}

export interface SetTooltipBorderColorAction {
  type: "EVENT.SET_TOOLTIP_COLOR";
  payload: Color;
}

export interface AddTooltipItemAction {
  type: "EVENT.ADD_TOOLTIP_ITEM";
  payload: TooltipItem;
}

export interface RemoveTooltipItemAction {
  type: "EVENT.REMOVE_TOOLTIP_ITEM";
  payload: TooltipItem;
}

export interface SetTooltipPositionAction {
  type: "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT";
  payload: Coordinate;
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
