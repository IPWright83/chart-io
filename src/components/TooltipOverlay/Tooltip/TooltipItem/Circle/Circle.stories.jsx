import React from "react";
import { Circle } from "./Circle";

export default {
    title: "Components/Tooltip/TooltipItem/Circle",
    component: Circle,
};

const CircleTemplate = (args) => {
    return <Circle fill={args.color} />;
};

export const Default = CircleTemplate.bind({});
Default.args = {
    color: "steelblue",
};
