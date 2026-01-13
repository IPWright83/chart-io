import { Chart as ChartBase, IChartBaseProps, IChartRef } from "./Chart";
import { IWithStoreProps, withStore } from "../../hoc";

export interface IChartProps extends IChartBaseProps, IWithStoreProps {}

const Chart = withStore<IChartProps>(ChartBase);

// istanbul ignore next
export { Chart, ChartBase };
export type { IChartBaseProps, IChartRef };
