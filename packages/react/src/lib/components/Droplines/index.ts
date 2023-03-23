import { Droplines as DroplinesBase, IDroplinesBaseProps } from "./Droplines";
import { withSVG } from "../../hoc";

export type IDroplinesProps = Omit<IDroplinesBaseProps, "layer">;

export const Droplines = withSVG<IDroplinesProps>(DroplinesBase, "droplines");
