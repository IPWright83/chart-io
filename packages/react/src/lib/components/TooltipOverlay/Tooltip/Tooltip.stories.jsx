import React from "react";
import { Tooltip } from "./Tooltip";

import mdx from "./Tooltip.mdx";

export default {
    title: "Components/TooltipOverlay/Tooltip",
    component: Tooltip,
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

const TooltipTemplate = (args) => <Tooltip items={args.items} borderColor={args.borderColor} />;

export const Default = TooltipTemplate.bind({});
Default.storyName = "All Series Types";
Default.args = {
    items: [
        {
            name: "Line Series with a very long title that should be truncated at some point",
            seriesType: "line",
            fill: "steelblue",
            value: 12355000,
        },
        { name: "Scatter Series", seriesType: "scatter", fill: "steelblue", value: "foobar" },
        { name: "Bar Series", seriesType: "bar", fill: "steelblue", value: true },
        { name: "Column Series", seriesType: "column", fill: "steelblue", value: 1500 },
        { name: "Area Series", seriesType: "area", fill: "steelblue", value: 0.0005 },
        { name: "Timestamp", fill: "steeblue", seriesType: "value", value: new Date(2023, 1, 1) },
    ],
};

export const NumberExamples = TooltipTemplate.bind({});
NumberExamples.storyName = "Numerical Examples";
NumberExamples.args = {
    items: [
        { name: "Billions", seriesType: "value", value: 22_178_905_132 },
        { name: "Millions", seriesType: "value", value: 78_905_132 },
        { name: "100's Thousands", seriesType: "value", value: 391_290 },
        { name: "10's Thousands", seriesType: "value", value: 91_290 },
        { name: "Hundreds", seriesType: "value", value: 546 },
        { name: "Tens", seriesType: "value", value: 45 },
        { name: "Units", seriesType: "value", value: 4 },
        { name: "Sub-zero", seriesType: "value", value: 0.4 },
        { name: "Mili", seriesType: "value", value: 0.00465 },
        { name: "Micro", seriesType: "value", value: 0.00000254 },
        { name: "Nano", seriesType: "value", value: 0.00000000354 },
        { name: "Pico", seriesType: "value", value: 0.00000000000748 },
    ],
};

export const DateExamples = TooltipTemplate.bind({});
DateExamples.storyName = "Date Examples";
DateExamples.args = {
    items: [
        { name: "Years", seriesType: "value", value: new Date(2023, 0) },
        { name: "Months", seriesType: "value", value: new Date(2023, 11) },
        { name: "Day", seriesType: "value", value: new Date(2023, 11, 25) },
        { name: "Hours", seriesType: "value", value: new Date(2023, 11, 25, 9) },
        { name: "Minutes", seriesType: "value", value: new Date(2023, 11, 25, 9, 30) },
        { name: "Seconds", seriesType: "value", value: new Date(2023, 11, 25, 9, 30, 30) },
    ],
};

export const WithTitle = TooltipTemplate.bind({});
WithTitle.storyName = "With a Title";
WithTitle.args = {
    items: [
        { name: "Title", value: 5 },
        {
            name: "Line Series with a very long title that should be truncated at some point",
            seriesType: "line",
            fill: "steelblue",
            value: 155000,
        },
        { name: "Scatter Series", seriesType: "scatter", fill: "steelblue", value: "foobar" },
        { name: "Bar Series", seriesType: "bar", fill: "steelblue", value: true },
        { name: "Column Series", seriesType: "column", fill: "steelblue", value: 1500 },
        { name: "Area Series", seriesType: "area", fill: "steelblue", value: 1500 },
    ],
};

export const Scatter = TooltipTemplate.bind({});
Scatter.args = {
    items: [
        { name: "x", seriesType: "value", value: 5 },
        { name: "y", seriesType: "value", value: 150000 },
    ],
    borderColor: "steelblue",
};
