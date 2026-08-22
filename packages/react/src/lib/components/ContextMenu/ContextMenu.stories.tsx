import {
    createDrawPolygonAction,
    createPivotAction,
    createResetZoomAction,
    createToggleLegendAction,
    getDefaultDatumItems,
    themes,
} from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { ContextMenu } from "./ContextMenu";

export default {
    title: "Components/ContextMenu",
    component: ContextMenu,
    parameters: {
        chromatic: { delay: 300 },
    },
    args: {
        onSelect: fn(),
        onClose: fn(),
    },
} as Meta<typeof ContextMenu>;

// The action factories in `./actions` need a bit of Redux state to compute their label/disabled
// state from - stub together the minimal bits used here rather than pulling in a real store
const backgroundState = {
    chart: {
        zoom: { path: [] },
        scales: {},
        legend: { items: [], hidden: false },
    },
} as any;

const zoomedState = {
    chart: {
        zoom: { path: ["Europe"] },
        scales: {},
        legend: { items: [], hidden: false },
    },
} as any;

const backgroundItems = [
    createResetZoomAction(zoomedState),
    createPivotAction(),
    createDrawPolygonAction(),
    createToggleLegendAction(backgroundState),
];

const datumItems = getDefaultDatumItems();

const ContextMenuTemplate = (args) => (
    <svg width="400px" height="400px" style={{ background: themes.light.background.toString() }}>
        <ContextMenu {...args} x={200} y={200} />
    </svg>
);

export const Background = {
    name: "Background Menu",
    render: ContextMenuTemplate,
    args: {
        open: true,
        items: backgroundItems,
    },
};

export const OnADataPoint = {
    name: "Datum Menu",
    render: ContextMenuTemplate,
    args: {
        open: true,
        items: datumItems,
    },
};

export const DisabledItem = {
    name: "With a Disabled Item",
    render: ContextMenuTemplate,
    args: {
        open: true,
        items: [createResetZoomAction(backgroundState), createPivotAction(), createDrawPolygonAction()],
    },
};

export const Closed = {
    name: "Closed",
    render: ContextMenuTemplate,
    args: {
        open: false,
        items: backgroundItems,
    },
};

export const CustomTheme = {
    name: "Custom Colors",
    render: ContextMenuTemplate,
    args: {
        open: true,
        items: backgroundItems,
        colors: {
            background: "#7c3aed",
            backgroundHover: "#9d5cf5",
            backgroundDisabled: "#c4b5fd",
            text: "#ffffff",
            border: "#ffffff",
        },
    },
};
