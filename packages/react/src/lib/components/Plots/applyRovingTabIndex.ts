import { d3 } from "@chart-io/core";

import type { MutableRefObject } from "react";

/**
 * Applies a "roving tabindex" (see the WAI-ARIA Authoring Practices Guide) to a selection of
 * interactive marks - e.g. the bars in a `<Bar>`, or the slices in a `<Donut>`. Rather than every mark
 * being its own Tab stop (which would make a chart with hundreds of data points take hundreds of Tab
 * presses to get past), only one mark at a time - tracked in `rovingIndexRef` - is in the Tab order.
 * The Left/Right (or Up/Down) arrow keys move that single Tab stop, and therefore the DOM focus,
 * between marks; Home/End jump to the first/last mark
 * @param  selection        The selection of marks to apply the roving tabindex to
 * @param  rovingIndexRef   A ref holding the index of the mark that's currently the Tab stop
 * @param  interactive      Should the marks be focusable at all?
 */
export function applyRovingTabIndex<Datum>(
    selection: d3.Selection<any, Datum, any, any>,
    rovingIndexRef: MutableRefObject<number>,
    interactive: boolean,
) {
    const nodes = selection.nodes();

    // If the dataset has shrunk since the last render, make sure the roving index still points
    // at a real node
    if (rovingIndexRef.current > nodes.length - 1) {
        rovingIndexRef.current = Math.max(0, nodes.length - 1);
    }

    selection
        .attr("tabindex", (_d, i) => {
            if (!interactive) return null;
            return i === rovingIndexRef.current ? 0 : -1;
        })
        .on("keydown.roving", function (event) {
            // istanbul ignore next
            if (!interactive) return;

            const currentIndex = nodes.indexOf(this);
            if (currentIndex === -1) return;

            let nextIndex: number | undefined;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                nextIndex = Math.min(currentIndex + 1, nodes.length - 1);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                nextIndex = Math.max(currentIndex - 1, 0);
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = nodes.length - 1;
            }

            if (nextIndex === undefined || nextIndex === currentIndex) return;

            event.preventDefault();

            d3.select(nodes[currentIndex]).attr("tabindex", -1);
            d3.select(nodes[nextIndex]).attr("tabindex", 0);
            rovingIndexRef.current = nextIndex;
            (nodes[nextIndex] as unknown as SVGElement).focus();
        });
}
