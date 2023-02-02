import type { IChartState } from "./IChartState";
import type { IEventState } from "./IEventState";

export interface IState {
  chart: IChartState;
  event: IEventState;
}

export type IDispatch = (action: any) => void;
