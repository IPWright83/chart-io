import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";
import { chartSelectors, eventSelectors, IStore } from "../../store";
import { getTooltipPosition } from "./getTooltipPosition";

export interface ITooltipOverlayProps {
    /**
     * Controls the number of pixels that the tooltip offsets from the cursor
     * @default 20
     */
    offset?: number;
}

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
const TooltipOverlay = ({ offset = 20 }: ITooltipOverlayProps) => {
    const width = useSelector((s: IStore) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IStore) => chartSelectors.dimensions.height(s));
    const showTooltip = useSelector((s: IStore) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s: IStore) => eventSelectors.tooltip.color(s));
    const items = useSelector((s: IStore) => eventSelectors.tooltip.items(s));
    const position = useSelector((s: IStore) => eventSelectors.tooltip.position(s));

    if (!showTooltip || !position) {
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
            <Tooltip borderColor={borderColor} items={items} positionStyle={positionStyle} />
        </foreignObject>
    );
};

export { TooltipOverlay };
