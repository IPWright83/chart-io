export * from "./LegendOverlay";
export * from "./Legend";

import { ILegendOverlayProps, LegendOverlay as LegendOverlayBase } from "./LegendOverlay";
import { withSVG } from "../../hoc";

export const LegendOverlay = withSVG(LegendOverlayBase, "legend-overlay");

export type { ILegendOverlayProps };
