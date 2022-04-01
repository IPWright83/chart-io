import React from "react";
import { Line } from "./Line";

export default {
    title: "Components/Tooltip/TooltipItem/Line",
    component: Line,
};

const LineTemplate = (args) => {
    return <Line fill={args.color} />;
};

export const Default = LineTemplate.bind({});
Default.args = {
    color: "steelblue",
};
