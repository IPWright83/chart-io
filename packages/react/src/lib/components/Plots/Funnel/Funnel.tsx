import React, { forwardRef } from "react";

import { Chart, IChartProps, IChartRef } from "../../Chart";
import { LegendOverlay } from "../../LegendOverlay";
import { TooltipOverlay } from "../../TooltipOverlay";

import { FunnelPlot, IFunnelPlotProps } from "./FunnelPlot";

export interface IFunnelProps
    extends Omit<IChartProps, "children">,
        Omit<IFunnelPlotProps, "useCanvas" | "onMouseOver" | "onMouseOut" | "onClick"> {}

/**
 * Represents a Funnel chart, stacking one trapezoid segment per row of data - built from
 * `category`/`value` - narrowing from the widest at the top down to the narrowest at the bottom. A
 * self-contained chart: no need to wrap it in another chart component yourself. Set `inverted` to
 * flip it into a Pyramid instead, or use `<Pyramid>` directly
 * @param  props       The set of React properties
 * @return             The Funnel component
 */
export const Funnel = forwardRef<IChartRef, IFunnelProps>(
    ({ category, value, padding, sort, inverted, colors, showInLegend, interactive, ...chartProps }, ref) => {
        return (
            <Chart ref={ref} {...chartProps}>
                <FunnelPlot
                    category={category}
                    value={value}
                    padding={padding}
                    sort={sort}
                    inverted={inverted}
                    colors={colors}
                    showInLegend={showInLegend}
                    interactive={interactive}
                />
                <TooltipOverlay onlyNearest={true} />
                <LegendOverlay />
            </Chart>
        );
    },
);

Funnel.displayName = "Funnel";
