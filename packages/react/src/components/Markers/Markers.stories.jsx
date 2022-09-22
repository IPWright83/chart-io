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
            theme: themes.light,
        },
        event: {
            markers: [{ fill: "steelblue", stroke: "lightblue", r1: 10, r2: 50, cx: 50, cy: 50 }],
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
