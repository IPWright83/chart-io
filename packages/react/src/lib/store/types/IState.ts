import type { Store, AnyAction } from "redux";
import type { IChartState } from "./IChartState";
import type { IEventState } from "./IEventState";

export type IStore = Store<IState, AnyAction>;

export interface IState {
  chart: IChartState;
  event: IEventState;
}

export type IDispatch = (action: any) => void;
