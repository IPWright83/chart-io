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
