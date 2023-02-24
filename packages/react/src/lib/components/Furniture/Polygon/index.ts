import { withSVG } from "../../../hoc";
import { Polygon as PolygonBase, IPolygonProps } from "./Polygon";

export const Polygon = withSVG(PolygonBase, "polygon");

export type { IPolygonProps };
