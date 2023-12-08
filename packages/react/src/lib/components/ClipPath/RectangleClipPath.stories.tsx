import { chartSelectors, IState, themes } from "@chart-io/core";

import React from "react";
import { Provider, useSelector } from "react-redux";

import { RectangleClipPath } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/RectangleClipPath",
    component: RectangleClipPath,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const Circle = ({ clipPath }: { clipPath?: string }) => {
    const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));

    return <circle clipPath={`url(#${plotClipPath})`} cx={300} cy={200} r={100} fill="red" />;
};

const RectangleClipPathTemplate = () => {
    const width = 300;
    const height = 300;

    const store = createMockStorybookStore({
        chart: {
            dimensions: {
                width,
                height,
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="500px" height="300px">
                <g transform="translate(0, 0)">
                    <rect x={0} y={0} width={width} height={height} fill="none" stroke="black" />
                    <RectangleClipPath />
                    <Circle />
                </g>
            </svg>
        </Provider>
    );
};

export const Default = {
    name: "Rectangle Clippath",
    render: RectangleClipPathTemplate,
};
