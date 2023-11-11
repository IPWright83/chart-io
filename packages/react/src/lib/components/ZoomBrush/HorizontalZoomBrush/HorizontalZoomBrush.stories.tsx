import * as d3 from "@chart-io/d3";
import isChromatic from "chromatic/isChromatic";
import React from "react";
import { Provider } from "react-redux";

import { HorizontalZoomBrush } from ".";

import { createMockStorybookStore } from "../../../testUtils";
import { Line } from "../../Plots";

export default {
    title: "Components/Zoom/HorizontalZoomBrush",
    component: HorizontalZoomBrush,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const HorizontalZoomBrushTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            dimensions: {
                width: 500,
                height: 0,
                plotMargin: { left: 0, top: 0, right: 0, bottom: 0 },
            },
            data: [
                { x: 10, y: 10 },
                { x: 50, y: 50 },
                { x: 250, y: 250 },
                { x: 450, y: 50 },
            ],
            scales: {
                x: {
                    scale: d3.scaleLinear(),
                    range: [0, 500],
                    domain: [0, 500],
                },
                y: {
                    scale: d3.scaleLinear(),
                    range: [0, 500],
                    domain: [0, 300],
                    brush: {
                        range: [0, 100],
                    },
                },
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="500px" height="100px" style={{ background: "white" }}>
                <HorizontalZoomBrush height={args.height}>
                    <Line x="x" y="y" />
                </HorizontalZoomBrush>
            </svg>
        </Provider>
    );
};

export const Default = {
    name: "Horizontal Zoom Brush",
    render: HorizontalZoomBrushTemplate,
    args: {
        height: 100,
    },
};
