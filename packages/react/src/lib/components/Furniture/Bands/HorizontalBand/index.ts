import { HorizontalBand as HorizontalBandBase, IHorizontalBandProps } from "./HorizontalBand";
import { withSVG } from "../../../../hoc";

export const HorizontalBand = withSVG(HorizontalBandBase, "horizontal-band");

export type { IHorizontalBandProps };
