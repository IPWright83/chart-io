import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { ColumnBase, IColumnBaseProps } from "./ColumnBase";

export interface IColumnProps extends Omit<IColumnBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasColumn = withCanvas(withXYPlot<IColumnProps>(ColumnBase), "plot column");
const SVGColumn = withSVG(withXYPlot<IColumnProps>(ColumnBase), "plot column");

/**
 * Represents a Column plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function Column({ useCanvas = false, ...props }: IColumnProps) {
    if (useCanvas) {
        return <CanvasColumn {...props} />;
    }

    return <SVGColumn {...props} />;
}

Column.requiresVirtualCanvas = true;
