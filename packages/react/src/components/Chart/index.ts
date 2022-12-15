import { withStore } from "../../hoc";
import { Chart as ChartBase } from "./Chart";

const Chart = withStore(ChartBase);

export { Chart, ChartBase };
