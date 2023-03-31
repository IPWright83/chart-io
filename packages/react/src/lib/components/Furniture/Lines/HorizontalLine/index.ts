import { HorizontalLine as HorizontalLineBase, IHorizontalLineProps } from "./HorizontalLine";
import { withSVG } from "../../../../hoc";

export const HorizontalLine = withSVG(HorizontalLineBase, "horizontal-line");

export type { IHorizontalLineProps };
