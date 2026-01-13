import { IPolygonProps, Polygon as PolygonBase } from "./Polygon";
import { withSVG } from "../../../hoc";

export const Polygon = withSVG(PolygonBase, "polygon");

export type { IPolygonProps };
