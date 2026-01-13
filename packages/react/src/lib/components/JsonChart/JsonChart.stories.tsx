import React from "react";
import { JsonChart } from "./JsonChart";

import { sales_records_dataset } from "../../../data/sales_records_dataset";

export default {
  title: "Components/JsonChart",
  component: JsonChart,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const JsonChartTemplate = (args) => (
  <JsonChart config={args.config} data={sales_records_dataset} />
);

export const Line = {
  name: "Line",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
      },
      axis: {
        x: {
          fields: "Order Date",
        },
      },
      series: {
        lines: {
          ys: ["Total Cost", "Total Profit"],
        },
      },
    },
  },
};

export const Area = {
  name: "Area",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        zoomBrush: "inline",
      },
      axis: {
        x: {
          fields: "Order Date",
        },
      },
      series: {
        areas: {
          ys: ["Total Cost", "Total Profit"],
          stacked: true,
        },
      },
    },
  },
};

export const Scatter = {
  name: "Scatter",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
      },
      axis: {
        x: {
          fields: "Order Date",
        },
      },
      series: {
        scatters: {
          ys: ["Total Cost", "Total Profit"],
          radius: 10,
        },
      },
    },
  },
};

export const Columns = {
  name: "Columns",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        plotMargin: { left: 60, right: 40, top: 40, bottom: 40 },
      },
      axis: {
        x: {
          fields: "Item Type",
        },
      },
      series: {
        columns: {
          ys: ["Unit Price", "Unit Cost"],
          grouped: true,
        },
      },
    },
  },
};

export const Bars = {
  name: "Bars",
  render: JsonChartTemplate,
  args: {
    config: {
      chart: {
        width: 800,
        plotMargin: { left: 100, right: 40, top: 40, bottom: 40 },
      },
      axis: {
        y: {
          fields: "Item Type",
        },
        x: {
          fields: ["Unit Price", "Unit Cost"],
          aggregate: true,
        },
      },
      series: {
        bars: {
          xs: ["Unit Price", "Unit Cost"],
          stacked: true,
        },
      },
    },
  },
};
