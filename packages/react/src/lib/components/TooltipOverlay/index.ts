export * from "./TooltipOverlay";
export * from "./Tooltip";

import { withSVG } from "../../hoc";
import { TooltipOverlay as TooltipOverlayBase, ITooltipOverlayProps } from "./TooltipOverlay";

export const TooltipOverlay = withSVG(TooltipOverlayBase, "tooltip-overlay");

export type { ITooltipOverlayProps };
