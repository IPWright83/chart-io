import { withSVG } from "../../../../hoc";
import { VerticalBand as VerticalBandBase, IVerticalBandProps } from "./VerticalBand";

export const VerticalBand = withSVG(VerticalBandBase, "vertical-band");

export type { IVerticalBandProps };
