import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";

import { VerticalLine } from ".";
import mdx from "./VerticalLine.mdx";

import { sales_records_dataset } from "../../../../../data/sales_records_dataset";
import { Scatter } from "../../../Plots";
import { XYChart } from "../../../XYChart";
import { XAxis, YAxis } from "../../../Axis";
import { themes } from "../../../../themes";

import { createMockStorybookStore } from "../../../../testUtils";

export default {
    title: "Components/Lines/VerticalLine",
    component: VerticalLine,
    parameters: {
        docs: {
            page: mdx,
        },
        chromatic: { delay: 300 },
    },
};

const VerticalLineTemplate = () => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 500,
                height: 200,
            },
            scales: {
                "Units Sold": d3
                    .scaleLinear()
                    .domain([0, 1000])
                    .range([0, 200]),
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="500" height="200">
                <VerticalLine value={500} x="Units Sold" stroke="steelblue" />
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
            <VerticalLine x={x} value={2000} stroke="steelblue" />
            <VerticalLine x={x} value={5000} stroke="steelblue" />
            <VerticalLine x={x} value={7000} stroke="steelblue" />
            <Scatter x={x} y={y} />
        </XYChart>
    );
};

export const Default = VerticalLineTemplate.bind({});
Default.storyName = "VerticalLine";

export const ThresholdsExample = ScatterWithRectsTemplate.bind({});
ThresholdsExample.storyName = "Thresholds Example";
