import { withSVG } from "../../../../hoc";
import { HorizontalBand as HorizontalBandBase, IHorizontalBandProps } from "./HorizontalBand";

export const HorizontalBand = withSVG(HorizontalBandBase, "horizontal-band");

export type { IHorizontalBandProps };
