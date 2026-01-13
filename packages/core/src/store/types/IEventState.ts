import type { IColor, ICoordinate, IDropline, IMarker, IMouseEventType, ITooltipItem } from "@chart-io/types";

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

export interface IEventState {
  droplines: IDropline[];
  markers: IMarker[];
  mouse?: IEventStateMouse;
  tooltip: IEventStateTooltip;
}
