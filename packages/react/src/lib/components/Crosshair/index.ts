import { Crosshair as CrosshairBase, ICrosshairProps } from "./Crosshair";
import { withSVG } from "../../hoc";

export const Crosshair = withSVG<ICrosshairProps>(CrosshairBase, "crosshair");

export type { ICrosshairProps };
