import { HorizontalZoomBrush as HorizontalZoomBrushBase, IHorizontalZoomBrushProps } from "./HorizontalZoomBrush";
import { withSVG } from "../../../hoc";

export const HorizontalZoomBrush = withSVG<IHorizontalZoomBrushProps>(HorizontalZoomBrushBase, "horizontal-zoom-brush");

export type { IHorizontalZoomBrushProps };
