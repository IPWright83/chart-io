import * as d3 from "d3";
import { getXYFromTransform } from "../../../utils";

/**
 * Creates a dropline from the given selction
 * @param  {d3.Selection}  selection    The selection containing the element
 * @param  {d3.Scale}  yScale           The scale for the y Axis
 * @param  {Boolean} grouped            True if the data is grouped
 * @return {Object}                     The created dropline
 */
const getDropline = (selection, yScale, grouped = false) => {
    const fill = selection.style("fill");
    const y = +selection.attr("y");
    const x = +selection.attr("x");
    const width = +selection.attr("width");

    const tranformY =
        grouped === false ? 0 : getXYFromTransform(d3.select(selection.node().parentNode).attr("transform")).y;

    const verticalDropline = {
        isVertical: true,
        color: fill,
        x1: x + width,
        x2: x + width,
        y1: y + tranformY,
        y2: yScale.range()[0],
    };

    return verticalDropline;
};

export { getDropline };
