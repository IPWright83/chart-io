import { Brush as BrushBase, IBrushProps } from "./Brush";
import { withSVG } from "../../hoc";

export const Brush = withSVG<IBrushProps>(BrushBase, "brush");

export type { IBrushProps };
