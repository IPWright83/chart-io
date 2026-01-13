import React from "react";

import { XAxis } from "../XAxis";
import { YAxis } from "../YAxis";
import { Axis } from "./Axis";
import { Chart } from "../../Chart";
import { axisData } from "./axisData";

import mdx from "./Axis.mdx";

export default {
    title: "Components/Axis/Orientation",
    component: Axis,
    parameters: {
        docs: {
            page: mdx,
            transformSource: (src) => {
                src = src.replace(/data={\[.*?\]}/gs, "data={[ ...dataset ]}");
                src = src.replaceAll(/undefined,?/g, "");
                src = src.replace(/^\s*\n/gm, "");
                return src;
            },
        },
        chromatic: { delay: 300 },
    },
};

const VerticalAxisTemplate = (args) => (
    <Chart {...args} margin={{ left: 80, bottom: 50, top: 50, right: 80 }} data={axisData}>
        <YAxis
            fields={args.fields}
            tickSizeInner={args.tickSizeInner}
            tickSizeOuter={args.tickSizeOuter}
            tickPadding={args.tickPadding}
            showGridlines={args.showGridlines}
            title={args.title}
            position={args.position}
        />
    </Chart>
);

const HorizontalAxisTemplate = (args) => (
    <Chart {...args} data={axisData}>
        <XAxis
            fields={args.fields}
            tickSizeInner={args.tickSizeInner}
            tickSizeOuter={args.tickSizeOuter}
            tickPadding={args.tickPadding}
            showGridlines={args.showGridlines}
            title={args.title}
            position={args.position}
        />
    </Chart>
);

export const Left = VerticalAxisTemplate.bind({});
Left.storyName = "Left";
Left.args = {
    position: "left",
    fields: ["integerValue"],
    height: 400,
    width: 800,
    showGridlines: false,
};

export const Right = VerticalAxisTemplate.bind({});
Right.storyName = "Right";
Right.args = {
    ...Left.args,
    position: "right",
};

export const Bottom = HorizontalAxisTemplate.bind({});
Bottom.storyName = "Bottom";
Bottom.args = {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    showGridlines: false,
};

export const Top = HorizontalAxisTemplate.bind({});
Top.storyName = "Top";
Top.args = {
    ...Bottom.args,
    position: "top",
};
