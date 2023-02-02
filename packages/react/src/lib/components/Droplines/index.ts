import { withSVG } from "../../hoc";
import { Droplines as DroplinesBase, IDroplinesBaseProps } from "./Droplines";

export interface IDroplinesProps extends Omit<IDroplinesBaseProps, "layer"> {}

export const Droplines = withSVG<IDroplinesProps>(DroplinesBase, "droplines");
