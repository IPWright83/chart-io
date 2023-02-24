import React from "react";

import { withCanvas, withSVG, withXYPlot } from "../../../../hoc";

import { BarBase, IBarBaseProps } from "./BarBase";

export interface IBarProps extends Omit<IBarBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasBar = withCanvas(withXYPlot<IBarProps>(BarBase), "plot bar");
const SVGBar = withSVG(withXYPlot<IBarProps>(BarBase), "plot bar");

/**
 * Represents a Bar plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The Bar plot component
 */
export function Bar({ useCanvas = false, ...props }: IBarProps) {
    if (useCanvas) {
        return <CanvasBar {...props} />;
    }

    return <SVGBar {...props} />;
}

Bar.requiresVirtualCanvas = true;
