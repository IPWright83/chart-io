import { IGridlinesBaseProps } from "@chart-io/core";

import { withSVG } from "../../../../hoc";
import GridlinesBase from "./Gridlines.svelte";

import { getTickSize } from "./getTickSize";

export type IGridlinesProps = Omit<IGridlinesBaseProps, "layer">;

export const Gridlines = withSVG<IGridlinesProps>(GridlinesBase, "gridlines");

// @ts-expect-error: Extending the interface on purpose
Gridlines.getTickSize = getTickSize;
