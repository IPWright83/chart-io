import { withSVG } from "../../../../hoc";
import { Gridlines as GridlinesBase, IGridlinesBaseProps } from "./Gridlines";

import { getTickSize } from "./getTickSize";

export interface IGridlinesProps extends Omit<IGridlinesBaseProps, "layer"> {}

export const Gridlines = withSVG<IGridlinesProps>(GridlinesBase, "gridlines");

// @ts-expect-error: Extending the interface on purpose
Gridlines.getTickSize = getTickSize;
