import * as d3 from "@chart-io/d3";
import { themes } from "@chart-io/core";

import React from "react";
import { Provider } from "react-redux";

import { HorizontalBand } from ".";

import { sales_records_dataset } from "../../../../../data/sales_records_dataset";
import { Scatter } from "../../../Plots";
import { XYChart } from "../../../XYChart";
import { XAxis, YAxis } from "../../../Axis";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
  title: "Components/Bands/HorizontalBand",
  component: HorizontalBand,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const HorizontalBandTemplate = () => {
  const store = createMockStorybookStore({
    chart: {
      theme: themes.light,
      dimensions: {
        width: 500,
        height: 200,
      },
      scales: {
        "Total Profit": {
          scale: d3.scaleLinear(),
          domain: [0, 1000],
          range: [200, 0],
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <svg width="500" height="200">
        <HorizontalBand
          yStop={500}
          y="Total Profit"
          fill="steelblue"
          stroke="red"
          opacity={0.3}
        />
      </svg>
    </Provider>
  );
};

const ScatterWithRectsTemplate = () => {
  const y = "Total Profit";
  const x = "Units Sold";

  return (
    <XYChart
      data={sales_records_dataset}
      plotMargin={{ left: 70, top: 20, bottom: 20, right: 20 }}
      width={800}
      height={400}
    >
      <YAxis fields={[y]} />
      <XAxis fields={[x]} />
      <HorizontalBand y={y} yStop={300000} fill="red" opacity={0.1} />
      <HorizontalBand
        y={y}
        yStart={300000}
        yStop={900000}
        fill="orange"
        opacity={0.1}
      />
      <HorizontalBand y={y} yStart={900000} fill="green" opacity={0.1} />
      <Scatter x={x} y={y} />
    </XYChart>
  );
};

export const Default = {
  name: "HorizontalBand",
  render: HorizontalBandTemplate,
};

export const ThresholdsExample = {
  name: "Thresholds Example",
  render: ScatterWithRectsTemplate,
};
