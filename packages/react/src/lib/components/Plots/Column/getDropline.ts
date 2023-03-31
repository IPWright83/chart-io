import * as d3 from "@chart-it/d3";
import type { IColor, IDropline, IScale } from "@chart-it/types";
import type { Selection } from "d3-selection";

import { getXYFromTransform } from "../../../utils";

/**
 * Creates a dropline from the given selction
 * @param  selection    The selection containing the element
 * @param  xScale       The scale for the x Axis
 * @param  grouped      True if the data is grouped
 * @return              The created dropline
 */
const getDropline = (
    selection: Selection<any, unknown, null, undefined>,
    xScale: IScale,
    grouped = false
): IDropline => {
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const tranformX =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).x;

    const horizontalDropline = {
        isHorizontal: true,
        color: fill as IColor,
        x1: x + tranformX,
        x2: xScale.range()[0],
        y1: y,
        y2: y,
    };

    return horizontalDropline;
};

export { getDropline };
