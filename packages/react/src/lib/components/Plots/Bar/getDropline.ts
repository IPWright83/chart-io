import { select } from "d3-selection";
import type { Selection } from "d3-selection";
import { IScale, IColor, IDropline } from "@d3-chart/types";
import { getXYFromTransform } from "../../../utils";

/**
 * Creates a dropline from the given selction
 * @param  selection    The selection containing the element
 * @param  yScale       The scale for the y Axis
 * @param  grouped      True if the data is grouped
 * @return              The created dropline
 */
export function getDropline(
    selection: Selection<any, unknown, null, undefined>,
    yScale: IScale,
    grouped = false
): IDropline {
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const width = +selection.attr("width");

    const tranformY =
        grouped === false ? 0 : getXYFromTransform(select(selection.node().parentNode).attr("transform")).y;

    const verticalDropline = {
        isVertical: true,
        color: fill as IColor,
        x1: x + width,
        x2: x + width,
        y1: y + tranformY,
        y2: yScale.range()[0],
    };

    return verticalDropline;
}
