import { themes } from "@chart-io/core";

import React from "react";
import { Provider } from "react-redux";

import { CenterValueOverlay } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/CenterValueOverlay",
    component: CenterValueOverlay,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const CenterValueOverlayTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: { width: 300, height: 300, plotMargin: { left: 0, right: 0, top: 0, bottom: 0 } },
            zoom: { path: args.zoomPath ?? [] },
        },
        event: {
            tooltip: {
                items: args.item ? [args.item] : [],
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="300px" height="300px" style={{ background: "#EEE" }}>
                {/* Stands in for a <Donut>/<StackedDonut>'s hole, so the overlay's position is visible */}
                <circle cx={150} cy={150} r={110} fill="#FFF" stroke="#CCC" />
                <CenterValueOverlay />
            </svg>
        </Provider>
    );
};

export const HoveredItem = {
    name: "Hovered Item",
    render: CenterValueOverlayTemplate,
    args: {
        item: { name: "North America", value: 28500, icon: "square", fill: "#99c1dc" },
    },
};

export const ZoomedNoHover = {
    name: "Zoomed In, Nothing Hovered",
    render: CenterValueOverlayTemplate,
    args: {
        zoomPath: ["Europe"],
    },
};

export const ZoomedAndHovered = {
    name: "Zoomed In, Hovering a Slice",
    render: CenterValueOverlayTemplate,
    args: {
        zoomPath: ["Europe"],
        item: { name: "Germany", value: 4200, icon: "square", fill: "#fc998e" },
    },
};

export const Empty = {
    name: "Nothing Hovered, Not Zoomed",
    render: CenterValueOverlayTemplate,
    args: {},
};
