export * from "./TooltipOverlay";
export * from "./Tooltip";

import { ITooltipOverlayProps, TooltipOverlay as TooltipOverlayBase } from "./TooltipOverlay";
import { withSVG } from "../../hoc";

export const TooltipOverlay = withSVG(TooltipOverlayBase, "tooltip-overlay");

export type { ITooltipOverlayProps };
