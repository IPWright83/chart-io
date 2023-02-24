import React from "react";

import { Chart } from "../../Chart";
import { XAxis } from "./XAxis";

export default {
    title: "Components/Axis/XAxis",
    component: XAxis,
};

const XAxisTemplate = (args) => (
    <Chart {...args}>
        <XAxis fields={args.fields} />
    </Chart>
);

export const XAxisStory = XAxisTemplate.bind({});
XAxisStory.storyName = "X Axis";
XAxisStory.args = {
    data: [{ x: 0 }, { x: 10 }],
    fields: ["x"],
    height: 100,
    width: 800,
};
