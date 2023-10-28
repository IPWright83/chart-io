import React from "react";
import { JsonChart } from "./JsonChart";

import { sales_records_dataset } from "../../../data/sales_records_dataset";

export default {
    title: "Components/JsonChart",
    component: JsonChart,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const JsonChartTemplate = (args) => <JsonChart config={args.config} data={sales_records_dataset} />;

export const Line = JsonChartTemplate.bind({});
Line.storyName = "Line";
Line.args = {
    config: {
        chart: {
            width: 800,
        },
        axis: {
            x: {
                fields: "Order Date",
            },
        },
        series: {
            lines: {
                ys: ["Total Cost", "Total Profit"],
            },
        },
    },
};

export const Area = JsonChartTemplate.bind({});
Area.storyName = "Area";
Area.args = {
    config: {
        chart: {
            width: 800,
            zoomBrush: "inline",
        },
        axis: {
            x: {
                fields: "Order Date",
            },
        },
        series: {
            areas: {
                ys: ["Total Cost", "Total Profit"],
                stacked: true,
            },
        },
    },
};

export const Scatter = JsonChartTemplate.bind({});
Scatter.storyName = "Scatter";
Scatter.args = {
    config: {
        chart: {
            width: 800,
        },
        axis: {
            x: {
                fields: "Order Date",
            },
        },
        series: {
            scatters: {
                ys: ["Total Cost", "Total Profit"],
                radius: 10,
            },
        },
    },
};

export const Columns = JsonChartTemplate.bind({});
Columns.storyName = "Columns";
Columns.args = {
    config: {
        chart: {
            width: 800,
        },
        axis: {
            x: {
                fields: "Item Type",
            },
        },
        series: {
            columns: {
                ys: ["Unit Price", "Unit Cost"],
                grouped: true,
            },
        },
    },
};

export const Bars = JsonChartTemplate.bind({});
Bars.storyName = "Bars";
Bars.args = {
    config: {
        chart: {
            width: 800,
        },
        axis: {
            y: {
                fields: "Item Type",
            },
            x: {
                fields: ["Unit Price", "Unit Cost"],
                aggregate: true,
            },
        },
        series: {
            bars: {
                xs: ["Unit Price", "Unit Cost"],
                stacked: true,
            },
        },
    },
};
