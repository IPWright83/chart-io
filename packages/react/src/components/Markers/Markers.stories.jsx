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
            theme: themes.light,
        },
        event: {
            markers: [{ fill: args.fill, stroke: args.stroke, r1: 10, r2: 40, cx: 50, cy: 50 }],
        },
    });

    return (
        <Provider store={store}>
            <svg>
                <Markers />
            </svg>
        </Provider>
    );
};

export const Default = MarkersTemplate.bind({});
Default.storyName = "Markers";
Default.args = {
    fill: "steelblue",
    stroke: "red",
};

export const Outline = MarkersTemplate.bind({});
Outline.storyName = "Outline";
Outline.args = {
    stroke: "steelblue",
    fill: null,
};
