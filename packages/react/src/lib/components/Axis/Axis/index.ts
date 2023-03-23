import { Axis as AxisBase, IAxisProps } from "./Axis";
import { withSVG } from "../../../hoc";

import { Gridlines } from "./Gridlines";
import { Title } from "./Title";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";

const Axis = withSVG(AxisBase, "axis");

// @ts-expect-error: Extending the interface on purpose
Axis.getD3Axis = getD3Axis;

// @ts-expect-error: Extending the interface on purpose
Axis.getTransform = getTransform;

export { Axis, Gridlines, Title };
export type { IAxisProps };
