import * as d3 from "@chart-io/d3";
import { area, chartSelectors, eventSelectors, IState } from "@chart-io/core";

import { useSelector, useStore } from "react-redux";
import type { IPlotProps } from "@chart-io/types";

import { useLegendItem, useRender } from "../../../../hooks";

import { useDatumFocus } from "./useDatumFocus";
import { usePathCreator } from "./usePathCreator";
import { useTooltip } from "./useTooltip";

export interface IAreaBaseProps extends IPlotProps {
    /**
     * The key of the field used for the y2 position for a stream graph
     */
    y2?: string;
}

/**
 * Represents an Area Plot on an SVG Element
 * @param  props       The set of React properties
 * @return             The Line plot component
 */
export function AreaBase({
    x,
    y,
    y2,
    color,
    scaleMode = "plot",
    showInLegend = true,
    interactive = true,
    layer,
    canvas,
}: IAreaBaseProps) {
    const store = useStore();
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const xScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, x, scaleMode));
    const yScale = useSelector((s: IState) => chartSelectors.scales.getScale(s, y, scaleMode));
    const eventMode = useSelector((s: IState) => eventSelectors.mode(s));
    const position = useSelector((s: IState) => eventSelectors.position(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));
    const sortedData = data.sort((a, b) => d3.ascending(a[x], b[x]));

    const fillColor = d3.color(`${color ?? theme.series.colors[0]}`);
    fillColor.opacity = theme.series.opacity;
    const strokeColor = fillColor.darker();

    useLegendItem(y, "line", showInLegend, fillColor);

    // Used to create our initial path
    usePathCreator(layer, x, y, xScale, yScale, canvas);

    /* On future renders we want to update the path */
    useRender(() => {
        const props = { x, y, y2, xScale, yScale, data: sortedData, fillColor, strokeColor, theme };

        // Handle Canvas rendering
        if (canvas) {
            return area.canvas.render({ ...props, height, width, canvas });
        }

        area.render({ ...props, layer: layer.current, animationDuration });
    }, [x, y, sortedData, xScale, yScale, layer, canvas, width, height, theme.series.colors, animationDuration]);

    // If possible respond to global mouse events for tooltips etc
    if (interactive) {
        useDatumFocus(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, strokeColor);
        useTooltip(store.dispatch, layer, x, y, xScale, yScale, sortedData, eventMode, position, strokeColor);
    }

    return null;
}
