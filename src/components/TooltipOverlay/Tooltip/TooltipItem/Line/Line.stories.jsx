import React from "react";
import { Line } from "./Line";

import mdx from "../TooltipItem.mdx";

export default {
    title: "Components/Tooltip/TooltipItem/Line",
    component: Line,
    parameters: {
        docs: {
            page: mdx,
        },
    },
};

const LineTemplate = (args) => {
    return <Line fill={args.fill} />;
};

export const Default = LineTemplate.bind({});
Default.args = {
    fill: "steelblue",
};
