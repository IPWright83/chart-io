export * from "./LegendOverlay";
export * from "./Legend";

import { withSVG } from "../../hoc";
import { LegendOverlay as LegendOverlayBase, ILegendOverlayProps } from "./LegendOverlay";

export const LegendOverlay = withSVG(LegendOverlayBase, "legend-overlay");

export type { ILegendOverlayProps };
