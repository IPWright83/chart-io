import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { Tooltip } from "./Tooltip";

export default {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        docs: {
            // page: mdx,
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

const TooltipTemplate = (args) => <Tooltip></Tooltip>;

export const Default = TooltipTemplate.bind({});
Default.storyName = "Example Tooltip";
Default.args = {
    // position: "bottom",
    // fields: ["integerValue"],
    // height: 100,
    // width: 800,
    // tickSizeOuter: 40,
    // showGridlines: false,
};
