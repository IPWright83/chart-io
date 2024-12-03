import { themes } from "@chart-io/core";

import React from "react";
import { Provider } from "react-redux";

import { TooltipOverlay } from "./";
import { TooltipItem } from "./";

import { createMockStorybookStore } from "../../testUtils";

export default {
  title: "Components/TooltipOverlay",
  component: TooltipOverlay,
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

const TooltipOverlayTemplate = (args) => {
  const store = createMockStorybookStore({
    chart: {
      theme: themes.light,
    },
    event: {
      tooltip: {
        items: [
          {
            name: "Line Series with a very long title that should be truncated at some point",
            icon: "line",
            fill: "steelblue",
            value: 155000,
          },
          {
            name: "Scatter Series",
            icon: "circle",
            fill: "steelblue",
            value: "foobar",
          },
          {
            name: "Bar Series",
            icon: "square",
            fill: "steelblue",
            value: true,
          },
          {
            name: "Column Series",
            icon: "square",
            fill: "steelblue",
            value: 1500,
          },
          {
            name: "Area Series",
            icon: "square",
            fill: "steelblue",
            value: 1500,
          },
          {
            name: "Timestamp",
            fill: "steeblue",
            icon: "none",
            value: new Date(2023, 1, 1),
          },
        ],
        color: "green",
      },
    },
  });

  return (
    <Provider store={store}>
      <svg width="400px">
        <TooltipOverlay
          borderColor={args.borderColor}
          tooltipComponent={args.tooltipComponent}
          tooltipItemComponent={args.tooltipItemComponent}
        />
      </svg>
    </Provider>
  );
};

export const Default = {
  name: "TooltipOverlay",
  render: TooltipOverlayTemplate,
};

export const CustomTooltip = {
  name: "Custom Tooltip",
  render: TooltipOverlayTemplate,
  args: {
    tooltipComponent: ({ items }) => {
      return (
        <div
          style={{
            opacity: 0.8,
            border: "1px solid black",
            borderRadius: 5,
            padding: 5,
            fontSize: 18,
            lineHeight: 1.2,
            backgroundColor: "#EEE",
            boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px",
          }}
        >
          <div>This is a Custom Tooltip</div>
          {items.map((item) => (
            <TooltipItem key={`${item.name}`} {...item} />
          ))}
        </div>
      );
    },
  },
};

export const CustomTooltipItems = {
  name: "Custom Tooltip Items",
  render: TooltipOverlayTemplate,
  args: {
    tooltipItemComponent: ({ name, value, icon, fill }) => {
      return (
        <div
          style={{
            width: "100%",
            flexGrow: 1,
            flexShrink: 1,
            fontSize: 12,
            display: "flex",
            whiteSpace: "nowrap" as const,
            overflow: "hidden" as const,
            textOverflow: "ellipsis" as const,
          }}
        >
          {`${value}`}
        </div>
      );
    },
  },
};
