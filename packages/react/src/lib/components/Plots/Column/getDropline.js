import * as d3 from "d3";

import { getXYFromTransform } from "../../../utils";

/**
 * Creates a dropline from the given selction
 * @param  {d3.Selection}  selection    The selection containing the element
 * @param  {d3.Scale}  xScale           The scale for the x Axis
 * @param  {Boolean} grouped            True if the data is grouped
 * @return {Object}                     The created dropline
 */
const getDropline = (selection, xScale, grouped = false) => {
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const tranformX =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).x;

    const horizontalDropline = {
        isHorizontal: true,
        color: fill,
        x1: x + tranformX,
        x2: xScale.range()[0],
        y1: y,
        y2: y,
    };

    return horizontalDropline;
};

export { getDropline };
