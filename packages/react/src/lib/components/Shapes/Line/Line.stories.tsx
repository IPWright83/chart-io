import React from "react";
import { Line } from "./Line";

export default {
  title: "Components/TooltipOverlay/Tooltip/TooltipItem/Line",
  component: Line,
};

const LineTemplate = (args) => {
  return <Line fill={args.fill} />;
};

export const Default = LineTemplate.bind({});
Default.args = {
  fill: "steelblue",
};
