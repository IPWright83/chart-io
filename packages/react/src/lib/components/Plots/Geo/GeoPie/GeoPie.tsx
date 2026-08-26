import React from "react";

import { withCanvas, withSVG } from "../../../../hoc";

import { GeoPieBase, IGeoPieBaseProps } from "./GeoPieBase";

export interface IGeoPieProps extends Omit<IGeoPieBaseProps, "layer" | "canvas"> {
    /**
     * Should Canvas be used instead of SVG?
     */
    useCanvas?: boolean;
}

const CanvasGeoPie = withCanvas<IGeoPieProps>(GeoPieBase, "plot geo-pie");
const SVGGeoPie = withSVG<IGeoPieProps>(GeoPieBase, "plot geo-pie");

/**
 * Represents a GeoPie layer - see `GeoPieBase`
 * @param  useCanvas   Should Canvas be used instead of SVG?
 * @param  props       The set of React properties
 * @return             The GeoPie component
 */
export function GeoPie({ useCanvas = false, ...props }: IGeoPieProps) {
    if (useCanvas) {
        return <CanvasGeoPie {...props} />;
    }

    return <SVGGeoPie {...props} />;
}
