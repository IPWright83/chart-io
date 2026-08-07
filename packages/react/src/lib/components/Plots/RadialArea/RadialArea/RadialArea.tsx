import React from "react";

import { withCanvas, withRadialPlot, withSVG } from "../../../../hoc";

import { IRadialAreaBaseProps, RadialAreaBase } from "./RadialAreaBase";

export interface IRadialAreaProps extends Omit<IRadialAreaBaseProps, "layer" | "canvas" | "cx" | "cy"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasRadialArea = withCanvas(withRadialPlot<IRadialAreaProps>(RadialAreaBase), "plot radial-area");
const SVGRadialArea = withSVG(withRadialPlot<IRadialAreaProps>(RadialAreaBase), "plot radial-area");

/**
 * Represents a RadialArea plot
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The RadialArea plot component
 */
export function RadialArea({ useCanvas = false, ...props }: IRadialAreaProps) {
    if (useCanvas) {
        return <CanvasRadialArea {...props} />;
    }

    return <SVGRadialArea {...props} />;
}

// Matches Area/Line, not Radar/Donut: RadialAreaBase draws directly to the real canvas context (see
// its Canvas branch) and finds the hovered point via the global mouse position rather than
// per-pixel colour hit-testing, so it doesn't need the virtual canvas
RadialArea.requiresVirtualCanvas = false;
RadialArea.isPlot = true;
