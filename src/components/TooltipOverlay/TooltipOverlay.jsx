import React from "react";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";
import { eventSelectors } from "../../store";

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
const TooltipOverlay = () => {
    const showTooltip = useSelector((s) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s) => eventSelectors.tooltip.color(s));
    const tooltipItems = useSelector((s) => eventSelectors.tooltip.items(s));

    if (!showTooltip) {
        return null;
    }

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none",
    };

    return (
        <foreignObject style={style}>
            <Tooltip borderColor={borderColor} items={tooltipItems} />
        </foreignObject>
    );
};

export { TooltipOverlay };
