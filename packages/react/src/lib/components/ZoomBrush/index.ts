import { ZoomBrush as ZoomBrushBase, IZoomBrushProps } from "./ZoomBrush";
import { withSVG } from "../../hoc";

export const ZoomBrush = withSVG<IZoomBrushProps>(ZoomBrushBase, "zoom-brush");

export type { IZoomBrushProps };
