import React from "react";

import { XAxis } from "../XAxis";
import { YAxis } from "../YAxis";
import { Axis } from "./Axis";
import { Chart } from "../../Chart";

import { axisData } from "./axisData";

import mdx from "./Axis.mdx";

export default {
    title: "Components/Axis/Types",
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

export const StringAxis = HorizontalAxisTemplate.bind({});
StringAxis.storyName = "String Axis";
StringAxis.args = {
    position: "bottom",
    fields: ["stringValue"],
    height: 80,
    width: 800,
    showGridlines: false,
};

export const BooleanAxis = HorizontalAxisTemplate.bind({});
BooleanAxis.storyName = "Boolean Axis";
BooleanAxis.args = {
    ...StringAxis.args,
    fields: ["boolValue"],
};

export const IntegerAxis = HorizontalAxisTemplate.bind({});
IntegerAxis.storyName = "Integer Axis";
IntegerAxis.args = {
    ...StringAxis.args,
    fields: ["integerValue"],
};

export const DoubleAxis = HorizontalAxisTemplate.bind({});
DoubleAxis.storyName = "Double Axis";
DoubleAxis.args = {
    ...StringAxis.args,
    fields: ["doubleValue"],
};

export const DoubleAxisOnlyNegativeAxis = HorizontalAxisTemplate.bind({});
DoubleAxisOnlyNegativeAxis.storyName = "Double Axis (with exclusive negative values)";
DoubleAxisOnlyNegativeAxis.args = {
    ...StringAxis.args,
    fields: ["negativeDoubleValue"],
};

export const DoubleAxisMixedSignAxis = HorizontalAxisTemplate.bind({});
DoubleAxisMixedSignAxis.storyName = "Double Axis (with mixed positive and negative values)";
DoubleAxisMixedSignAxis.args = {
    ...StringAxis.args,
    fields: ["positiveAndNegativeDoubleValue"],
};

export const DateAxis = HorizontalAxisTemplate.bind({});
DateAxis.storyName = "Date Axis";
DateAxis.args = {
    ...StringAxis.args,
    fields: ["dateValue"],
};

export const DateTimeAxis = HorizontalAxisTemplate.bind({});
DateTimeAxis.storyName = "DateTime Axis";
DateTimeAxis.args = {
    ...StringAxis.args,
    fields: ["dateTimeValue"],
};
