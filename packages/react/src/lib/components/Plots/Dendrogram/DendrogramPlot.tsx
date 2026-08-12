import React from "react";

import { DendrogramBase, IDendrogramBaseProps } from "./DendrogramBase";

export type IDendrogramPlotProps = IDendrogramBaseProps;

/**
 * Represents a Dendrogram plot, a tree of nodes built from the fields listed in `categories`, laid out
 * left-to-right with every leaf aligned at the same depth. Used internally by `<Dendrogram>` - use that
 * unless you need to compose the plot into a chart of your own
 * @param  props       The set of React properties
 * @return             The DendrogramPlot component
 */
export function DendrogramPlot(props: IDendrogramPlotProps) {
    return <DendrogramBase {...props} />;
}

DendrogramPlot.requiresVirtualCanvas = true;
DendrogramPlot.isPlot = true;
