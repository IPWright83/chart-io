export * from "./TooltipOverlay";
export * from "./Tooltip";

import { withSVG } from "../../hoc";
import { TooltipOverlay as TooltipOverlayBase } from "./TooltipOverlay";

const TooltipOverlay = withSVG(TooltipOverlayBase, "tooltip-overlay");

export { TooltipOverlay };
