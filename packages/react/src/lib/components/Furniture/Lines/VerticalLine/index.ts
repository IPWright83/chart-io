import { IVerticalLineProps, VerticalLine as VerticalLineBase } from "./VerticalLine";
import { withSVG } from "../../../../hoc";

export const VerticalLine = withSVG(VerticalLineBase, "vertical-line");

export type { IVerticalLineProps };
