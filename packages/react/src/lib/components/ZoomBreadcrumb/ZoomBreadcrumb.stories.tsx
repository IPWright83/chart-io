import { themes } from "@chart-io/core";

import React from "react";
import { Provider } from "react-redux";

import { ZoomBreadcrumb } from ".";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/ZoomBreadcrumb",
    component: ZoomBreadcrumb,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const ZoomBreadcrumbTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
            zoom: { path: args.path },
        },
    });

    return (
        <Provider store={store}>
            <svg width="600px" height="200px" style={{ background: "#EEE" }}>
                <ZoomBreadcrumb />
            </svg>
        </Provider>
    );
};

export const OneLevel = {
    name: "One Level Deep",
    render: ZoomBreadcrumbTemplate,
    args: {
        path: ["Europe"],
    },
};

export const NestedLevels = {
    name: "Several Levels Deep",
    render: ZoomBreadcrumbTemplate,
    args: {
        path: ["Europe", "Germany", "Software"],
    },
};

export const FullyZoomedOut = {
    name: "Fully Zoomed Out",
    render: ZoomBreadcrumbTemplate,
    args: {
        path: [],
    },
};
