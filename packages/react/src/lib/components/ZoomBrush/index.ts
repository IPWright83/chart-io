import type { IZoomBrushProps } from "./ZoomBrush";
import { ZoomBrush as ZoomBrushBase } from "./ZoomBrush";

import { withSVG } from "../../hoc";

export const ZoomBrush = withSVG<IZoomBrushProps>(ZoomBrushBase, "zoom-brush");

export type { IZoomBrushProps };
