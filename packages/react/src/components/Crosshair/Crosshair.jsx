import React from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { chartSelectors, eventSelectors } from "../../store";

import "./Crosshair.css";

/**
 * This component renders the droplines that are triggered from various plots
 * @return {ReactElement}  The Crosshair component
 */
const Crosshair = ({ showVertical = true, showHorizontal = true }) => {
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const position = useSelector((s) => eventSelectors.position(s));

    if (!position.x || !position.y) {
        return null;
    }

    const { x, y } = position;

    return (
        <>
            {showHorizontal && (
                <line
                    x1={margin.left}
                    x2={width - margin.right}
                    y1={y}
                    y2={y}
                    stroke={theme.crosshair.stroke}
                    strokeOpacity={theme.crosshair.strokeOpacity}
                    strokeWidth={theme.crosshair.strokeWidth}
                    strokeDasharray={theme.crosshair.strokeDasharray}
                />
            )}
            {showVertical && (
                <line
                    x1={x}
                    x2={x}
                    y1={margin.top}
                    y2={height - margin.bottom}
                    stroke={theme.crosshair.stroke}
                    strokeOpacity={theme.crosshair.strokeOpacity}
                    strokeWidth={theme.crosshair.strokeWidth}
                    strokeDasharray={theme.crosshair.strokeDasharray}
                />
            )}
        </>
    );
};

Crosshair.propTypes = {
    /**
     * Should horizontal droplines be shown?
     * @default true
     * @type {Boolean}
     */
    showHorizontal: PropTypes.bool,

    /**
     * Should vertical droplines be shown?
     * @default true
     * @type {Boolean}
     */
    showVertical: PropTypes.bool,
};

export { Crosshair };
