import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { TooltipOverlay } from "./";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/TooltipOverlay",
    component: TooltipOverlay,
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

const TooltipOverlayTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
        },
        event: {
            tooltip: {
                items: [
                    {
                        name: "Line Series with a very long title that should be truncated at some point",
                        icon: "square",
                        fill: "steelblue",
                        value: 155000,
                    },
                    { name: "Scatter Series", icon: "circle", fill: "steelblue", value: "foobar" },
                    { name: "Bar Series", icon: "square", fill: "steelblue", value: true },
                    { name: "Column Series", icon: "square", fill: "steelblue", value: 1500 },
                    { name: "Area Series", icon: "square", fill: "steelblue", value: 1500 },
                    { name: "Timestamp", fill: "steeblue", icon: "none", value: new Date(2023, 1, 1) },
                ],
                color: "green",
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="400px">
                <TooltipOverlay items={args.items} borderColor={args.borderColor} />
            </svg>
        </Provider>
    );
};

export const Default = TooltipOverlayTemplate.bind({});
Default.storyName = "TooltipOverlay";
Default.args = {
    items: [
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
};
