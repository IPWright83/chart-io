import { withStore } from "../../hoc";
import { Chart as Chart_ } from "./Chart";

const Chart = withStore(Chart_);

export { Chart, Chart_ };
