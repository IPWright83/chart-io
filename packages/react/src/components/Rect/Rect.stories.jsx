import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Rect } from ".";
import mdx from "./Rect.mdx";

import { sales_records_dataset } from "../../../data/sales_records_dataset";
import { Scatter } from "../Plots";
import { XYChart } from "../XYChart";
import { XAxis, YAxis } from "../Axis";
import { chartSelectors } from "../../store";

export default {
    title: "Components/Rect",
    component: Rect,
    parameters: {
        docs: {
            page: mdx,
        },
        chromatic: { delay: 300 },
    },
};

const RectTemplate = () => {
    return (
        <svg>
            <Rect x={20} y={50} width={150} height={70} fill="steelblue" stroke="red" opacity={0.3} />
        </svg>
    );
};

const ScatterWithRectsTemplate = () => {
    const RectUsingScale = ({ start, stop, fill }) => {
        const margin = useSelector((s) => chartSelectors.dimensions.margin(s));
        const width = useSelector((s) => chartSelectors.dimensions.width(s));
        const scale = useSelector((s) => chartSelectors.scales.getScale(s, "Total Profit"));

        // Scale may not yet have been initialized
        if (!scale) {
            return null;
        }

        // Calculate the position based on the scale. If no start was given
        // use the start of the scale "range" which are the pixel co-ordinates
        // for the start of the Y axis
        const startY = start ? scale(start) : scale.range()[0];

        // Calculate the position based on the scale. If no stop was given
        // use the end of the scale "range" which are the pixel co-ordinates
        // for the end of the Y axis
        const stopY = stop ? scale(stop) : scale.range()[1];

        return (
            <Rect
                x={margin.left}
                width={width - margin.left - margin.right}
                y={stopY}
                height={startY - stopY}
                fill={fill}
                opacity={0.1}
            />
        );
    };

    RectUsingScale.propTypes = {
        start: PropTypes.number,
        stop: PropTypes.number,
        fill: PropTypes.string,
    };

    return (
        <XYChart
            data={sales_records_dataset}
            margin={{ left: 70, top: 20, bottom: 20, right: 20 }}
            width={800}
            height={400}
        >
            <YAxis fields={["Total Profit"]} />
            <XAxis fields={["Units Sold"]} />
            <RectUsingScale stop={300000} fill="red" />
            <RectUsingScale start={300000} stop={900000} fill="orange" />
            <RectUsingScale start={900000} fill="green" />
            <Scatter x="Units Sold" y="Total Profit" />
        </XYChart>
    );
};

export const Default = RectTemplate.bind({});
Default.storyName = "Rect";

export const ThresholdsExample = ScatterWithRectsTemplate.bind({});
ThresholdsExample.storyName = "Thresholds Example";
