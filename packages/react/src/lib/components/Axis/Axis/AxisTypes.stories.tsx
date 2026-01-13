import React from "react";

import { XAxis } from "../XAxis";
import { Axis } from "./Axis";
import { Chart } from "../../Chart";

import { axisData } from "./axisData";

export default {
    title: "Components/Axis/Types",
    component: Axis,
    parameters: {
        docs: {
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

export const StringAxis = {
    name: "String Axis",
    render: HorizontalAxisTemplate,
    args: {
        position: "bottom",
        fields: ["stringValue"],
        height: 80,
        width: 800,
        showGridlines: false,
    },
};

export const BooleanAxis = {
    name: "Boolean Axis",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["boolValue"],
    },
};

export const IntegerAxis = {
    name: "Integer Axis",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["integerValue"],
    },
};

export const DoubleAxis = {
    name: "Double Axis",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["doubleValue"],
    },
};

export const DoubleAxisOnlyNegativeAxis = {
    name: "Double Axis (with exclusive negative values)",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["negativeDoubleValue"],
    },
};

export const DoubleAxisMixedSignAxis = {
    name: "Double Axis (with mixed positive and negative values)",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["positiveAndNegativeDoubleValue"],
    },
};

export const DateAxis = {
    name: "Date Axis",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["dateValue"],
    },
};

export const DateTimeAxis = {
    name: "DateTime Axis",
    render: HorizontalAxisTemplate,
    args: {
        ...StringAxis.args,
        fields: ["dateTimeValue"],
    },
};
