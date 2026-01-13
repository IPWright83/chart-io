import React from "react";

import { TooltipItem } from "./TooltipItem";

import "./Tooltip.css";

const Tooltip = ({ items }) => {
    const style = {
        borderColor: "steelblue",
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="chart-it tooltip" style={style}>
            {items.map((item) => (
                <TooltipItem {...item} />
            ))}
        </div>
    );
};

export { Tooltip };
