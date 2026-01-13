import React from "react";
import { Provider } from "react-redux";

import { Tooltip } from "./Tooltip";

import { createMockStorybookStore } from "../../../testUtils";

export default {
    title: "Components/TooltipOverlay/Tooltip",
    component: Tooltip,
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

const TooltipTemplate = (args) => {
    const store = createMockStorybookStore({});

    return (
        <Provider store={store}>
            <Tooltip items={args.items} borderColor={args.borderColor} formatters={args.formatters} />
        </Provider>
    );
};

export const Default = {
    name: "All Series Types",
    render: TooltipTemplate,
    args: {
        items: [
            {
                name: "Line Series with a very long title that should be truncated at some point",
                icon: "line",
                fill: "steelblue",
                value: 12355000,
            },
            { name: "Scatter Series", icon: "circle", fill: "steelblue", value: "foobar" },
            { name: "Bar Series", icon: "square", fill: "steelblue", value: true },
            { name: "Column Series", icon: "square", fill: "steelblue", value: 1500 },
            { name: "Area Series", icon: "square", fill: "steelblue", value: 0.0005 },
            { name: "Timestamp", fill: "steeblue", icon: "none", value: new Date(2023, 1, 1) },
        ],
    },
};

export const NumberExamples = {
    name: "Numerical Examples",
    render: TooltipTemplate,
    args: {
        items: [
            { name: "Billions", icon: "none", value: 22_178_905_132 },
            { name: "Millions", icon: "none", value: 78_905_132 },
            { name: "100's Thousands", icon: "none", value: 391_290 },
            { name: "10's Thousands", icon: "none", value: 91_290 },
            { name: "Hundreds", icon: "none", value: 546 },
            { name: "Tens", icon: "none", value: 45 },
            { name: "Units", icon: "none", value: 4 },
            { name: "Sub-zero", icon: "none", value: 0.4 },
            { name: "Mili", icon: "none", value: 0.00465 },
            { name: "Micro", icon: "none", value: 0.00000254 },
            { name: "Nano", icon: "none", value: 0.00000000354 },
            { name: "Pico", icon: "none", value: 0.00000000000748 },
        ],
    },
};

export const DateExamples = {
    name: "Date Examples",
    render: TooltipTemplate,
    args: {
        items: [
            { name: "Years", icon: "none", value: new Date(2023, 0) },
            { name: "Months", icon: "none", value: new Date(2023, 11) },
            { name: "Day", icon: "none", value: new Date(2023, 11, 25) },
            { name: "Hours", icon: "none", value: new Date(2023, 11, 25, 9) },
            { name: "Minutes", icon: "none", value: new Date(2023, 11, 25, 9, 30) },
            { name: "Seconds", icon: "none", value: new Date(2023, 11, 25, 9, 30, 30) },
        ],
    },
};

export const WithTitle = {
    name: "With a Title",
    render: TooltipTemplate,
    args: {
        items: [
            { name: "Title", value: 5 },
            {
                name: "Line Series with a very long title that should be truncated at some point",
                icon: "line",
                fill: "steelblue",
                value: 155000,
            },
            { name: "Scatter Series", icon: "circle", fill: "steelblue", value: "foobar" },
            { name: "Bar Series", icon: "square", fill: "steelblue", value: true },
            { name: "Column Series", icon: "square", fill: "steelblue", value: 1500 },
            { name: "Area Series", icon: "square", fill: "steelblue", value: 1500 },
        ],
    },
};

export const Scatter = {
    render: TooltipTemplate,
    args: {
        items: [
            { name: "x", icon: "none", value: 5 },
            { name: "y", icon: "none", value: 150000 },
        ],
        borderColor: "steelblue",
    },
};

export const CustomFormatters = {
    name: "Custom Formatting",
    render: TooltipTemplate,
    args: {
        items: [
            { name: "x", icon: "none", value: 150000 },
            { name: "y", icon: "none", value: 160000 },
            { name: "z", icon: "none", value: 170000 },
        ],
        formatters: {
            x: { prefix: "£" },
            y: { suffix: " pounds" },
            z: { format: (name, value) => `~~~${value}~~~` },
        },
    },
};
