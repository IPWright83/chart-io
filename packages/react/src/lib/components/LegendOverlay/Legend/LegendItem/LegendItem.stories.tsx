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

export const Scatter = LegendItemTemplate.bind({});
Scatter.args = {
    name: "Scatter Series",
    color: "steelblue",
    icon: "circle",
};

export const Line = LegendItemTemplate.bind({});
Line.args = {
    name: "Line Series",
    color: "steelblue",
    icon: "line",
};

export const Area = LegendItemTemplate.bind({});
Area.args = {
    name: "Area Series",
    color: "steelblue",
    icon: "square",
};

export const Bar = LegendItemTemplate.bind({});
Bar.args = {
    name: "Bar Series",
    color: "steelblue",
    icon: "square",
};

export const Column = LegendItemTemplate.bind({});
Column.args = {
    name: "Column Series",
    color: "steelblue",
    icon: "square",
};

export const CustomFormat = LegendItemTemplate.bind({});
CustomFormat.args = {
    name: "Custom Format Example",
    color: "steelblue",
    icon: "circle",
    formatFunc: (name) => `~~~${name}~~~`,
};
