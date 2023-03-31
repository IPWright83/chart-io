import { IMarkersBaseProps, Markers as MarkersBase } from "./Markers";
import { withSVG } from "../../hoc";

export type IMarkersProps = Omit<IMarkersBaseProps, "layer">;

export const Markers = withSVG<IMarkersProps>(MarkersBase, "markers");
