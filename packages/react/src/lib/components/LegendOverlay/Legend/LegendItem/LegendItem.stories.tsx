import React from "react";
import { Provider } from "react-redux";

import { LegendItem } from ".";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
    title: "Components/LegendOverlay/Legend/LegendItem",
    component: LegendItem,
};

const LegendItemTemplate = (args) => {
    const store = createMockStorybookStore({});

    return (
        <Provider store={store}>
            <LegendItem name={args.name} color={args.color} icon={args.icon} format={args.formatFunc}></LegendItem>
        </Provider>
    );
};

export const Scatter = {
    render: LegendItemTemplate,
    args: {
        name: "Scatter Series",
        color: "steelblue",
        icon: "circle",
    },
};

export const Line = {
    render: LegendItemTemplate,
    args: {
        name: "Line Series",
        color: "steelblue",
        icon: "line",
    },
};

export const Area = {
    render: LegendItemTemplate,
    args: {
        name: "Area Series",
        color: "steelblue",
        icon: "square",
    },
};

export const Bar = {
    render: LegendItemTemplate,
    args: {
        name: "Bar Series",
        color: "steelblue",
        icon: "square",
    },
};

export const Column = {
    render: LegendItemTemplate,
    args: {
        name: "Column Series",
        color: "steelblue",
        icon: "square",
    },
};

export const CustomFormat = {
    render: LegendItemTemplate,
    args: {
        name: "Custom Format Example",
        color: "steelblue",
        icon: "circle",
        formatFunc: (name) => `~~~${name}~~~`,
    },
};
