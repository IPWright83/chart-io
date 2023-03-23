import { Chart as ChartBase, IChartBaseProps } from "./Chart";
import { IWithStoreProps, withStore } from "../../hoc";

export interface IChartProps extends IChartBaseProps, IWithStoreProps {}

const Chart = withStore<IChartProps>(ChartBase);

export { Chart, ChartBase };
export type { IChartBaseProps };
