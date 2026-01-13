import * as d3 from "@chart-it/d3";
import React from "react";
import { Provider } from "react-redux";

import { VerticalBand } from ".";

import { sales_records_dataset } from "../../../../../data/sales_records_dataset";
import { Scatter } from "../../../Plots";
import { XYChart } from "../../../XYChart";
import { XAxis, YAxis } from "../../../Axis";
import { themes } from "../../../../themes";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
    title: "Components/Bands/VerticalBand",
    component: VerticalBand,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const VerticalBandTemplate = () => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 500,
                height: 200,
            },
            scales: {
                "Units Sold": d3.scaleLinear().domain([0, 1000]).range([0, 200]),
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="500" height="200">
                <VerticalBand xStop={500} x="Units Sold" fill="steelblue" stroke="red" opacity={0.3} />
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
            margin={{ left: 70, top: 20, bottom: 40, right: 20 }}
            width={800}
            height={400}
        >
            <YAxis fields={[y]} />
            <XAxis fields={[x]} />
            <VerticalBand x={x} xStop={2000} fill="red" opacity={0.1} />
            <VerticalBand x={x} xStart={2000} xStop={7000} fill="orange" opacity={0.1} />
            <VerticalBand x={x} xStart={7000} fill="green" opacity={0.1} />
            <Scatter x={x} y={y} />
        </XYChart>
    );
};

export const Default = VerticalBandTemplate.bind({});
Default.storyName = "VerticalBand";

export const ThresholdsExample = ScatterWithRectsTemplate.bind({});
ThresholdsExample.storyName = "Thresholds Example";
