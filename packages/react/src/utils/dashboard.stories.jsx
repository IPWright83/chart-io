import React, { useState, useEffect } from "react";

import { example_dataset } from "../../data/example_dataset";
import { Line, XYChart, XAxis, YAxis } from "../components";
import { linkStores } from "./linkStores";

export default {
    title: "XYCharts/Line",
    component: Line,
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
    const width = 500;
    const height = 300;

    const [store1, setStore1] = useState();
    const [store2, setStore2] = useState();
    const [store3, setStore3] = useState();
    const [store4, setStore4] = useState();
    const [store5, setStore5] = useState();
    const [store6, setStore6] = useState();

    useEffect(() => {
        if (store1 && store2 && store3 && store4 && store5 && store6) {
            linkStores([store1, store2, store3, store4, store5, store6]);
        }
    }, [store1, store2, store3, store4, store5, store6]);

    return (
        <div>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore1}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore2}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore3}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore4}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore5}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
            <XYChart data={processData(example_dataset)} width={width} height={height} onStoreCreated={setStore6}>
                <Line x={args.x} y={args.y} color={args.color} />
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
            </XYChart>
        </div>
    );
};

// const LinesTemplate = (args) => (
//     <XYChart
//         data={processData(example_dataset)}
//         margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
//         width={args.width}
//         height={args.height}
//         animationDuration={args.animationDuration}
//         theme={args.theme}
//         useCanvas={args.useCanvas}
//         onClick={args.onClick}
//         onMouseOver={args.onMouseOver}
//         onMouseOut={args.onMouseOut}
//     >
//         <YAxis fields={[args.y, args.y2, args.y3]} />
//         <XAxis fields={[args.x]} />
//         <Lines x={args.x} ys={[args.y, args.y2, args.y3]} />
//     </XYChart>
// );

export const Dashboard = DashboardTemplate.bind({});
Dashboard.storyName = "Dashboard";
Dashboard.args = {
    useCanvas: false,
    width: 800,
    height: 500,
    animationDuration: 500,
    color: "#99C1DC",
    theme: "light",
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    y: "Unit Sales",
    x: "Month",
};

// export const Color = LineTemplate.bind({});
// Color.storyName = "Custom Color";
// Color.args = {
//     ...Basic.args,
//     color: "orange",
// };

// export const Canvas = LineTemplate.bind({});
// Canvas.storyName = "Using Canvas";
// Canvas.args = {
//     ...Basic.args,
//     useCanvas: true,
// };

// export const MultipleLines = LinesTemplate.bind({});
// MultipleLines.storyName = "Mutiple Line Plots";
// MultipleLines.args = {
//     ...Basic.args,
//     y: "Operating Profit",
//     y2: "Sales Value",
//     y3: "Gross Profit",
// };
