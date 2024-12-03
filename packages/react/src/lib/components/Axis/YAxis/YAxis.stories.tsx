import React from "react";

import { Chart } from "../../Chart";
import { YAxis } from "./YAxis";

export default {
  title: "Components/Axis/YAxis",
  component: YAxis,
};

const YAxisTemplate = (args) => (
  <Chart {...args}>
    <YAxis fields={args.fields} />
  </Chart>
);

export const YAxisStory = {
  name: "Y Axis",
  render: YAxisTemplate,
  args: {
    data: [{ y: 0 }, { y: 10 }],
    fields: ["y"],
    height: 500,
    width: 500,
  },
};
