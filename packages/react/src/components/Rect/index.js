import { withSVG } from "../../hoc";
import { Rect as RectBase } from "./Rect";

const Rect = withSVG(RectBase, "rect");

export { Rect };
