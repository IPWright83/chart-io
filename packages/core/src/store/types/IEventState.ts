import type { IColor, ICoordinate, IDropline, IMarker, IMouseEventType, ITooltipItem } from "../../types";

export interface IEventStateMouse {
  x: number;
  y: number;
  mode: IMouseEventType;
}

export interface IEventStateTooltip {
  position?: ICoordinate;
  color?: IColor;
  items: ITooltipItem[];
}

export interface IEventStateContextMenu extends ICoordinate {
  // Arbitrary caller-supplied context describing what the menu was opened on (e.g. a specific
  // datum) - opaque to the store, interpreted by whoever opened the menu
  context?: unknown;
}

export interface IEventState {
  droplines: IDropline[];
  markers: IMarker[];
  mouse?: IEventStateMouse;
  tooltip: IEventStateTooltip;
  // Present (and holding the position/context it was opened with) while a <ContextMenu> is open,
  // absent while closed - the same "undefined means inactive" convention as `mouse`
  contextMenu?: IEventStateContextMenu;
}
