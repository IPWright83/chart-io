import isChromatic from "chromatic/isChromatic";
import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { Markers } from ".";
import mdx from "./Markers.mdx";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/Markers",
    component: Markers,
    parameters: {
        docs: {
            page: mdx,
        },
        chromatic: { delay: 300 },
    },
};

const MarkersTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            animationDuration: isChromatic() ? 0 : 1000,
            theme: {
                ...themes.light,
                markers: {
                    ...themes.light.markers,
                    shadow: args.shadow,
                    stroke: args.stroke,
                    strokeWidth: args.strokeWidth,
                },
            },
        },
        event: {
            markers: [{ fill: args.fill, stroke: args.stroke, r1: 10, r2: 40, cx: 50, cy: 50 }],
        },
    });

    return (
        <Provider store={store}>
            <svg width="300px" height="300px">
                <g transform="translate(50,50)">
                    <Markers />
                </g>
            </svg>
        </Provider>
    );
};

export const Default = MarkersTemplate.bind({});
Default.storyName = "Markers";
Default.args = {
    fill: "steelblue",
    stroke: "white",
    shadow: false,
};

export const Outline = MarkersTemplate.bind({});
Outline.storyName = "Outline";
Outline.args = {
    stroke: "steelblue",
    fill: null,
    shadow: false,
};

export const Shadow = MarkersTemplate.bind({});
Shadow.storyName = "Shadow";
Shadow.args = {
    fill: "steelblue",
    shadow: true,
    strokeWidth: 3,
    stroke: "white",
};
