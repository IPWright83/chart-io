import { withSVG } from "../../../../hoc";
import { VerticalLine as VerticalLineBase, IVerticalLineProps } from "./VerticalLine";

export const VerticalLine = withSVG(VerticalLineBase, "vertical-line");

export type { IVerticalLineProps };
