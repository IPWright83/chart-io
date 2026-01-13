import React from "react";
import { TooltipItem } from "./TooltipItem";

export default {
    title: "Components/Tooltip/TooltipItem",
    component: TooltipItem,
};

const TooltipItemTemplate = (args) => (
    <TooltipItem name={args.name} fill={args.color} value={args.value} seriesType={args.seriesType}></TooltipItem>
);

export const Scatter = TooltipItemTemplate.bind({});
Scatter.args = {
    name: "Scatter Series",
    value: 5,
    color: "steelblue",
    seriesType: "scatter",
};

export const Line = TooltipItemTemplate.bind({});
Line.args = {
    name: "Line Series",
    value: 5,
    color: "steelblue",
    seriesType: "line",
};

export const Area = TooltipItemTemplate.bind({});
Area.args = {
    name: "Area Series",
    value: 5,
    color: "steelblue",
    seriesType: "area",
};

export const Bar = TooltipItemTemplate.bind({});
Bar.args = {
    name: "Bar Series",
    value: 5,
    color: "steelblue",
    seriesType: "bar",
};

export const Column = TooltipItemTemplate.bind({});
Column.args = {
    name: "Column Series",
    value: 5,
    color: "steelblue",
    seriesType: "column",
};
