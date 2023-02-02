import React from "react";
import { TooltipItem } from "./TooltipItem";

import mdx from "./TooltipItem.mdx";

export default {
    title: "Components/TooltipOverlay/Tooltip/TooltipItem",
    component: TooltipItem,
    parameters: {
        docs: {
            page: mdx,
        },
    },
};

const TooltipItemTemplate = (args) => (
    <TooltipItem
        name={args.name}
        fill={args.color}
        value={args.value}
        seriesType={args.seriesType}
        suffix={args.suffix}
        prefix={args.prefix}
        formatFunc={args.formatFunc}
    ></TooltipItem>
);

export const Scatter = TooltipItemTemplate.bind({});
Scatter.args = {
    name: "Scatter Series",
    value: 5,
    color: "steelblue",
    seriesType: "scatter",
};

export const Line = TooltipItemTemplate.bind({});
Line.args = {
    name: "Line Series",
    value: 5,
    color: "steelblue",
    seriesType: "line",
};

export const Area = TooltipItemTemplate.bind({});
Area.args = {
    name: "Area Series",
    value: 5,
    color: "steelblue",
    seriesType: "area",
};

export const Bar = TooltipItemTemplate.bind({});
Bar.args = {
    name: "Bar Series",
    value: 5,
    color: "steelblue",
    seriesType: "bar",
};

export const Column = TooltipItemTemplate.bind({});
Column.args = {
    name: "Column Series",
    value: 5,
    color: "steelblue",
    seriesType: "column",
};

export const Value = TooltipItemTemplate.bind({});
Value.args = {
    name: "Value",
    value: 5,
    color: "steelblue",
    seriesType: "value",
};

export const Suffix = TooltipItemTemplate.bind({});
Suffix.args = {
    name: "Suffix Example",
    value: 105_000,
    color: "sttelblue",
    seriesType: "scatter",
    suffix: " Dollars",
};

export const Prefix = TooltipItemTemplate.bind({});
Prefix.args = {
    name: "Prefix Example",
    value: 105_000,
    color: "sttelblue",
    seriesType: "scatter",
    prefix: "£",
};

export const CustomFormat = TooltipItemTemplate.bind({});
CustomFormat.args = {
    name: "Custom Format Example",
    value: 105_000,
    color: "sttelblue",
    seriesType: "scatter",
    formatFunc: (name, value) => `~~~${value}~~~`,
};
