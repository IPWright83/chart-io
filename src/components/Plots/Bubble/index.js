import { withCanvas, withSVG } from "../../../hoc";
import { Bubble as Bubble_ } from "./Bubble";

const Bubble = withSVG(Bubble_);
const CanvasBubble = withCanvas(Bubble_);

export { Bubble, CanvasBubble, Bubble_ };
