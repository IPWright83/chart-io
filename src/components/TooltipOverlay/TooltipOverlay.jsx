import React from "react";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";
import { chartSelectors, eventSelectors } from "../../store";
import { getTooltipPosition } from "./getTooltipPosition";

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
const TooltipOverlay = () => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const showTooltip = useSelector((s) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s) => eventSelectors.tooltip.color(s));
    const tooltipItems = useSelector((s) => eventSelectors.tooltip.items(s));
    const mouseEvent = useSelector((s) => eventSelectors.tooltip.event(s));

    if (!showTooltip) {
        return null;
    }

    const positionStyle = getTooltipPosition(mouseEvent, width, height);

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none",
    };

    return (
        <foreignObject style={style}>
            <Tooltip borderColor={borderColor} items={tooltipItems} positionStyle={positionStyle} />
        </foreignObject>
    );
};

export { TooltipOverlay };
