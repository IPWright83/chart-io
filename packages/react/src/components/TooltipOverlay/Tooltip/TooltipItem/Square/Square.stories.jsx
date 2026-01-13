import React from "react";
import { Square } from "./Square";

import mdx from "../TooltipItem.mdx";

export default {
    title: "Components/Tooltip/TooltipItem/Square",
    component: Square,
    parameters: {
        docs: {
            page: mdx,
        },
    },
};

const SquareTemplate = (args) => {
    return <Square fill={args.fill} />;
};

export const Default = SquareTemplate.bind({});
Default.args = {
    fill: "steelblue",
};
