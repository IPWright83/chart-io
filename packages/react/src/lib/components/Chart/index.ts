import { withStore, IWithStoreProps } from "../../hoc";
import { Chart as ChartBase, IChartBaseProps } from "./Chart";
import type { IState } from "../../store";

export interface IChartProps extends IChartBaseProps, IWithStoreProps {}

const Chart = withStore<IChartProps>(ChartBase);

export { Chart, ChartBase };
export type { IChartBaseProps };
