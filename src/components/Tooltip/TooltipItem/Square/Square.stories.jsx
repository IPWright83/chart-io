import React from "react";
import { Square } from "./Square";

export default {
    title: "Components/Tooltip/TooltipItem/Square",
    component: Square,
};

const SquareTemplate = (args) => {
    return <Square fill={args.color} />;
};

export const Default = SquareTemplate.bind({});
Default.args = {
    color: "steelblue",
};
