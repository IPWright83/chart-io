import { withSVG } from "../../hoc";
import { Markers as MarkersBase, IMarkersBaseProps } from "./Markers";

export type IMarkersProps = Omit<IMarkersBaseProps, "layer">

export const Markers = withSVG<IMarkersProps>(MarkersBase, "markers");
