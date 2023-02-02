import type { IFormatter } from "@d3-chart/types";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";
import { chartSelectors, eventSelectors, IState } from "../../store";
import { getTooltipPosition } from "./getTooltipPosition";

export interface ITooltipOverlayProps {
    /**
     * Controls the number of pixels that the tooltip offsets from the cursor
     * @default 20
     */
    offset?: number;
    /**
     * A set of custom formatters for the Tooltip
     */
    formatters?: Record<string, IFormatter>;
}

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
export function TooltipOverlay({ offset = 20, formatters = {} }: ITooltipOverlayProps) {
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const showTooltip = useSelector((s: IState) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s: IState) => eventSelectors.tooltip.color(s));
    const items = useSelector((s: IState) => eventSelectors.tooltip.items(s));
    const position = useSelector((s: IState) => eventSelectors.tooltip.position(s));

    if (!showTooltip) {
        return null;
    }

    const positionStyle = getTooltipPosition(position, width, height, offset);

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
    };

    return (
        <foreignObject style={style}>
            <Tooltip borderColor={borderColor} items={items} positionStyle={positionStyle} formatters={formatters} />
        </foreignObject>
    );
}
