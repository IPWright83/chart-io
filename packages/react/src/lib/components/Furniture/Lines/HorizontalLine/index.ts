import { withSVG } from "../../../../hoc";
import { HorizontalLine as HorizontalLineBase, IHorizontalLineProps } from "./HorizontalLine";

export const HorizontalLine = withSVG(HorizontalLineBase, "horizontal-line");

export type { IHorizontalLineProps };
