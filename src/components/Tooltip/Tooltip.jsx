import React from "react";

import { TooltipItem } from "./TooltipItem";

const Tooltip = () => {
    const styles = {
        container: {
            padding: 8,
            maxWidth: 300,
            border: "thin solid #CCC",
            boxShadow: "5px 5px 10px #CCC",
        },
    };

    return (
        <div style={styles.container}>
            <TooltipItem
                name="Line Series with a very long title that should be truncated at some point"
                value={5}
                seriesType="line"
                fill="steelblue"
            />
            <TooltipItem name="Scatter Series" value={15} seriesType="scatter" fill="steelblue" />
            <TooltipItem name="Bar Series" value={150} seriesType="bar" fill="steelblue" />
            <TooltipItem name="Column Series" value={1500} seriesType="column" fill="steelblue" />
            <TooltipItem name="Area Series" value={1500} seriesType="area" fill="steelblue" />
        </div>
    );
};

export { Tooltip };
