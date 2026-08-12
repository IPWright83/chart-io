import React from "react";

import { IRadialDendrogramBaseProps, RadialDendrogramBase } from "./RadialDendrogramBase";

export type IRadialDendrogramPlotProps = IRadialDendrogramBaseProps;

/**
 * Represents a RadialDendrogram plot, the polar equivalent of `<Dendrogram>` - a tree of nodes built
 * from the fields listed in `categories`, radiating outward from the center with every leaf aligned at
 * the same radius. Used internally by `<Dendrogram radial>` - use that unless you need to compose the
 * plot into a chart of your own
 * @param  props       The set of React properties
 * @return             The RadialDendrogramPlot component
 */
export function RadialDendrogramPlot(props: IRadialDendrogramPlotProps) {
    return <RadialDendrogramBase {...props} />;
}

RadialDendrogramPlot.requiresVirtualCanvas = true;
RadialDendrogramPlot.isPlot = true;
