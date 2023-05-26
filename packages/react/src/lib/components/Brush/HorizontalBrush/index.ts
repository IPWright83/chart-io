import { HorizontalBrush as HorizontalBrushBase, IHorizontalBrushProps } from "./HorizontalBrush";
import { withSVG } from "../../../hoc";

export const HorizontalBrush = withSVG<IHorizontalBrushProps>(HorizontalBrushBase, "horizontal-brush");

export type { IHorizontalBrushProps };
