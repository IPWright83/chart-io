import React, { useState, useEffect } from "react";

import { example_dataset } from "../../../data/example_dataset";
import { Line, Area, XYChart, XAxis, YAxis } from "../../components";
import { linkStores } from "../../utils";

import mdx from "./Dashboards.mdx";

export default {
    title: "Dashboards",
    component: Line,
    parameters: {
        docs: {
            page: mdx,
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

const processData = (rawData) => {
    const keyField = "Month";

    const aggregated = rawData
        .filter((r) => ["Aperture", "Black Mesa"].includes(r.Owner))
        .reduce((result, value) => {
            const current = result[value[keyField]] || {};

            for (let field in value) {
                if (typeof value[field] === "number") {
                    current[field] = current[field] || 0;
                    current[field] += value[field];
                } else {
                    current[field] = value[field];
                }
            }

            result[value[keyField]] = current;
            return result;
        }, {});

    const result = Object.keys(aggregated).flatMap((key) => ({
        [keyField]: new Date(key),
        ...aggregated[key],
    }));

    return result;
};

const DashboardTemplate = (args) => {
    const width = 400;
    const height = 300;

    const [store1, setStore1] = useState();
    const [store2, setStore2] = useState();
    const [store3, setStore3] = useState();
    const [store4, setStore4] = useState();
    const [store5, setStore5] = useState();
    const [store6, setStore6] = useState();
    const [store7, setStore7] = useState();
    const [store8, setStore8] = useState();
    const [store9, setStore9] = useState();
    const [store10, setStore10] = useState();
    const [store11, setStore11] = useState();
    const [store12, setStore12] = useState();

    useEffect(() => {
        if (
            store1 &&
            store2 &&
            store3 &&
            store4 &&
            store5 &&
            store6 &&
            store7 &&
            store8 &&
            store9 &&
            store10 &&
            store11 &&
            store12
        ) {
            linkStores([
                store1,
                store2,
                store3,
                store4,
                store5,
                store6,
                store7,
                store8,
                store9,
                store10,
                store11,
                store12,
            ]);
        }
    }, [store1, store2, store3, store4, store5, store6, store7, store8, store9, store10, store11, store12]);

    const data = processData(example_dataset);

    return (
        <div>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore1}>
                <Line x="Month" y="Unit Sales" />
                <YAxis fields={["Unit Sales"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore2}>
                <Area x="Month" y="Sales Value" />
                <YAxis fields={["Sales Value"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore3}>
                <Line x="Month" y="Cost of Sales" />
                <YAxis fields={["Cost of Sales"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore4}>
                <Area x="Month" y="Price" />
                <YAxis fields={["Price"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore5}>
                <Line x="Month" y="Gross Profit" />
                <YAxis fields={["Gross Profit"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore6}>
                <Area x="Month" y="Indirect Costs" />
                <YAxis fields={["Indirect Costs"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore7}>
                <Area x="Month" y="Operating Profit" />
                <YAxis fields={["Operating Profit"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore8}>
                <Line x="Month" y="Unit Sales Monthly Change" />
                <YAxis fields={["Unit Sales Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore9}>
                <Area x="Month" y="Sales Value Monthly Change" />
                <YAxis fields={["Sales Value Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore10}>
                <Line x="Month" y="Distribution Monthly Change" />
                <YAxis fields={["Distribution Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore11}>
                <Area x="Month" y="Price Monthly Change" />
                <YAxis fields={["Price Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
            <XYChart data={data} margin={args.margin} width={width} height={height} onStoreCreated={setStore12}>
                <Line x="Month" y="Gross Profit Monthly Change" />
                <YAxis fields={["Gross Profit Monthly Change"]} />
                <XAxis fields={["Month"]} />
            </XYChart>
        </div>
    );
};

export const Dashboard = DashboardTemplate.bind({});
Dashboard.storyName = "Dashboard";
Dashboard.args = {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 500,
    color: "#99C1DC",
    theme: "light",
    margin: {
        left: 80,
        right: 40,
        top: 40,
        bottom: 40,
    },
};
