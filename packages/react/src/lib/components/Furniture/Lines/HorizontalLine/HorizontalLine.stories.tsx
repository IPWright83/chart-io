import * as d3 from "@chart-io/d3";
import React from "react";
import { Provider } from "react-redux";

import { HorizontalLine } from ".";

import { sales_records_dataset } from "../../../../../data/sales_records_dataset";
import { Scatter } from "../../../Plots";
import { XYChart } from "../../../XYChart";
import { XAxis, YAxis } from "../../../Axis";
import { themes } from "../../../../themes";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
    title: "Components/Lines/HorizontalLine",
    component: HorizontalLine,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const HorizontalLineTemplate = () => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 500,
                height: 200,
            },
            scales: {
                "Total Profit": d3.scaleLinear().domain([0, 1000]).range([200, 0]),
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="500" height="200">
                <HorizontalLine value={500} y="Total Profit" stroke="steelblue" />
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
            <HorizontalLine y={y} value={300000} stroke="steelblue" />
            <HorizontalLine y={y} value={700000} stroke="steelblue" />
            <HorizontalLine y={y} value={900000} stroke="steelblue" />
            <Scatter x={x} y={y} />
        </XYChart>
    );
};

export const Default = HorizontalLineTemplate.bind({});
Default.storyName = "HorizontalLine";

export const ThresholdsExample = ScatterWithRectsTemplate.bind({});
ThresholdsExample.storyName = "Thresholds Example";
