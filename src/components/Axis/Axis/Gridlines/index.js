import { withSVG } from "../../../../hoc";
import { Gridlines as GridlinesBase } from "./Gridlines";

import { getTickSize } from "./getTickSize";

const Gridlines = withSVG(GridlinesBase, "gridlines");
Gridlines.getTickSize = getTickSize;

export { Gridlines };
