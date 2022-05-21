import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";
import { chartSelectors, eventSelectors } from "../../store";
import { getTooltipPosition } from "./getTooltipPosition";

/**
 * Represents a Tooltip overlay layer
 * @return {ReactElement}  The Tooltip overlay component
 */
const TooltipOverlay = ({ offset = 20 }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const showTooltip = useSelector((s) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s) => eventSelectors.tooltip.color(s));
    const tooltipItems = useSelector((s) => eventSelectors.tooltip.items(s));
    const mouseEvent = useSelector((s) => eventSelectors.tooltip.event(s));

    if (!showTooltip) {
        return null;
    }

    const positionStyle = getTooltipPosition(mouseEvent, width, height, offset);

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

TooltipOverlay.propTypes = {
    /**
     * Controls the number of pixels that the tooltip offsets from the cursor
     * @default 20
     * @type {number}
     */
    offset: PropTypes.number,
};

export { TooltipOverlay };
