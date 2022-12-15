import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { TooltipOverlay } from "./";
import mdx from "./TooltipOverlay.mdx";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/TooltipOverlay",
    component: TooltipOverlay,
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
                        seriesType: "line",
                        fill: "steelblue",
                        value: 155000,
                    },
                    { name: "Scatter Series", seriesType: "scatter", fill: "steelblue", value: "foobar" },
                    { name: "Bar Series", seriesType: "bar", fill: "steelblue", value: true },
                    { name: "Column Series", seriesType: "column", fill: "steelblue", value: 1500 },
                    { name: "Area Series", seriesType: "area", fill: "steelblue", value: 1500 },
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
