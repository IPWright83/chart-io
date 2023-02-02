import { withSVG } from "../../../hoc";
import { Axis as AxisBase, IAxisProps } from "./Axis";

import { Gridlines } from "./Gridlines";
import { Title } from "./Title";

import { getD3Axis } from "./getD3Axis";
import { getTransform } from "./getTransform";

const Axis = withSVG(AxisBase, "axis");

Axis.getD3Axis = getD3Axis;
Axis.getTransform = getTransform;

export { Axis, Gridlines, Title };
export type { IAxisProps };
