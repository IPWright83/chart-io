import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { XAxis } from "../XAxis";
import { Axis } from "./Axis";
import { Chart } from "../../Chart";
import { axisData } from "./axisData";
import { chartSelectors } from "../../../store";
import { XScale } from "../../Scale";

import "./AxisCustomisations.css";

import mdx from "./Axis.mdx";

export default {
    title: "Components/Axis/Customization",
    component: Axis,
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

// eslint-disable-next-line
const CustomTimeAxis = ({ fields }) => {
    const axis = useRef(null);

    const field = fields[0];
    const scale = useSelector((s) => chartSelectors.scales.getScale(s, field));

    useEffect(() => {
        if (axis.current && scale) {
            const selection = d3.select(axis.current);

            // Create the D3 axis renderer
            const timeFormat = d3.timeFormat("%H:%M");
            const d3Axis = d3
                .axisBottom(scale)
                .ticks(d3.timeHour.every(1))
                .tickSizeInner(30)
                .tickSizeOuter(30)
                .tickFormat((value, index) => (index % 3 === 0 ? timeFormat(value) : null));

            // Set some scale props
            d3Axis.scale(scale);

            // Render the axis
            selection.call(d3Axis);
        }
    }, [scale]);

    return <g className="customAxis" ref={axis} />;
};

const CustomAxisTemplate = (args) => (
    <Chart {...args} data={axisData}>
        <XScale fields={args.fields} scaleType="time" />
        <CustomTimeAxis fields={args.fields} />
    </Chart>
);

const HorizontalAxisTemplate = (args) => (
    <Chart {...args} data={axisData}>
        <XAxis
            fields={args.fields}
            tickSizeInner={args.tickSizeInner}
            tickSizeOuter={args.tickSizeOuter}
            tickPadding={args.tickPadding}
            showGridlines={args.showGridlines}
            title={args.title}
            position={args.position}
        />
    </Chart>
);

export const OuterTickSize = HorizontalAxisTemplate.bind({});
OuterTickSize.storyName = "Outer Tick Size";
OuterTickSize.args = {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeOuter: 40,
    showGridlines: false,
};

export const InnerTickSize = HorizontalAxisTemplate.bind({});
InnerTickSize.storyName = "Inner Tick Size";
InnerTickSize.args = {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickSizeInner: 20,
    showGridlines: false,
};

export const TickPadding = HorizontalAxisTemplate.bind({});
TickPadding.storyName = "Tick Padding";
TickPadding.args = {
    position: "bottom",
    fields: ["integerValue"],
    height: 100,
    width: 800,
    tickPadding: 20,
    showGridlines: false,
};

export const Gridlines = HorizontalAxisTemplate.bind({});
Gridlines.storyName = "Gridlines";
Gridlines.args = {
    position: "bottom",
    fields: ["integerValue"],
    height: 200,
    width: 800,
    tickPadding: 20,
    showGridlines: true,
};

export const FullyCustomAxis = CustomAxisTemplate.bind({});
FullyCustomAxis.storyName = "Using a Custom Axis Component";
FullyCustomAxis.args = {
    position: "bottom",
    fields: ["dateTimeValue"],
    height: 50,
    width: 800,
};
