import React from "react";
import PropTypes from "prop-types";

import { getShape } from "./getShape";
import type { ITooltipItem } from "../../../../types";

import "./TooltipItem.css";

/**
 * Represents a row within a Tooltip
 * @return {ReactElement}  The TooltipItem component
 */
export const TooltipItem = ({ name, value, seriesType, fill }: ITooltipItem) => {
    const Shape = getShape(seriesType);

    return (
        <div className="chart-it tooltip-item">
            {Shape && <Shape fill={fill} />}
            <div className="chart-it tooltip-values">
                <span className="chart-it tooltip-series-name">{name}:</span>
                <span className="chart-it tooltip-series-value">{`${value}`}</span>
            </div>
        </div>
    );
};
