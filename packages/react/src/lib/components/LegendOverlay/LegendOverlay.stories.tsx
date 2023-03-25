import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { LegendOverlay } from "./";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/LegendOverlay",
    component: LegendOverlay,
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

const LegendOverlayTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 800,
                height: 400,
            },
            legend: {
                items: [
                    {
                        name: "Line Series with a very long title that should be truncated at some point",
                        icon: "line",
                        color: "steelblue",
                    },
                    { name: "Series 2", icon: "circle", color: "steelblue" },
                    { name: "Series 3", icon: "square", color: "steelblue" },
                    { name: "Series 4", icon: "circle", color: "steelblue" },
                    { name: "Series 5", icon: "circle", color: "steelblue" },
                    { name: "Series 6", icon: "circle", color: "steelblue" },
                    { name: "Series 7", icon: "circle", color: "steelblue" },
                    { name: "Series 8", icon: "circle", color: "steelblue" },
                    { name: "Series 9", icon: "circle", color: "steelblue" },
                    { name: "Series 10", icon: "circle", color: "steelblue" },
                ],
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="1600px" height="400px" style={{ background: "#CCC" }}>
                <LegendOverlay
                    verticalPosition={args.verticalPosition}
                    horizontalPosition={args.horizontalPosition}
                    formatters={args.formatters}
                />
            </svg>
        </Provider>
    );
};

export const Left = LegendOverlayTemplate.bind({});
Left.storyName = "Left Aligned";
Left.args = {
    horizontalPosition: "LEFT",
};

export const Right = LegendOverlayTemplate.bind({});
Right.storyName = "Right Aligned";
Right.args = {
    horizontalPosition: "RIGHT",
};

export const Top = LegendOverlayTemplate.bind({});
Top.storyName = "Top Aligned";
Top.args = {
    verticalPosition: "TOP",
    horizontalPosition: "CENTER",
};

export const Bottom = LegendOverlayTemplate.bind({});
Bottom.storyName = "Bottom Aligned";
Bottom.args = {
    verticalPosition: "BOTTOM",
    horizontalPosition: "CENTER",
};

export const BottomRight = LegendOverlayTemplate.bind({});
BottomRight.storyName = "BottomRight Aligned";
BottomRight.args = {
    verticalPosition: "BOTTOM",
    horizontalPosition: "RIGHT",
};
