import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
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
    return <circle clipPath={`url(#${clipPath})`} cx={0} cy={0} r={100} fill="red" />;
};

const RectangleClipPathTemplate = () => {
    const store = createMockStorybookStore({
        chart: {
            dimensions: {
                width: 300,
                height: 300,
            },
        },
    });

    return (
        <Provider store={store}>
            <svg width="300px" height="300px">
                <g transform="translate(200, 100)">
                    <RectangleClipPath>
                        <Circle />
                    </RectangleClipPath>
                </g>
            </svg>
        </Provider>
    );
};

export const Default = RectangleClipPathTemplate.bind({});
Default.storyName = "Rectangle Clippath";
