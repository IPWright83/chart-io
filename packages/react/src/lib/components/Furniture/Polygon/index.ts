import { withSVG } from "../../../hoc";
import { Polygon as PolygonBase } from "./Polygon";

const Polygon = withSVG(PolygonBase, "polygon");

export { Polygon };
