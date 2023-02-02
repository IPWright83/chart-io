import { withSVG } from "../../hoc";
import { Crosshair as CrosshairBase, ICrosshairProps } from "./Crosshair";

export const Crosshair = withSVG<ICrosshairProps>(CrosshairBase, "crosshair");

export type { ICrosshairProps };
