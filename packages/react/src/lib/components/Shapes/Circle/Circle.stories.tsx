import React from "react";
import { Circle } from "./Circle";

export default {
  title: "Components/TooltipOverlay/Tooltip/TooltipItem/Circle",
  component: Circle,
};

const CircleTemplate = (args) => {
  return <Circle fill={args.fill} />;
};

export const Default = CircleTemplate.bind({});
Default.args = {
  fill: "steelblue",
};
