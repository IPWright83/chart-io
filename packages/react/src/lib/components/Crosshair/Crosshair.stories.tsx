import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { Crosshair } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/Crosshair",
    component: Crosshair,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const CrosshairTemplate = () => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            dimensions: {
                width: 200,
                height: 200,
            },
        },
        event: {
            mouse: { x: 100, y: 100 },
        },
    });

    return (
        <Provider store={store}>
            <svg>
                <Crosshair showVertical={true} showHorizontal={true} />
            </svg>
        </Provider>
    );
};

export const Default = CrosshairTemplate.bind({});
Default.storyName = "Crosshair";
