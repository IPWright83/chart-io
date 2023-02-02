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
const TooltipOverlay = ({ offset = 20, formatters = {} }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const showTooltip = useSelector((s) => eventSelectors.tooltip.show(s));
    const borderColor = useSelector((s) => eventSelectors.tooltip.color(s));
    const items = useSelector((s) => eventSelectors.tooltip.items(s));
    const position = useSelector((s) => eventSelectors.tooltip.position(s));

    if (!showTooltip) {
        return null;
    }

    const positionStyle = getTooltipPosition(position, width, height, offset);

    const style = {
        width: "100%",
        height: "100%",
        pointerEvents: "none",
    };

    return (
        <foreignObject style={style}>
            <Tooltip borderColor={borderColor} items={items} positionStyle={positionStyle} formatters={formatters} />
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
    /**
     * An object mapping series keys to format functions
     * @type {Object}
     */
    formatters: PropTypes.object,
};

export { TooltipOverlay };
