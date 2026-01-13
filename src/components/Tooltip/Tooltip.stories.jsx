import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        docs: {
            // page: mdx,
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

const TooltipTemplate = (args) => <Tooltip items={args.items} />;

export const Default = TooltipTemplate.bind({});
Default.storyName = "All Series Types";
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

export const Scatter = TooltipTemplate.bind({});
Scatter.args = {
    items: [
        { name: "x", seriesType: "value", value: 5 },
        { name: "y", seriesType: "value", value: 150000 },
    ],
};
