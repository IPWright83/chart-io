import { withTheme, withStore } from "../../hoc";
import { Chart as Chart_ } from "./Chart";

const Chart = withTheme(withStore(Chart_));

export { Chart, Chart_ };
