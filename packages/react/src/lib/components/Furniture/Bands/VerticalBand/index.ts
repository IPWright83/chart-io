import { IVerticalBandProps, VerticalBand as VerticalBandBase } from "./VerticalBand";
import { withSVG } from "../../../../hoc";

export const VerticalBand = withSVG(VerticalBandBase, "vertical-band");

export type { IVerticalBandProps };
