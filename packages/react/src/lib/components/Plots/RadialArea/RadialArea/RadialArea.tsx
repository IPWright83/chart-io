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

RadialArea.requiresVirtualCanvas = false;
RadialArea.isPlot = true;
