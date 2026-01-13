import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { EventReceiver } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/EventReceiver",
    component: EventReceiver,
    parameters: {
        chromatic: { delay: 300 },
    },
    argTypes: {
        mouseEvent: { action: "mouse" },
    },
};

const EventReceiverTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            dimensions: {
                width: 200,
                height: 200,
            },
            theme: themes.light,
        },
    });

    store.dispatch = console.log; //args.mouseEvent;

    return (
        <div>
            <p>Move your cursor over the blue box and check the console to see events</p>
            <div style={{ backgroundColor: "steelblue" }}>
                <Provider store={store}>
                    <svg>
                        <EventReceiver />
                    </svg>
                </Provider>
            </div>
        </div>
    );
};

export const Default = EventReceiverTemplate.bind({});
Default.storyName = "EventReceiver";
