import isChromatic from "chromatic/isChromatic";
import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { Polygon } from ".";
import mdx from "./Polygon.mdx";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/Polygon",
    component: Polygon,
    parameters: {
        docs: {
            page: mdx,
        },
        chromatic: { delay: 300 },
    },
};

const PolygonTemplate = () => {
    return (
        <svg>
            <Polygon fill="steelblue" stroke="red" opacity={0.5} points={"0,100 50,25 50,75 100,0"} />
        </svg>
    );
};

export const Default = PolygonTemplate.bind({});
Default.storyName = "Polygon";
