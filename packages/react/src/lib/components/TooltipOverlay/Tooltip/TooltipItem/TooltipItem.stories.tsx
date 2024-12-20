import React from "react";
import { Provider } from "react-redux";

import { TooltipItem } from "./TooltipItem";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
  title: "Components/TooltipOverlay/Tooltip/TooltipItem",
  component: TooltipItem,
};

const TooltipItemTemplate = (args) => {
  const store = createMockStorybookStore({});

  return (
    <Provider store={store}>
      <TooltipItem
        name={args.name}
        fill={args.color}
        value={args.value}
        icon={args.icon}
        suffix={args.suffix}
        prefix={args.prefix}
        format={args.formatFunc}
      ></TooltipItem>
    </Provider>
  );
};

export const Scatter = {
  render: TooltipItemTemplate,
  args: {
    name: "Scatter Series",
    value: 5,
    color: "steelblue",
    icon: "circle",
  },
};

export const Line = {
  render: TooltipItemTemplate,
  args: {
    name: "Line Series",
    value: 5,
    color: "steelblue",
    icon: "line",
  },
};

export const Area = {
  render: TooltipItemTemplate,
  args: {
    name: "Area Series",
    value: 5,
    color: "steelblue",
    icon: "square",
  },
};

export const Bar = {
  render: TooltipItemTemplate,
  args: {
    name: "Bar Series",
    value: 5,
    color: "steelblue",
    icon: "square",
  },
};

export const Column = {
  render: TooltipItemTemplate,
  args: {
    name: "Column Series",
    value: 5,
    color: "steelblue",
    icon: "square",
  },
};

export const Value = {
  render: TooltipItemTemplate,
  args: {
    name: "Value",
    value: 5,
    color: "steelblue",
    icon: "none",
  },
};

export const Suffix = {
  render: TooltipItemTemplate,
  args: {
    name: "Suffix Example",
    value: 105_000,
    color: "steelblue",
    icon: "circle",
    suffix: " Dollars",
  },
};

export const Prefix = {
  render: TooltipItemTemplate,
  args: {
    name: "Prefix Example",
    value: 105_000,
    color: "steelblue",
    icon: "circle",
    prefix: "£",
  },
};

export const CustomFormat = {
  render: TooltipItemTemplate,
  args: {
    name: "Custom Format Example",
    value: 105_000,
    color: "steelblue",
    icon: "circle",
    formatFunc: (name, value) => `~~~${value}~~~`,
  },
};
