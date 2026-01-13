import React from "react";
import { Square } from "./Square";

export default {
    title: "Components/TooltipOverlay/Tooltip/TooltipItem/Square",
    component: Square,
};

const SquareTemplate = (args) => {
    return <Square fill={args.fill} />;
};

export const Default = SquareTemplate.bind({});
Default.args = {
    fill: "steelblue",
};
