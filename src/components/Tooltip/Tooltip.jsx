import React from "react";

import { TooltipItem } from "./TooltipItem";

import "./Tooltip.css";

const Tooltip = () => {
    return (
        <div className="chart-it tooltip">
            <TooltipItem
                name="Line Series with a very long title that should be truncated at some point"
                value={155000}
                seriesType="line"
                fill="steelblue"
            />
            <TooltipItem name="Scatter Series" value={150000} seriesType="scatter" fill="steelblue" />
            <TooltipItem name="Bar Series" value={150} seriesType="bar" fill="steelblue" />
            <TooltipItem name="Column Series" value={1500} seriesType="column" fill="steelblue" />
            <TooltipItem name="Area Series" value={1500} seriesType="area" fill="steelblue" />
        </div>
    );
};

export { Tooltip };
