import type { ITooltipFormatter } from "@chart-io/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors, IState } from "../../store";
import { getTooltipPosition } from "./getTooltipPosition";
import type { ITooltipItemProps } from "./Tooltip/TooltipItem";
import type { ITooltipProps } from "./Tooltip";
import { Tooltip } from "./Tooltip";

export interface ITooltipOverlayProps {
    /**
     * Controls the number of pixels that the tooltip offsets from the cursor
     * @default 20
     */
    offset?: number;
    /**
     * A set of custom formatters for the Tooltip
     */
    formatters?: Record<string, ITooltipFormatter>;
    /**
     * Allows overriding the Tooltip Component that is used
     */
    tooltipComponent?: React.ComponentType<ITooltipProps>;
    /**
     * Allows overriding the TooltipItem Component that is used
     */
    tooltipItemComponent?: React.ComponentType<ITooltipItemProps>;
}

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
export function TooltipOverlay({
    offset = 20,
    formatters = {},
    tooltipComponent,
    tooltipItemComponent,
}: ITooltipOverlayProps) {
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

    const TooltipComponent = tooltipComponent ?? Tooltip;
    return (
        <foreignObject style={style}>
            <TooltipComponent
                borderColor={borderColor?.toString()}
                items={items}
                positionStyle={positionStyle}
                formatters={formatters}
                tooltipItemComponent={tooltipItemComponent}
            />
        </foreignObject>
    );
}
